"""
Writing, on this machine: the essays and the short descriptions.

Qwen3-VL-30B-A3B-Instruct, Apache 2.0, through llama.cpp. **Vision-language,
and it has to be** — the brief shows the model the painting, up to four images
with the frontal view first, and the short description is written from the
picture too. A text-only model cannot do either job.

**This module owns no prompt.** The brief is four hundred lines of TypeScript
in the backend, with its own tests, and it has been corrected by hand many
times; a second copy here would drift from it within a week and nobody would
notice which one was being used. So the backend assembles the brief, the page
carries it here, and this runs a model over it. The only thing this file knows
about art criticism is how to hold the text while the model reads it.

**Why the model got four times bigger and the card did not.** Qwen3-VL-8B is
the best vision-language model of its size and it could not hold this brief: a
draft came back at 1,279 words against a brief asking for as long as the
painting is worth, with 43 em dashes against a rule that bans them outright,
and an invented account of a method for a canvas that never saw one. Those are
instruction-following failures, which is a size problem rather than a prompt
problem — the brief had already been corrected four times.

30B-A3B is a mixture of experts: 31B parameters of which 3B are active for any
one token. Attention and the shared expert sit on the card; `--n-cpu-moe`
leaves the routed experts in system memory for the processor. So the weights
are 18 GB and the card holds 8, and it still runs — faster than the 8B did
through transformers, which was streaming half a model across the bus per
token. The same trick in the same shape as the editor's block offload, one
layer down.

**A second process, deliberately.** llama.cpp is a server and this talks to it
over the loopback. The alternative was a Python binding, which would put a
CUDA build of llama.cpp inside this virtualenv and tie the engine's own
startup to it. A child process can be started when the first essay is asked
for, and it is: eighteen gigabytes are not mapped at import time.
"""

from __future__ import annotations

import atexit
import base64
import json
import os
import subprocess
import time
import urllib.error
import urllib.request
from pathlib import Path
from typing import Callable

HERE = Path(__file__).resolve().parent.parent
MODELS = HERE / "models" / "llama"
BINARIES = HERE / "llama"

SERVER = BINARIES / "llama-server.exe"
WEIGHTS = MODELS / "Qwen3VL-30B-A3B-Instruct-Q4_K_M.gguf"
MMPROJ = MODELS / "mmproj-Qwen3VL-30B-A3B-Instruct-F16.gguf"

#: Its own port, next to the engine's.
PORT = int(os.environ.get("ATELIER_WRITER_PORT", "7861"))

#: How many layers keep their routed experts in system memory.
#:
#: The whole of the trade. Lower puts more of the model on the card and runs
#: faster until it does not fit at all; 40 of the 48 layers is what leaves
#: room for the brief and a painting beside the weights that stay. An override
#: is here because the right number depends on what else is on the card, and
#: the editor leaves 1.4 GB of itself behind.
ON_CPU = int(os.environ.get("ATELIER_WRITER_CPU_MOE", "40"))

#: Room for the brief, the painting and the essay.
#:
#: The brief runs to about seven thousand tokens, a painting at 1024px adds
#: something over a thousand, and the answer is the essay and the short
#: version after it.
CONTEXT = int(os.environ.get("ATELIER_WRITER_CONTEXT", "16384"))

#: The longest an essay may run before it is cut off.
#:
#: The brief no longer gives a word count — the essay is as long as the
#: painting is worth — so this is the only ceiling, and it is here to stop a
#: model that has started repeating itself rather than to shape the prose.
#: 1,600 tokens of essay plus the short version after it.
MOST_TOKENS = 2200

#: How long to wait for eighteen gigabytes to be mapped and the card filled.
READY_WITHIN = float(os.environ.get("ATELIER_WRITER_WAIT", "420"))

_server: subprocess.Popen | None = None


def available() -> bool:
    """The binary and both halves of the model, on disk.

    Both, because the vision encoder is a separate file in llama.cpp and a
    model without it answers about an image it cannot see. The 8B before this
    reported itself available on a 787 MB partial download, which surfaced
    minutes later as a missing shard.
    """
    return SERVER.exists() and WEIGHTS.exists() and MMPROJ.exists()


