"""
The bigger writer, as GGUF, and the llama.cpp build that runs it.

**Why a second runtime at all.** Qwen3-VL-8B is the best vision-language model
of its size and it still cannot hold this brief: a draft came back at 1,279
words against a brief that asks for as long as the painting is worth, with 43
em dashes against a rule that bans them outright. The answer is not another 8B.
It is a bigger model, and the only way a bigger model fits on an 8 GB card is
a mixture of experts with the experts in system memory.

Qwen3-VL-30B-A3B is 31B parameters of which 3B are active per token. Attention
and the shared expert sit on the card; `--n-cpu-moe` leaves the routed experts
in RAM for the processor to compute. Four times the model, and reported faster
than the 8B was through transformers, because the 8B was being streamed across
the bus a layer at a time.

Apache 2.0, and the GGUFs are Qwen's own rather than a stranger's requantisation.

**The binaries are pinned and a month old.** llama.cpp publishes a dozen builds
a day; nothing here takes a dependency younger than thirty days, and a release
with a month of use behind it is the one to want anyway. CUDA 12.4 rather than
13.4: the driver on this machine reports 13.1, and a binary built against a
newer toolkit than the driver carries will not load.

    python fetch_llama.py

About 20 GB. The weights land in `models/llama/` and the binaries in
`llama/`, neither of which is in git.
"""

from __future__ import annotations

import io
import shutil
import urllib.request
import zipfile
from pathlib import Path

from huggingface_hub import hf_hub_download

HERE = Path(__file__).resolve().parent
WEIGHTS = HERE / "models" / "llama"
BINARIES = HERE / "llama"

REPO = "Qwen/Qwen3-VL-30B-A3B-Instruct-GGUF"
#: Q4_K_M at about 18 GB, which mmap keeps on disk until a page is wanted.
MODEL = "Qwen3VL-30B-A3B-Instruct-Q4_K_M.gguf"
#: The vision encoder, separate in llama.cpp and small. F16 because it is the
#: half of this model that reads the painting, and it costs a gigabyte.
MMPROJ = "mmproj-Qwen3VL-30B-A3B-Instruct-F16.gguf"

BUILD = "b10933"
RELEASE = f"https://github.com/ggml-org/llama.cpp/releases/download/{BUILD}"
ZIPS = (
    f"llama-{BUILD}-bin-win-cuda-12.4-x64.zip",
    "cudart-llama-bin-win-cuda-12.4-x64.zip",
)


def weights() -> None:
    WEIGHTS.mkdir(parents=True, exist_ok=True)
    for name in (MMPROJ, MODEL):
        print("fetching", name, flush=True)
        got = hf_hub_download(REPO, name, local_dir=WEIGHTS)
        print("  ->", got, flush=True)


def binaries() -> None:
    BINARIES.mkdir(parents=True, exist_ok=True)
    for name in ZIPS:
        print("fetching", name, flush=True)
        with urllib.request.urlopen(f"{RELEASE}/{name}", timeout=120) as answer:
            held = io.BytesIO(answer.read())
        with zipfile.ZipFile(held) as archive:
            archive.extractall(BINARIES)
        print("  -> unpacked into", BINARIES, flush=True)

    server = next(BINARIES.rglob("llama-server.exe"), None)
    if server is None:
        raise SystemExit("llama-server.exe is not in the archive; the asset names have changed")
    # Some builds unpack into a `build/bin` folder and some into the root. The
    # engine looks in one place, so flatten whatever arrived.
    if server.parent != BINARIES:
        for found in server.parent.iterdir():
            shutil.move(str(found), BINARIES / found.name)
    print("server at", BINARIES / "llama-server.exe", flush=True)


if __name__ == "__main__":
    binaries()
    weights()
    print("done", flush=True)
