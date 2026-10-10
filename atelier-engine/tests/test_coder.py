"""
Turning what a coder model says into something a browser can run.

Every case here is a real answer, lightly trimmed. A 1.5B model asked for
plain JavaScript returned `class Piece implements Sketch` with `private width:
number` and `resize?(ctx, ...)`; shown a worked example instead of told a rule
it returned good JavaScript and called the class `DustMote`. Those two are the
whole reason this module is more than a string.

No weights are loaded. The model is a pair of sentinels that says what it was
told to say, which is what lets the retry be tested at all: the real thing
takes minutes a go.
"""

import unittest

import torch

from engine.coder import SHARPER, _called_piece, _just_the_class, _typescript_in, write_sketch

GOOD = """\
class Piece {
  setup(ctx, width, height) { this.dots = []; }
  draw(ctx, frame) { ctx.fillRect(0, 0, frame.width, frame.height); }
}"""

TYPED = """\
class Piece implements Sketch {
  private width: number;
  setup(ctx: CanvasRenderingContext2D, width: number, height: number): void { }
  draw(ctx, frame) { }
  resize?(ctx, width, height) { }
}"""


class WhatItSaidTest(unittest.TestCase):
    def test_takes_the_fence_off(self) -> None:
        said = "Here you go:\n\n```javascript\n%s\n```\n\nHope that helps!" % GOOD

        self.assertEqual(_just_the_class(said), GOOD)

    def test_accepts_an_answer_with_no_fence(self) -> None:
        self.assertEqual(_just_the_class(GOOD), GOOD)

    def test_refuses_prose(self) -> None:
        with self.assertRaises(ValueError):
            _just_the_class("I would be happy to help! What sort of piece did you want?")


class CalledPieceTest(unittest.TestCase):
    """The class name is an interface detail, so it is corrected, not refused."""

    def test_leaves_a_correctly_named_class_alone(self) -> None:
        self.assertEqual(_called_piece(GOOD), GOOD)

    def test_renames_the_one_class_it_wrote(self) -> None:
        # The real answer: good JavaScript, named after the subject.
        said = "class DustMote {\n  setup(ctx, w, h) { this.n = 1; }\n}"

        renamed = _called_piece(said)

        self.assertIn("class Piece {", renamed)
        self.assertNotIn("DustMote", renamed)

    def test_renames_every_mention_not_just_the_declaration(self) -> None:
        said = "class DustMote {\n  copy() { return new DustMote(); }\n}"

        self.assertEqual(_called_piece(said).count("Piece"), 2)

    def test_refuses_to_guess_between_several_classes(self) -> None:
        # With helpers around there is no telling which one is the piece, and
        # renaming the wrong one produces something that runs and draws nothing.
        said = "class Mote { }\nclass Field { }"

        with self.assertRaises(ValueError):
            _called_piece(said)

    def test_a_helper_beside_a_real_piece_is_fine(self) -> None:
        said = "class Mote { }\nclass Piece { draw(ctx, frame) { } }"

        self.assertEqual(_called_piece(said), said)


class TypeScriptTest(unittest.TestCase):
    """Detected exactly, because every marker is a parse error in a browser."""

    def test_spots_the_answer_it_really_gave(self) -> None:
        self.assertTrue(_typescript_in(TYPED))

    def test_passes_plain_javascript(self) -> None:
        self.assertFalse(_typescript_in(GOOD))

    def test_does_not_mistake_a_ternary_for_a_return_type(self) -> None:
        # `) : void` matched before the brace was required, and a pointless
        # second pass on the big model costs minutes.
        self.assertFalse(_typescript_in("const x = ready ? (a) : void 0;"))

    def test_does_not_mistake_optional_chaining_for_an_optional_method(self) -> None:
        self.assertFalse(_typescript_in("this.sink?.(frame.t);"))


class Tokenizer:
    """Enough of a tokenizer to carry a conversation and hand back tensors."""

    eos_token_id = 0

    def __init__(self) -> None:
        self.asked: list[list[dict[str, str]]] = []

    def apply_chat_template(self, said, tokenize=False, add_generation_prompt=True):
        self.asked.append([dict(turn) for turn in said])
        return "\n".join(turn["content"] for turn in said)

    def __call__(self, prompts, return_tensors="pt"):
        return Batch(torch.zeros((1, 3), dtype=torch.long))

    def decode(self, tokens, skip_special_tokens=True):
        return self.saying


class Batch(dict):
    """What a tokenizer hands a model: a mapping that also has `.to()`."""

    def __init__(self, input_ids) -> None:
        super().__init__(input_ids=input_ids)
        self.input_ids = input_ids

    def to(self, _device):
        return self


class Model:
    device = "cpu"

    def generate(self, **_kwargs):
        return torch.zeros((1, 6), dtype=torch.long)


class Registry:
    def __init__(self, built) -> None:
        self.built = built

    def get(self, _spec):
        return self.built


class WriteSketchTest(unittest.TestCase):
    def setUp(self) -> None:
        self.tokenizer = Tokenizer()
        self.registry = Registry((self.tokenizer, Model()))

    def say(self, *answers: str) -> None:
        """What the model says, in order. The last answer repeats."""
        remaining = list(answers)

        def decode(tokens, skip_special_tokens=True):
            return remaining.pop(0) if len(remaining) > 1 else remaining[0]

        self.tokenizer.decode = decode

    def test_takes_good_javascript_first_time(self) -> None:
        self.say(GOOD)

        self.assertEqual(write_sketch(self.registry, "dust"), GOOD)
        self.assertEqual(len(self.tokenizer.asked), 1, "asked twice for an answer that was fine")

    def test_asks_again_when_it_answers_in_typescript(self) -> None:
        self.say(TYPED, GOOD)

        self.assertEqual(write_sketch(self.registry, "dust"), GOOD)

        second = self.tokenizer.asked[1]
        self.assertEqual(second[-1]["content"], SHARPER)
        self.assertIn("implements", second[-2]["content"], "did not show it what it wrote")

    def test_gives_up_after_the_second_try_rather_than_looping(self) -> None:
        self.say(TYPED)

        with self.assertRaises(ValueError) as refused:
            write_sketch(self.registry, "dust")

        self.assertIn("TypeScript", str(refused.exception))
        self.assertEqual(len(self.tokenizer.asked), 2)

    def test_says_what_to_do_about_it_depending_on_the_model(self) -> None:
        self.say(TYPED)

        with self.assertRaises(ValueError) as small:
            write_sketch(self.registry, "dust", small=True)
        with self.assertRaises(ValueError) as big:
            write_sketch(self.registry, "dust", small=False)

        self.assertIn("small model off", str(small.exception))
        self.assertIn("simpler sentence", str(big.exception))


if __name__ == "__main__":
    unittest.main()
