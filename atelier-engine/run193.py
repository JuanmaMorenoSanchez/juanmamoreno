import sys, time
from pathlib import Path
sys.path.insert(0, r"C:\Users\User\Projects\juanmamoreno\atelier-engine")
from PIL import Image
from engine.video import animate, fit, shown, staged, write_video, afford, frames_for, SETTLES

HERE = Path(r"C:\Users\User\AppData\Local\Temp\claude\c--Users-User-Projects-juanmamoreno\1a75ce3a-aae7-446e-8f9b-d2ad63550654\scratchpad")

SAID = (
    "the reference image is a 150 x 140 cm oil painting on a wooden easel in the middle "
    "of the mountain. Cinematic drone view. Pretty, windy."
)
LONGEST, ROOM = 1152, 60.0

painting = Image.open(HERE / "193.jpg").convert("RGB")
size = fit(painting, LONGEST, in_a_scene=True)
afford(frames_for(3.0 + SETTLES), *size)
print(f"painting {painting.size} -> frame {size}", flush=True)
staged(painting, size, ROOM).save(HERE / "staged-193.png")

began = time.time()
frames = animate(
    painting, SAID, seconds=3.0, steps=30, guidance=5.0, seed=7,
    longest=LONGEST, in_a_scene=True, room=ROOM,
    watching=lambda step, total: print(f"  step {step}/{total}", flush=True),
)
out = HERE / "easel-193.mp4"
write_video(frames, out, size=shown(painting, frames[0].shape[1::-1], in_a_scene=True))
print(f"{len(frames)} frames in {time.time()-began:.0f}s -> {out}", flush=True)
