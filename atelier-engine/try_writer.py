import json, sys, time
from pathlib import Path
sys.path.insert(0, str(Path(__file__).resolve().parent))
from engine.writer import write, available

SC = Path(r"C:/Users/User/AppData/Local/Temp/claude/c--Users-User-Projects-juanmamoreno/1a75ce3a-aae7-446e-8f9b-d2ad63550654/scratchpad")

if not available():
    print("weights not finished downloading yet"); raise SystemExit(1)

brief = (SC / "brief.txt").read_text(encoding="utf-8")
images = json.loads((SC / "images.json").read_text())
print("brief: %d chars | images: %d" % (len(brief), len(images)), flush=True)

t0 = time.time()
out = write(brief, images, watching=lambda s: print(" ", s, "(%.0fs)" % (time.time()-t0), flush=True))
took = time.time() - t0

(SC / "local-essay.txt").write_text(out, encoding="utf-8")
words = len(out.split())
print("\n%d words in %.0fs (%.1f words/s)" % (words, took, words/max(1,took)), flush=True)
print("=" * 70)
print(out[:2600])
