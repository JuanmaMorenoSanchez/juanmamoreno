"""
The Compose box: pieces from several paintings, arranged on the page.

The arranging happens there and not here, because the shelf of cut-outs is
there — hundreds of layers in a bucket the engine cannot see and has no
business signing in to. What arrives with Run is the picture the page made, in
the same way and by the same route as the painting itself.

So what is worth testing is the join: that the picture reaches the box, that it
keeps what is see-through, and that a graph asking for one without having
arranged anything says so in a sentence rather than throwing.
"""

import io
import time
import unittest

from fastapi.testclient import TestClient
from PIL import Image

from engine import service
from engine.catalogue import CATALOGUE
from engine.nodes import run_graph


def a_picture(mode="RGB", size=(32, 32), colour=(40, 90, 160)) -> bytes:
    buffer = io.BytesIO()
    Image.new(mode, size, colour).save(buffer, format="PNG")
    return buffer.getvalue()


class ComposeNodeTest(unittest.TestCase):
    def test_it_hands_on_the_picture_the_page_arranged(self) -> None:
        made = Image.new("RGBA", (8, 8), (255, 0, 0, 255))

        produced = run_graph(
            CATALOGUE,
            {"a": {"type": "compose", "params": {}}},
            [],
            {"composition": made},
        )

        self.assertIs(produced["a"]["image"], made)

    def test_it_says_so_when_nothing_has_been_arranged(self) -> None:
        # A graph with an empty Compose box in it is the ordinary mistake, and
        # the person reading the answer is looking at a picture of boxes. A
        # plain ValueError like every other box's own complaint: GraphError is
        # for a graph that cannot be run at all, which this one can.
        with self.assertRaises(ValueError) as refused:
            run_graph(CATALOGUE, {"a": {"type": "compose", "params": {}}}, [], {})

        self.assertIn("arranged", str(refused.exception))

    def test_it_is_published_to_the_page_with_its_arrangement(self) -> None:
        # The page draws whatever /nodes publishes, so a box that is not in
        # the answer does not exist as far as the editor is concerned.
        published = CATALOGUE["compose"].published()

        self.assertEqual(published["inputs"], [])
        self.assertEqual([port["name"] for port in published["outputs"]], ["image"])
        self.assertEqual([p["kind"] for p in published["params"]], ["arrangement"])
        self.assertTrue(published["help"], "a box has to arrive explained")


class CompositionUploadTest(unittest.TestCase):
    def setUp(self) -> None:
        self.client = TestClient(service.app)

    def finished(self, answer) -> dict:
        """The run's own record, once it has stopped moving."""
        self.assertEqual(answer.status_code, 202, answer.text)
        name = answer.json()["job"]
        for _ in range(100):
            state = self.client.get(f"/jobs/{name}").json()
            if state["state"] in ("done", "failed"):
                return state
            time.sleep(0.05)
        self.fail("the run never finished")

    def test_the_arranged_picture_reaches_the_box(self) -> None:
        # End to end, which is the join worth testing: the page's png goes up
        # with the graph, the box hands it on, and the run comes back done.
        state = self.finished(
            self.client.post(
                "/graph",
                files={
                    "image": ("painting.png", a_picture(), "image/png"),
                    "composition": (
                        "made.png",
                        a_picture("RGBA", colour=(0, 0, 0, 0)),
                        "image/png",
                    ),
                },
                data={"graph": '{"nodes":{"a":{"type":"compose","params":{}}},"edges":[]}'},
            )
        )

        self.assertEqual(state["state"], "done", state.get("detail"))

    def test_a_compose_box_with_nothing_sent_fails_in_words(self) -> None:
        state = self.finished(
            self.client.post(
                "/graph",
                files={"image": ("painting.png", a_picture(), "image/png")},
                data={"graph": '{"nodes":{"a":{"type":"compose","params":{}}},"edges":[]}'},
            )
        )

        self.assertEqual(state["state"], "failed")
        self.assertIn("arranged", (state.get("detail") or "").lower())

    def test_a_graph_without_one_is_still_a_graph(self) -> None:
        # Every graph that has no Compose box in it, which is all of them so
        # far: the field is optional and its absence is not an error.
        answer = self.client.post(
            "/graph",
            files={"image": ("painting.png", a_picture(), "image/png")},
            data={"graph": '{"nodes":{},"edges":[]}'},
        )

        self.assertEqual(answer.status_code, 202)

    def test_what_is_see_through_stays_see_through(self) -> None:
        # Transparent is one of the three grounds, and the painting's own
        # reader converts to RGB — which would fill every clear pixel black.
        clear = io.BytesIO(a_picture("RGBA", colour=(0, 0, 0, 0)))

        class Upload:
            file = clear

        self.assertEqual(service._read_layer(Upload()).mode, "RGBA")


if __name__ == "__main__":
    unittest.main()