def _answering() -> bool:
    try:
        with urllib.request.urlopen(f"http://127.0.0.1:{PORT}/health", timeout=2) as answer:
            return answer.status == 200
    except (urllib.error.URLError, OSError, TimeoutError):
        return False


def _start(watching: Callable[[str], None] | None = None) -> None:
    """Start the server, or do nothing if one is already answering.

    Already answering covers two cases: this process started it earlier, and
    he started one by hand. Neither wants a second copy mapping eighteen
    gigabytes against the first.
    """
    global _server

    if _answering():
        return
    if not available():
        raise FileNotFoundError(
            f"{WEIGHTS.name} is not downloaded. Run `python fetch_llama.py` in atelier-engine."
        )

    if watching is not None:
        watching("starting the writer — the first essay of a session waits for the model to load")

    _server = subprocess.Popen(
        [
            str(SERVER),
            "-m",
            str(WEIGHTS),
            "--mmproj",
            str(MMPROJ),
            # Every layer offered to the card; --n-cpu-moe then takes the
            # routed experts back off it. The two together are what fits.
            "-ngl",
            "99",
            "--n-cpu-moe",
            str(ON_CPU),
            "-c",
            str(CONTEXT),
            # The model's own chat template, which is what puts the image in
            # the right place in the conversation.
            "--jinja",
            "--host",
            "127.0.0.1",
            "--port",
            str(PORT),
        ],
        cwd=str(HERE),
        stdout=subprocess.DEVNULL,
        stderr=subprocess.DEVNULL,
    )
    atexit.register(stop)

    began = time.time()
    while time.time() - began < READY_WITHIN:
        if _server.poll() is not None:
            raise RuntimeError(
                f"the writer stopped while loading (exit {_server.returncode}). "
                "Run llama-server by hand to see why."
            )
        if _answering():
            return
        time.sleep(2.0)

    stop()
    raise TimeoutError(f"the writer did not answer within {READY_WITHIN:.0f}s")


def stop() -> None:
    """Hand back the card and the system memory."""
    global _server

    if _server is None:
        return
    if _server.poll() is None:
        _server.terminate()
        try:
            _server.wait(timeout=20)
        except subprocess.TimeoutExpired:  # pragma: no cover - a wedged child
            _server.kill()
    _server = None


def write(
    prompt: str,
    images: list[str] | None = None,
    most_tokens: int = MOST_TOKENS,
    temperature: float = 0.9,
    watching: Callable[[str], None] | None = None,
) -> str:
    """Whatever the brief asked for, as text.

    `prompt` is assembled elsewhere and passed through untouched. `images` are
    base64 JPEGs, the frontal view first, exactly as the backend already sends
    them to Gemini.
    """
    _start(watching)

    content: list[dict] = []
    for one in images or []:
        # A data url either way: the server takes one, and the backend sends
        # bare base64.
        url = one if one.lstrip().startswith("data:") else f"data:image/jpeg;base64,{one}"
        content.append({"type": "image_url", "image_url": {"url": url}})
    content.append({"type": "text", "text": prompt})

    if watching is not None:
        watching("writing")

    asking = json.dumps(
        {
            "messages": [{"role": "user", "content": content}],
            "max_tokens": most_tokens,
            "temperature": temperature,
            "top_p": 0.95,
            # Repetition is the failure of a model asked for long prose, and
            # it is better to loosen this than to cut the essay off.
            "repeat_penalty": 1.05,
            "stream": False,
        }
    ).encode("utf-8")
    request = urllib.request.Request(
        f"http://127.0.0.1:{PORT}/v1/chat/completions",
        data=asking,
        headers={"Content-Type": "application/json"},
    )
    # No deadline. An essay takes minutes and a timeout here throws away work
    # that is already paid for in card time.
    with urllib.request.urlopen(request) as answer:
        said = json.load(answer)

    return said["choices"][0]["message"]["content"].strip()


def _as_data_url(path: Path) -> str:
    """A file as the server wants it. For trying this by hand."""
    return "data:image/jpeg;base64," + base64.b64encode(path.read_bytes()).decode("ascii")
