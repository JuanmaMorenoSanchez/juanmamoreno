"""What the engine throws away, and what it must not.

`out/` is everything a run wrote and nobody kept. Nothing ever deleted one:
measured on 17 November 2026 it had grown to 13 GB in 1,253 files going back
to the first spike, on the machine he paints on. A month is kept now.

Worth testing because it is the only code here that deletes his files.
"""

import time
import unittest
from pathlib import Path
from tempfile import TemporaryDirectory

from engine.service import prune

DAY = 24 * 60 * 60
MONTH = 30 * DAY


class PruningTest(unittest.TestCase):
    def setUp(self) -> None:
        self.folder = TemporaryDirectory()
        self.out = Path(self.folder.name)
        self.addCleanup(self.folder.cleanup)

    def aged(self, name: str, days: float) -> Path:
        path = self.out / name
        path.write_bytes(b"a clip")
        old = time.time() - days * DAY
        import os

        os.utime(path, (old, old))
        return path

    def test_it_takes_what_is_older_than_the_month(self) -> None:
        old = self.aged("f8ce50f2-clip.mp4", days=40)

        self.assertEqual(prune(self.out, MONTH), [old])
        self.assertFalse(old.exists())

    def test_it_leaves_everything_inside_the_month(self) -> None:
        # Including the one written a minute ago, which is the result he is
        # looking at while the engine restarts behind him.
        young = [self.aged("yesterday.png", days=1), self.aged("now.mp4", days=0)]

        self.assertEqual(prune(self.out, MONTH), [])
        self.assertTrue(all(one.exists() for one in young))

    def test_a_folder_is_never_taken(self) -> None:
        # A run in flight keeps a TemporaryDirectory in here.
        working = self.out / "tmpabc123"
        working.mkdir()
        old = time.time() - 90 * DAY
        import os

        os.utime(working, (old, old))

        self.assertEqual(prune(self.out, MONTH), [])
        self.assertTrue(working.is_dir())

    def test_it_says_nothing_of_a_folder_that_is_not_there(self) -> None:
        self.assertEqual(prune(self.out / "not-here", MONTH), [])

    def test_the_cutoff_is_the_month_and_not_a_day_either_side(self) -> None:
        just_inside = self.aged("just-inside.png", days=29.9)
        just_outside = self.aged("just-outside.png", days=30.1)

        self.assertEqual(prune(self.out, MONTH), [just_outside])
        self.assertTrue(just_inside.exists())
