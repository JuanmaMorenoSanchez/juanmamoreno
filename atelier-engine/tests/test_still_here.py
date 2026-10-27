"""
The way back to a finished run.

**Four and a half hours of card time nearly went in the bin.** A Scenes run
wrote `28e867e2-scenes.mp4`, reported success, and the page showed no player
and no Keep, because it looked for boxes of one type and the box that filmed
was the other. The file was on the disk the whole time with no route to it from
the page that had asked for it — and there is none either for a run whose page
was reloaded, which is the same loss with an ordinary cause.

`out/` is scratch and is never swept, so everything is still there. This lists
it. It does not keep anything: keeping is a press in the browser, through the
browser's own credential, and nothing in the engine can reach the bucket.
"""

import os
import unittest
from pathlib import Path
from tempfile import TemporaryDirectory

from fastapi.testclient import TestClient

from engine import service


class StillHereTest(unittest.TestCase):
    def setUp(self) -> None:
        self.client = TestClient(service.app)
        # Its own folder, because the real one holds months of runs: a fixture
        # dated last year is not in the newest two dozen and the assertions
        # would be about his files rather than about this.
        self.folder = TemporaryDirectory()
        self.was = service.OUT
        self.out = Path(self.folder.name)
        service.OUT = self.out

    def tearDown(self) -> None:
        service.OUT = self.was
        self.folder.cleanup()

    def wrote(self, name: str, when: float | None = None) -> Path:
        path = self.out / name
        path.write_bytes(b"not really a file")
        if when is not None:
            os.utime(path, (when, when))
        return path

    def listed(self) -> list[dict]:
        answer = self.client.get("/out")
        self.assertEqual(answer.status_code, 200)
        return answer.json()["files"]

    def named(self) -> set[str]:
        return {made["file"] for made in self.listed()}

    def test_a_clip_on_the_disk_is_listed(self) -> None:
        self.wrote("aaa11111-scenes.mp4")

        self.assertIn("aaa11111-scenes.mp4", self.named())

    def test_a_picture_on_the_disk_is_listed(self) -> None:
        self.wrote("aaa22222-layer.png")

        self.assertIn("aaa22222-layer.png", self.named())

    def test_a_sketch_is_not_offered_back(self) -> None:
        # Javascript, kept as the code it is through its own button and its own
        # route. Offered here it would be posted to the bucket as a png.
        self.wrote("aaa33333-piece.js")

        self.assertNotIn("aaa33333-piece.js", self.named())

    def test_newest_first(self) -> None:
        # Because the one he wants is the one he has just been waiting for.
        old = self.wrote("aaa44444-clip.mp4", when=1_000_000)
        new = self.wrote("aaa55555-clip.mp4", when=2_000_000)

        order = [made["file"] for made in self.listed()]
        self.assertLess(order.index(new.name), order.index(old.name))

    def test_each_one_says_what_it_is_and_when_it_was_made(self) -> None:
        self.wrote("aaa66666-clip.mp4", when=1_700_000_000)

        made = next(one for one in self.listed() if one["file"] == "aaa66666-clip.mp4")
        self.assertEqual(made["media"], "video/mp4")
        self.assertEqual(made["when"], 1_700_000_000)
        self.assertEqual(made["bytes"], len(b"not really a file"))

    def test_no_more_than_it_will_list(self) -> None:
        # `out/` is never swept and holds months of runs. Nobody scrolls a
        # hundred of them.
        for at in range(service.MOST_LISTED + 6):
            self.wrote(f"{at:08d}-clip.mp4")

        self.assertEqual(len(self.listed()), service.MOST_LISTED)

    def test_nothing_is_kept_by_asking(self) -> None:
        # It lists, it does not send. The engine cannot reach the bucket at
        # all, and this must not be the thing that changes that.
        self.wrote("aaa77777-clip.mp4")
        before = sorted(path.name for path in self.out.iterdir())

        self.listed()

        self.assertEqual(sorted(path.name for path in self.out.iterdir()), before)

    def test_a_folder_that_has_been_cleared_is_empty_rather_than_an_error(self) -> None:
        # Honest, and different from the engine being unreachable: the page
        # says one of those two things and they are not the same news.
        service.OUT = self.out / "gone"

        self.assertEqual(self.listed(), [])


if __name__ == "__main__":
    unittest.main()
