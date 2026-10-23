"""
Editing in his own hand, without training anything.

The whole of this is an instruction and a choice of two paintings, so the
instruction and the choice are what is tested. No model is loaded here: what
the editor does with three images is the editor's business, and eighteen
minutes of card is not a unit test.
"""

import unittest
from pathlib import Path
from tempfile import TemporaryDirectory

from PIL import Image

from unittest import mock

from engine import house, style
from engine.catalogue import CATALOGUE
from engine.nodes import GraphError


def a_painting(where: Path, colour=(120, 90, 40)) -> None:
    where.parent.mkdir(parents=True, exist_ok=True)
    Image.new("RGB", (64, 80), colour).save(where, quality=90)


class InstructionTest(unittest.TestCase):
    def test_it_names_the_medium_of_the_style_asked_for(self) -> None:
        self.assertIn("oil on canvas", style.instruction("oil"))
        self.assertIn("watercolour on paper", style.instruction("watercolour"))

    def test_it_says_the_references_are_the_manner_and_not_the_subject(self) -> None:
        # The failure this sentence exists to prevent: shown two paintings and
        # told to repaint, the model brings a figure across from one of them
        # and the result is a collage rather than a restyle.
        for which in ("oil", "watercolour"):
            with self.subTest(which=which):
                said = style.instruction(which)
                self.assertIn("Keep the first image's subject, composition and layout", said)
                self.assertIn("none of their figures, objects, places or subject matter", said)

    def test_the_painting_is_the_first_image(self) -> None:
        # Positional, and the only thing holding the two in agreement is that
        # both say so: the node passes the painting first and the instruction
        # calls it "the first image".
        self.assertIn("Repaint the first image", style.instruction("oil"))

    def test_what_he_types_arrives_as_a_change_rather_than_a_description(self) -> None:
        said = style.instruction("oil", "the sky goes to evening")

        self.assertIn("also make this change: the sky goes to evening", said)
        # And still keeps the layout: a change on top of a restyle, not instead
        # of one.
        self.assertIn("Keep the first image's subject", said)

    def test_an_empty_request_adds_nothing_at_all(self) -> None:
        self.assertEqual(style.instruction("oil", "   "), style.instruction("oil"))

    def test_a_style_it_does_not_have_is_named_with_the_ones_it_does(self) -> None:
        with self.assertRaises(ValueError) as refused:
            style.instruction("acrylic")

        self.assertIn("acrylic", str(refused.exception))
        self.assertIn("oil", str(refused.exception))


class ReferenceTest(unittest.TestCase):
    def setUp(self) -> None:
        self.held = TemporaryDirectory()
        self.folder = Path(self.held.name)
        self.was = style.REFERENCES
        style.REFERENCES = self.folder
        style._found.cache_clear()
        for index in range(5):
            a_painting(self.folder / "oil" / f"{index}-a-painting.jpg")

    def tearDown(self) -> None:
        style.REFERENCES = self.was
        style._found.cache_clear()
        self.held.cleanup()

    def test_it_hands_over_two_and_only_two(self) -> None:
        # The model takes three images in total and one of them is the canvas.
        self.assertEqual(len(style.references("oil")), style.AT_ONCE)
        self.assertEqual(style.AT_ONCE, 2)

    def test_the_same_pick_is_the_same_pair_every_time(self) -> None:
        # Otherwise the seed is worthless: arriving at the same image twice is
        # the one thing a seed is for.
        first = style._found("oil")
        self.assertEqual(first, style._found("oil"))
        self.assertEqual([p.name for p in first], sorted(p.name for p in first))

    def test_stepping_the_pick_gives_a_different_pair(self) -> None:
        style.REFERENCES = self.folder
        one = style.references("oil", 0)
        two = style.references("oil", 1)

        self.assertNotEqual([i.size for i in one], None)
        self.assertEqual(len(two), 2)
        # Five files, two at a time: 0 is the first two and 1 the next two.
        self.assertEqual([p.name for p in style._found("oil")][:2], ["0-a-painting.jpg", "1-a-painting.jpg"])

    def test_a_pick_past_the_end_wraps_rather_than_failing(self) -> None:
        # Every number is a valid pair, because the field is a number and he
        # is going to keep pressing it.
        self.assertEqual(len(style.references("oil", 99)), 2)

    def test_a_style_with_too_few_paintings_says_how_to_get_them(self) -> None:
        a_painting(self.folder / "watercolour" / "only-one.jpg")
        style._found.cache_clear()

        self.assertFalse(style.available("watercolour"))
        with self.assertRaises(FileNotFoundError) as refused:
            style.references("watercolour")

        self.assertIn("fetch_references.py", str(refused.exception))

    def test_a_style_with_enough_is_available(self) -> None:
        self.assertTrue(style.available("oil"))


