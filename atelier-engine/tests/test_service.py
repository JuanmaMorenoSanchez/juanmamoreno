"""
The HTTP surface, without a GPU or a gigabyte of weights.

The models are replaced with functions that return a fixed box and a fixed
rectangle, so what is tested here is the service: what it accepts, what it
refuses, what shape it answers in, and the two guards that matter — the origins
it will talk to, and the fact that a layer name is not a path.
"""

import unittest
from pathlib import Path

import numpy as np
from fastapi.testclient import TestClient
from PIL import Image

from engine import service
from engine.operations import Found


def a_painting(size=(64, 64)) -> bytes:
    import io

    buffer = io.BytesIO()
    Image.new("RGB", size, (40, 90, 160)).save(buffer, format="PNG")
    return buffer.getvalue()


class ServiceTest(unittest.TestCase):
    def setUp(self) -> None:
        self.client = TestClient(service.app)
        self.out = service.OUT
        self.out.mkdir(exist_ok=True)

        # Stand-ins. The real ones need a card and 900 MB of weights, and what
        # they return is judged by eye rather than asserted on.
        self._find = service.find
        self._isolate = service.isolate
        service.find = lambda registry, painting, phrase, **kw: (
            [] if phrase == "nothing at all" else [Found(phrase, (8.0, 8.0, 40.0, 40.0), 0.42)]
        )

        def fake_isolate(registry, painting, box=None, points=None, negative=None):
            mask = np.zeros((painting.height, painting.width), dtype=bool)
            if box is not None:
                x0, y0, x1, y1 = (int(v) for v in box)
                mask[y0:y1, x0:x1] = True
            return mask, 0.97

        service.isolate = fake_isolate

    def tearDown(self) -> None:
        service.find = self._find
        service.isolate = self._isolate
        for leftover in self.out.glob("*.png"):
            # Only this test's own batches; the spikes write here too.
            if len(leftover.name.split("-")[0]) == 8 and leftover.stat().st_size < 200_000:
                leftover.unlink(missing_ok=True)

    def test_health_says_whether_there_is_room(self) -> None:
        body = self.client.get("/health").json()

        self.assertTrue(body["ok"])
        self.assertIn("vram_free_mib", body)
        self.assertIn("resident", body)

    def test_models_say_what_they_are_licensed_under(self) -> None:
        # On the page beside each model, because which licence a model carries
        # is the thing that decided it was in this list at all.
        body = self.client.get("/models").json()
        licences = {m["key"]: m["licence"] for m in body["models"]}

        self.assertEqual(licences["grounding-dino"], "Apache-2.0")
        self.assertEqual(licences["sam2.1-small"], "Apache-2.0")

    def test_cut_returns_a_layer_per_label_and_a_background(self) -> None:
        response = self.client.post(
            "/cut",
            files={"image": ("p.png", a_painting(), "image/png")},
            data={"labels": "a girl\na blue shirt"},
        )
        body = response.json()

        self.assertEqual(response.status_code, 200)
        self.assertEqual([layer["label"] for layer in body["layers"]], ["a girl", "a blue shirt"])
        self.assertIsNotNone(body["background"])
        self.assertEqual(body["not_found"], [])

    def test_a_label_it_will_not_even_guess_at_is_named(self) -> None:
        response = self.client.post(
            "/cut",
            files={"image": ("p.png", a_painting(), "image/png")},
            data={"labels": "a girl\nnothing at all"},
        )
        body = response.json()

        self.assertEqual(body["not_found"], ["nothing at all"])
        self.assertEqual(len(body["layers"]), 1)

    def test_every_layer_carries_its_score_rather_than_a_verdict(self) -> None:
        # Deliberate: a cut coming back is not evidence the thing is there. The
        # model returned "a unicorn" at 0.395 on a canvas with none, against
        # 0.418 for a girl who was. The page shows the numbers and he judges.
        body = self.client.post(
            "/cut",
            files={"image": ("p.png", a_painting(), "image/png")},
            data={"labels": "a girl"},
        ).json()
        layer = body["layers"][0]

        self.assertIn("score", layer)
        self.assertIn("iou", layer)
        self.assertIn("coverage", layer)
        self.assertNotIn("found", layer)

    def test_cutting_nothing_is_refused(self) -> None:
        response = self.client.post(
            "/cut",
            files={"image": ("p.png", a_painting(), "image/png")},
            data={"labels": "   \n  "},
        )

        self.assertEqual(response.status_code, 400)

    def test_something_that_is_not_an_image_is_refused(self) -> None:
        response = self.client.post(
            "/cut",
            files={"image": ("p.png", b"not a png at all", "image/png")},
            data={"labels": "a girl"},
        )

        self.assertEqual(response.status_code, 400)

    def test_a_layer_name_is_not_a_path(self) -> None:
        # This process can read the whole disk. The name comes from a browser.
        for attempt in ["../requirements.txt", "..%2F..%2Frequirements.txt", "nope.png"]:
            with self.subTest(attempt=attempt):
                self.assertEqual(self.client.get(f"/layer/{attempt}").status_code, 404)

    def test_only_his_own_pages_are_allowed_to_call_it(self) -> None:
        # A wildcard here would let any page in any open tab reach a service
        # that reads this disk and holds his paintings.
        allowed = self.client.get("/health", headers={"Origin": "https://juanmamoreno.com"})
        self.assertEqual(
            allowed.headers.get("access-control-allow-origin"), "https://juanmamoreno.com"
        )

        stranger = self.client.get("/health", headers={"Origin": "https://example.com"})
        self.assertIsNone(stranger.headers.get("access-control-allow-origin"))

    def test_it_answers_the_local_network_preflight(self) -> None:
        # Chrome gates a public page reaching 127.0.0.1, enforced since 142.
        response = self.client.get("/health")

        self.assertEqual(response.headers.get("access-control-allow-private-network"), "true")

    def test_it_publishes_its_ready_made_flows(self) -> None:
        # Served rather than written into the page, so a flow added here is a
        # button on the deployed site without the site being released.
        served = self.client.get("/flows").json()["flows"]

        self.assertTrue(served)
        self.assertIn("change-a-part", {flow["key"] for flow in served})
        for flow in served:
            self.assertTrue(flow["label"])
            self.assertTrue(flow["nodes"])


if __name__ == "__main__":
    unittest.main()
