"""
The setting pip does not have.

The site's pnpm refuses any version that has been on the registry less than
thirty days (`minimumReleaseAge: 43200`), and it applies that to the whole
dependency tree. pip has no equivalent, and pinning only what you import
constrains none of what it drags in — asking for `fastapi` alone resolved
`pydantic` and `pydantic-core` published the previous day, and `transformers`
brought in a `tokenizers` published the same morning.

So the rule is enforced here instead: every installed package is looked up on
PyPI and the run fails if any of them is too young. Exit code 1 means something
in the tree is newer than the rule allows, and the fix is a line in
`constraints.txt`.

Usage:  .venv\\Scripts\\python tools\\check_ages.py [--days 30]
"""

from __future__ import annotations

import argparse
import datetime
import json
import subprocess
import sys
import urllib.error
import urllib.request
from pathlib import Path

VENV_PYTHON = Path(__file__).resolve().parent.parent / ".venv" / "Scripts" / "python.exe"

# Not on PyPI under a version that can be looked up: torch and torchvision carry
# a +cu130 local version from the PyTorch index. Their base versions are checked
# instead, which is the number PyPI knows them by.
LOCAL_VERSION_PACKAGES = {"torch", "torchvision"}

NOT_DEPENDENCIES = {"pip", "setuptools", "wheel"}


def installed() -> list[tuple[str, str]]:
    python = str(VENV_PYTHON) if VENV_PYTHON.exists() else sys.executable
    raw = subprocess.run(
        [python, "-m", "pip", "list", "--format=json"],
        capture_output=True,
        text=True,
        check=True,
    ).stdout
    return [
        (p["name"], p["version"])
        for p in json.loads(raw)
        if p["name"].lower() not in NOT_DEPENDENCIES
    ]


def published(name: str, version: str) -> datetime.datetime | None:
    """When that exact version first appeared, or None if PyPI does not know it."""
    base = version.split("+")[0]
    try:
        with urllib.request.urlopen(
            f"https://pypi.org/pypi/{name}/{base}/json", timeout=30
        ) as response:
            data = json.load(response)
    except (urllib.error.HTTPError, urllib.error.URLError, TimeoutError):
        return None
    if not data.get("urls"):
        return None
    return min(
        datetime.datetime.fromisoformat(f["upload_time_iso_8601"].replace("Z", "+00:00"))
        for f in data["urls"]
    )


def main() -> int:
    parser = argparse.ArgumentParser(description=__doc__)
    parser.add_argument("--days", type=int, default=30, help="minimum age, in days")
    args = parser.parse_args()

    now = datetime.datetime.now(datetime.timezone.utc)
    cutoff = now - datetime.timedelta(days=args.days)

    packages = installed()
    too_new: list[tuple[str, str, int]] = []
    unknown: list[str] = []

    for name, version in sorted(packages, key=lambda p: p[0].lower()):
        when = published(name, version)
        if when is None:
            unknown.append(f"{name}=={version}")
            continue
        if when > cutoff:
            too_new.append((name, version, (now - when).days))

    print(f"checked {len(packages)} packages against a {args.days}-day minimum")

    if unknown:
        # Not a failure: a local build or a wheel from another index is not on
        # PyPI to be asked about. Printed so it is a decision and not a gap.
        print(f"\nnot on PyPI, not checked ({len(unknown)}):")
        for item in unknown:
            print(f"    {item}")

    if too_new:
        print(f"\nTOO NEW — {len(too_new)} package(s) younger than {args.days} days:")
        for name, version, age in too_new:
            print(f"    {name}=={version}   {age} day(s) old")
        print("\nPin each of them in constraints.txt to the newest version that is")
        print("old enough, then: pip install -r requirements.txt -c constraints.txt")
        return 1

    print("\nevery package in the tree is old enough.")
    return 0


if __name__ == "__main__":
    raise SystemExit(main())