class NodeTest(unittest.TestCase):
    """The switch on Edit, which used to be a box of its own.

    One operation with a switch rather than two boxes: the model, the mask,
    the minutes and every setting were the same, and the difference was two
    reference images and a sentence in front.
    """

    def setUp(self) -> None:
        self.node = CATALOGUE["edit"]
        # His own hand lives in `local/`, which these tests must not read:
        # a run refuses before it starts if the hand names a painter the
        # model has never heard of, and whose names are in that file on this
        # machine is not a thing any test should depend on.
        room = TemporaryDirectory()
        self.addCleanup(room.cleanup)
        empty = Path(room.name) / "local"
        patched = mock.patch.multiple(
            house, LOCAL=empty, HAND=empty / "style.txt", JUDGED=empty / "hand-known.json"
        )
        patched.start()
        self.addCleanup(patched.stop)

    def test_it_offers_the_styles_as_a_list_rather_than_a_text_field(self) -> None:
        # A typed style would be a typo discovered eighteen minutes later.
        which = next(p for p in self.node.params if p.name == "style")

        self.assertEqual(which.kind, "choice")
        self.assertEqual(which.choices, ("none", "oil", "watercolour"))
        # Off by default: an edit is an edit until he says otherwise.
        self.assertEqual(which.default, "none")

    def test_the_choices_reach_the_page(self) -> None:
        published = next(p for p in self.node.published()["params"] if p["name"] == "style")

        self.assertEqual(published["choices"], ("none", "oil", "watercolour"))

    def test_it_arrives_explained_like_every_other_box(self) -> None:
        # The explanations are written in `help.py` and fastened on after the
        # catalogue is built, replacing whatever the node was declared with.
        # Writing them inline instead is silent: the node is published with an
        # empty ? and nothing fails.
        self.assertIn("two of his own paintings go in beside the canvas", self.node.help)
        for param in self.node.params:
            with self.subTest(param=param.name):
                self.assertTrue(param.help, f"{param.name} has no note in PARAM_HELP")

    def test_it_takes_a_mask_but_does_not_need_one(self) -> None:
        mask = next(p for p in self.node.inputs if p.name == "mask")

        self.assertTrue(mask.optional)

    def test_a_missing_reference_folder_fails_before_the_model_loads(self) -> None:
        # Twelve gigabytes and four minutes of spill happen after this check,
        # and a missing folder used to surface at the end of all of it.
        #
        # **With the switch on**, which matters here more than it reads: the
        # guard is the only thing in this test standing between it and a real
        # twenty-billion-parameter load. Run with the style off, it does not
        # fire, the model is fetched for real, and the suite sits there for
        # ten minutes — which is exactly what happened once.
        with TemporaryDirectory() as empty:
            was, style.REFERENCES = style.REFERENCES, Path(empty)
            style._found.cache_clear()
            try:
                with self.assertRaises(GraphError) as refused:
                    self.node.run(
                        inputs={"image": Image.new("RGB", (8, 8))},
                        params={
                            **{p.name: p.default for p in self.node.params},
                            "style": "oil",
                        },
                        context={},
                    )
            finally:
                style.REFERENCES = was
                style._found.cache_clear()

        self.assertIn("fetch_references.py", str(refused.exception))
        self.assertIn("oil", str(refused.exception))

    def test_with_the_switch_off_it_is_his_instruction_and_nothing_else(self) -> None:
        # No references, no sentence in front: the box as it was before the
        # style was folded into it.
        self.assertEqual(style.instruction(style.OFF, "make the jumper deep red"),
                         "make the jumper deep red")
        self.assertEqual(style.instruction("", "  spaced  "), "spaced")


if __name__ == "__main__":
    unittest.main()
