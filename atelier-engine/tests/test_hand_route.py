"""The hand over HTTP: the names, and whether they are being asked for.

The two are saved by different gestures on the page — typing names and
pressing Save, or pressing the switch — so the route has to be able to write
one without resetting the other. A save of the names that silently turned the
style off would be the worst kind of bug here: it costs four hours of
generating to notice.
"""

from __future__ import annotations

import unittest
from pathlib import Path
from tempfile import TemporaryDirectory
from unittest import mock

from fastapi.testclient import TestClient

from engine import house, service


class HandRouteTest(unittest.TestCase):
    def setUp(self) -> None:
        self.client = TestClient(service.app)
        room = TemporaryDirectory()
        self.addCleanup(room.cleanup)
        local = Path(room.name) / "local"
        patched = mock.patch.multiple(
            house,
            LOCAL=local,
            HAND=local / "style.txt",
            USING=local / "style-on.txt",
            JUDGED=local / "hand-known.json",
        )
        patched.start()
        self.addCleanup(patched.stop)

        # Judging a name costs a model load, which this is not here to test.
        judged = mock.patch.object(service, "write_text", lambda *a, **kw: "KNOWN: yes\nLOOK: dark")
        judged.start()
        self.addCleanup(judged.stop)

    def test_an_engine_never_told_says_nothing_and_off(self) -> None:
        said = self.client.get("/hand").json()

        self.assertEqual(said["hand"], "")
        self.assertFalse(said["using"])

    def test_saves_the_names_and_says_where_the_switch_stands(self) -> None:
        said = self.client.put("/hand", json={"hand": "Goya, Neo Rauch"}).json()

        self.assertEqual(said["hand"], "Goya, Neo Rauch")
        # Off until he asks for it, whatever is written.
        self.assertFalse(said["using"])

    def test_turns_the_style_on(self) -> None:
        said = self.client.put("/hand", json={"hand": "Goya", "using": True}).json()

        self.assertTrue(said["using"])
        self.assertEqual(house.applied(), "Goya")

    def test_saving_the_names_alone_does_not_turn_the_style_off(self) -> None:
        self.client.put("/hand", json={"hand": "Goya", "using": True})

        # The page's Save sends no switch, because it is not what Save is for.
        said = self.client.put("/hand", json={"hand": "Goya, Rembrandt"}).json()

        self.assertTrue(said["using"])

    def test_flipping_the_switch_alone_does_not_erase_the_names(self) -> None:
        # The mirror of the test above, and the one that was missing. `hand`
        # defaulted to "" and was written whether or not it was sent, so a
        # request carrying only the switch wiped the names in silence and
        # answered as if nothing had happened. The page sends both, so nothing
        # on it ever showed this; a curl, or anything else asking this engine,
        # lost them.
        self.client.put("/hand", json={"hand": "Goya, Neo Rauch", "using": True})

        said = self.client.put("/hand", json={"using": False}).json()

        self.assertEqual(said["hand"], "Goya, Neo Rauch")
        self.assertFalse(said["using"])
        self.assertEqual(house.hand(), "Goya, Neo Rauch")

    def test_an_empty_hand_still_clears_it(self) -> None:
        # Sent and empty is an answer; left out is not. Emptying the box is
        # how the names are taken back, and that has to keep working.
        self.client.put("/hand", json={"hand": "Goya", "using": True})

        said = self.client.put("/hand", json={"hand": ""}).json()

        self.assertEqual(said["hand"], "")

    def test_turns_it_off_again_and_keeps_the_names(self) -> None:
        self.client.put("/hand", json={"hand": "Goya", "using": True})

        said = self.client.put("/hand", json={"hand": "Goya", "using": False}).json()

        self.assertFalse(said["using"])
        self.assertEqual(said["hand"], "Goya")
        self.assertEqual(house.applied(), "")

    def test_what_it_answers_is_what_the_next_read_says(self) -> None:
        self.client.put("/hand", json={"hand": "Goya", "using": True})

        said = self.client.get("/hand").json()

        self.assertEqual(said["hand"], "Goya")
        self.assertTrue(said["using"])


if __name__ == "__main__":
    unittest.main()
