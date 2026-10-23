"""
How much of a twelve-gigabyte model stays on an eight-gigabyte card.

`apply_group_offloading` treats every group alike: onloaded when its turn
comes, dropped the moment it is done, fetched again next step. Sixty blocks,
twelve gigabytes, twice a step, forever — while five gigabytes of the card sit
empty, because keeping anything was never part of the design.

ComfyUI's low-vram path does keep what fits, and the arithmetic is just
`free_vram - minimum_required`. The constant here is theirs, 0.8 GiB plus the
600 MiB they reserve on Windows specifically — their comment — "because of the
shared vram issue", which is the thing measured in `PERFORMANCE.md`: the driver
oversubscribes into system memory rather than refusing, so a card filled to the
brim does not fail, it goes slow.

What is tested is the arithmetic, because an off-by-one here is exactly that
brim-full card and it would show up as a mysterious slowness rather than as an
error.
"""

import unittest

from engine.edit import LEAVE, how_many_fit

GIB = 2**30


class HowManyFitTest(unittest.TestCase):
    def test_nothing_fits_on_a_card_with_no_room_to_work(self) -> None:
        self.assertEqual(how_many_fit([100] * 60, free=LEAVE), 0)

    def test_nothing_fits_when_there_is_less_than_the_reserve(self) -> None:
        self.assertEqual(how_many_fit([100] * 60, free=LEAVE // 2), 0)

    def test_the_reserve_is_never_eaten_into(self) -> None:
        # The whole point. Whatever is kept, this much is left over.
        sizes = [207 * 2**20] * 60
        kept = how_many_fit(sizes, free=7 * GIB)

        self.assertLessEqual(sum(sizes[:kept]), 7 * GIB - LEAVE)

    def test_it_keeps_what_there_is_room_for(self) -> None:
        # Sixty blocks of 207 MiB is this machine's transformer; 7 GiB free
        # less the reserve leaves about 4.5 for weights.
        kept = how_many_fit([207 * 2**20] * 60, free=7 * GIB)

        self.assertGreater(kept, 15)
        self.assertLess(kept, 60)

    def test_a_card_big_enough_keeps_all_of_it(self) -> None:
        self.assertEqual(how_many_fit([207 * 2**20] * 60, free=80 * GIB), 60)

    def test_it_stops_rather_than_skipping_what_does_not_fit(self) -> None:
        # A gap in the middle would be one block fetched between two that were
        # already there. The blocks run in order; the fetching should be
        # contiguous and rare, not interleaved.
        kept = how_many_fit([GIB, 40 * GIB, GIB], free=LEAVE + 10 * GIB)

        self.assertEqual(kept, 1)

    def test_blocks_are_measured_and_not_assumed_equal(self) -> None:
        # The first and last blocks of a transformer rarely weigh what the
        # middle ones do.
        room = LEAVE + 3 * GIB
        self.assertEqual(how_many_fit([GIB, GIB, GIB], free=room), 3)
        self.assertEqual(how_many_fit([2 * GIB, GIB, GIB], free=room), 2)

    def test_no_blocks_at_all_is_not_an_error(self) -> None:
        self.assertEqual(how_many_fit([], free=8 * GIB), 0)

    def test_the_reserve_is_what_comfyui_reserves_plus_the_text_encoder(self) -> None:
        # Theirs is 0.8 GiB + 600 MiB on Windows. The extra 1.1 is lm_head,
        # which is the widest leaf of the text encoder they do not have to
        # carry, and it has to have somewhere to land while a prompt is being
        # encoded.
        self.assertEqual(LEAVE, int(0.8 * GIB) + 600 * 2**20 + int(1.1 * GIB))


if __name__ == "__main__":
    unittest.main()
