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
from engine.nodes import GraphError


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


class AloneOnTheCardTest(unittest.TestCase):
    """
    Refusing to build a model while something else has the card.

    A clip was started while a game was running. The card was at 7,865 of
    8,188 MiB and a hundred per cent, the machine was at 98% of its commit
    limit, and the engine had forty gigabytes committed with seven hundred
    megabytes resident — paged almost entirely out. One step took forty-four
    minutes; the clip would have finished the next day.

    Nothing about the clip was wrong. By token count it was 0.98 of the
    measured point, the same work as one that runs at twenty seconds a step.
    `afford` had no view on it, because `afford` is arithmetic about the clip
    and this is a fact about the machine.
    """

    class Card:
        def __init__(self, free, total=8188):
            self.reading = (free, total)

        def vram(self):
            return self.reading

    def test_an_empty_card_is_fine(self) -> None:
        catalogue._alone_on_the_card({"registry": self.Card(7096)}, "the editor")

    def test_a_card_a_game_is_using_is_refused(self) -> None:
        with self.assertRaises(GraphError) as refused:
            catalogue._alone_on_the_card({"registry": self.Card(92)}, "the clip model")

        said = str(refused.exception)
        self.assertIn("92", said)
        self.assertIn("8188", said)
        self.assertIn("clip model", said)

    def test_the_refusal_says_what_to_do(self) -> None:
        with self.assertRaises(GraphError) as refused:
            catalogue._alone_on_the_card({"registry": self.Card(92)}, "the editor")

        self.assertIn("Close", str(refused.exception))

    def test_it_says_nothing_about_a_machine_with_no_card(self) -> None:
        # `vram()` answers None where there is no CUDA device, and a machine
        # without one has other problems than this.

        class NoCard:
            def vram(self):
                return None

        catalogue._alone_on_the_card({"registry": NoCard()}, "the editor")

    def test_no_registry_is_not_an_error(self) -> None:
        catalogue._alone_on_the_card({}, "the editor")

    def test_it_leaves_room_for_the_engine_holding_the_card_itself(self) -> None:
        # Once a model is up, free memory is legitimately small — about a
        # gigabyte and a half on a second edit, which is working as intended.
        # That is why this is only asked before building, and why the bar is
        # not set near it.
        self.assertGreater(catalogue.ENOUGH_CARD, 1536)
