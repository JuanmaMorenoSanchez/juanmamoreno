"""
Handing the card back before each box that wants it.

There are two twelve-gigabyte pipelines here and one eight-gigabyte card, and
each is held by a cache the registry knows nothing about. So every box that
needs the card says which pipeline it is about to use and clears the rest off.

**And asks the driver for the memory back every time**, which was briefly
conditional on something having been dropped. An edit keeps the editor, so
nothing is dropped, so the cache was never emptied — and what each run leaves
behind accumulated until the card had no free memory at all, at which point
Windows oversubscribed into system memory rather than failing. Measured on five
edits in a row: the first took 361 seconds and the second 4,179.

That is why these tests watch the order and the fact of the release rather than
the result. A single run cannot tell the difference; only the next one can.
"""

import unittest

from engine import catalogue


class Watching:
    def __init__(self) -> None:
        self.done: list[str] = []

    def evict(self) -> None:
        self.done.append("evict")

    def release(self) -> None:
        self.done.append("release")


class MakeRoomTest(unittest.TestCase):
    def setUp(self) -> None:
        self.kept = catalogue.forget_editor, catalogue.forget_clips
        catalogue.forget_editor = lambda: self.watched.done.append("forget editor") or False
        catalogue.forget_clips = lambda: self.watched.done.append("forget clips") or False
        self.watched = Watching()

    def tearDown(self) -> None:
        catalogue.forget_editor, catalogue.forget_clips = self.kept

    def room_for(self, keeping: str) -> list[str]:
        self.watched.done = []
        catalogue._make_room({"registry": self.watched}, keeping=keeping)
        return self.watched.done

    def test_an_edit_keeps_the_editor_and_drops_the_clips(self) -> None:
        done = self.room_for("edit")

        self.assertNotIn("forget editor", done)
        self.assertIn("forget clips", done)

    def test_a_clip_keeps_the_clips_and_drops_the_editor(self) -> None:
        done = self.room_for("video")

        self.assertIn("forget editor", done)
        self.assertNotIn("forget clips", done)

    def test_a_box_that_wants_neither_drops_both(self) -> None:
        done = self.room_for("nothing")

        self.assertIn("forget editor", done)
        self.assertIn("forget clips", done)

    def test_the_card_is_handed_back_even_when_nothing_was_dropped(self) -> None:
        # The regression. An edit after an edit drops nothing, and skipping
        # the release there is what filled the card over five runs.
        done = self.room_for("edit")

        self.assertIn("release", done)

    def test_it_is_handed_back_whichever_box_asked(self) -> None:
        for keeping in ("edit", "video", "nothing"):
            with self.subTest(keeping=keeping):
                self.assertIn("release", self.room_for(keeping))

    def test_the_release_comes_after_the_dropping(self) -> None:
        # Nothing to hand over until the thing holding it has let go.
        done = self.room_for("video")

        self.assertLess(done.index("forget editor"), done.index("release"))

    def test_nothing_falls_over_without_a_registry(self) -> None:
        catalogue._make_room({}, keeping="edit")


if __name__ == "__main__":
    unittest.main()
