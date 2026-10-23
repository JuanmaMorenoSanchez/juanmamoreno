"""
A prompt encoded once per picture, not once per run.

The text encoder is sixteen gigabytes streamed from disk, and it runs twice
per generation — the instruction and the negative prompt. Measured, that is
two hundred and fifty-four seconds between the pipeline being ready and the
first step reporting, and almost every run after the first asks it a question
it has already answered: Draft first and then the same instruction at twenty
steps, or the same instruction at another seed.

What is tested here is the bookkeeping, with a counter standing in for the
twenty-billion-parameter encoder: the same question answered from memory, a
different question not, and a different picture not — because the encoder here
sees the image, so two instructions that read alike are not the same question
if the painting underneath has changed.
"""

import unittest

import torch
from PIL import Image

from engine.edit import _remembering


def flat(shade: int) -> Image.Image:
    return Image.new("RGB", (8, 8), (shade, shade, shade))


class Counting:
    """Stands in for the encoder, and says how often it was asked."""

    def __init__(self) -> None:
        self.asked = 0

    def __call__(self, prompt=None, image=None, **rest):
        self.asked += 1
        return torch.ones(2, 3), torch.ones(2)


class RememberingTest(unittest.TestCase):
    def setUp(self) -> None:
        self.encoder = Counting()
        self.encode = _remembering(self.encoder)

    def test_the_same_question_is_asked_once(self) -> None:
        self.encode(prompt="make it stormy", image=[flat(10)])
        self.encode(prompt="make it stormy", image=[flat(10)])

        self.assertEqual(self.encoder.asked, 1)

    def test_a_picture_is_known_by_its_bytes_and_not_by_being_the_same_object(self) -> None:
        # The page sends a fresh decode of the same file every run, so two
        # pictures that are equal are never the same object.
        self.encode(prompt="make it stormy", image=[flat(10)])
        self.encode(prompt="make it stormy", image=[flat(10)])

        self.assertEqual(self.encoder.asked, 1)

    def test_another_instruction_is_another_question(self) -> None:
        self.encode(prompt="make it stormy", image=[flat(10)])
        self.encode(prompt="make it bright", image=[flat(10)])

        self.assertEqual(self.encoder.asked, 2)

    def test_another_painting_is_another_question(self) -> None:
        self.encode(prompt="make it stormy", image=[flat(10)])
        self.encode(prompt="make it stormy", image=[flat(200)])

        self.assertEqual(self.encoder.asked, 2)

    def test_the_instruction_and_the_negative_prompt_do_not_evict_each_other(self) -> None:
        # Both are asked on every single run, so if keeping one lost the other
        # nothing would ever be remembered at all.
        for _ in range(3):
            self.encode(prompt="make it stormy", image=[flat(10)])
            self.encode(prompt="Cartoonish, Illustration, Comic", image=[flat(10)])

        self.assertEqual(self.encoder.asked, 2)

    def test_what_comes_back_is_a_copy(self) -> None:
        # Otherwise the second run is handed the tensor the first run was free
        # to do what it liked with.
        first, _ = self.encode(prompt="make it stormy", image=[flat(10)])
        first.zero_()
        again, _ = self.encode(prompt="make it stormy", image=[flat(10)])

        self.assertTrue(bool(again.all()))

    def test_it_does_not_grow_without_end(self) -> None:
        for n in range(40):
            self.encode(prompt=f"instruction {n}", image=[flat(10)])

        self.assertEqual(self.encoder.asked, 40)

    def test_a_prompt_with_nothing_padded_has_no_mask_and_that_is_fine(self) -> None:
        # The pipeline drops a mask that is all ones, so `None` is a real
        # answer and not a missing one. Copying it regardless is how this was
        # first written, and it cost two hundred and thirty seconds to find
        # out: the run reached the end of encoding and died of
        # "'NoneType' object has no attribute 'clone'".
        encode = _remembering(lambda prompt=None, image=None, **rest: (torch.ones(2, 3), None))

        embeds, mask = encode(prompt="make it stormy", image=[flat(10)])

        self.assertIsNone(mask)
        self.assertTrue(bool(embeds.all()))

    def test_something_it_cannot_fingerprint_is_still_encoded(self) -> None:
        # Rather than failing: a prompt with no picture at all is what the
        # plain pipeline does, and it is not this function's business to
        # refuse it.
        self.encode(prompt="make it stormy", image=None)

        self.assertEqual(self.encoder.asked, 1)


if __name__ == "__main__":
    unittest.main()
