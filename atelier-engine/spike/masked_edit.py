"""
The whole point, as a graph: change one thing and leave the paint alone.

    painting -> find "the yellow jumper" -> isolate -> grow
                                                  \-> edit (with that mask)

Run through the real executor rather than by calling the functions, so what is
proved is the thing the editor will be driving.
"""
import sys, time
from pathlib import Path
sys.path.insert(0, str(Path(__file__).resolve().parent.parent))

import torch
from PIL import Image

from engine.catalogue import CATALOGUE
from engine.nodes import run_graph
from engine.registry import ModelRegistry

painting = Image.open(sys.argv[1]).convert("RGB")
painting.thumbnail((768, 768))
instruction = sys.argv[2]

registry = ModelRegistry(cache_dir=Path("models"),
                         device="cuda" if torch.cuda.is_available() else "cpu")

nodes = {
    "src":     {"type": "painting"},
    "find":    {"type": "find", "params": {"phrase": "the yellow jumper"}},
    "shape":   {"type": "isolate"},
    "wider":   {"type": "grow", "params": {"pixels": 6}},
    "changed": {"type": "edit", "params": {"instruction": instruction, "steps": 20}},
    "keep":    {"type": "save", "params": {"name": "masked-edit"}},
}
edges = [
    ("src", "image", "find", "image"),
    ("src", "image", "shape", "image"),
    ("find", "box", "shape", "box"),
    ("shape", "mask", "wider", "mask"),
    ("src", "image", "changed", "image"),
    ("wider", "mask", "changed", "mask"),
    ("changed", "image", "keep", "image"),
]

context = {"painting": painting, "registry": registry, "batch": "masked", "saved": []}
started = time.perf_counter()
produced = run_graph(CATALOGUE, nodes, edges, context)
took = time.perf_counter() - started

print(f"\nfound at {produced['find']['score']}, mask confidence {produced['shape']['confidence']}")
print(f"ran the whole graph in {took/60:.1f} min")
print("saved:", context["saved"])

edited = produced["changed"]["image"]
sheet = Image.new("RGB", (painting.width*2 + 12, painting.height), (24,24,26))
sheet.paste(painting, (0,0)); sheet.paste(edited, (painting.width+12, 0))
sheet.save("out/masked-edit-compare.jpg", quality=92)
print("wrote out/masked-edit-compare.jpg")
