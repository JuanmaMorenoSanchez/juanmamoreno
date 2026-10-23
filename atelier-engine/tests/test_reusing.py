"""
Taking a step from the step before it.

Every other thing measured in `PERFORMANCE.md` is about getting twelve
gigabytes to the card faster. This is the one that does not fetch them: the
first of the sixty blocks is run, what it changed is compared with what it
changed last step, and if the difference is under the threshold the other
fifty-nine are skipped — and a skipped block's offload hook never fires, so it
never crosses the bus at all.

The pipeline is built once and kept, so what is tested here is the switching:
a run that asks for it gets it, a run that does not is left exact, and asking
twice in a row does not stack two caches on one model.
"""

import unittest

from engine.edit import _reusing


class Pretend:
    """A transformer that writes down what was done to it."""

    def __init__(self) -> None:
        self._cache_config = None
        self.enabled: list[float] = []
        self.disabled = 0

    def enable_cache(self, config) -> None:
        self._cache_config = config
        self.enabled.append(config.threshold)

    def disable_cache(self) -> None:
        self._cache_config = None
        self.disabled += 1


class ReusingTest(unittest.TestCase):
    def setUp(self) -> None:
        self.transformer = Pretend()

    def test_zero_leaves_it_exact(self) -> None:
        _reusing(self.transformer, 0.0)

        self.assertEqual(self.transformer.enabled, [])
        self.assertIsNone(self.transformer._cache_config)

    def test_a_threshold_turns_it_on_at_that_threshold(self) -> None:
        _reusing(self.transformer, 0.08)

        self.assertEqual(self.transformer.enabled, [0.08])

    def test_asking_twice_does_not_stack_two_caches(self) -> None:
        # diffusers refuses a second hook of the same name, so a pipeline kept
        # between runs has to have the old one taken off first.
        _reusing(self.transformer, 0.08)
        _reusing(self.transformer, 0.12)

        self.assertEqual(self.transformer.enabled, [0.08, 0.12])
        self.assertEqual(self.transformer.disabled, 1)

    def test_going_back_to_zero_takes_it_off_again(self) -> None:
        # The run he keeps is the exact one, and it follows the ones he was
        # looking through on the same pipeline.
        _reusing(self.transformer, 0.12)
        _reusing(self.transformer, 0.0)

        self.assertIsNone(self.transformer._cache_config)
        self.assertEqual(self.transformer.disabled, 1)

    def test_nothing_is_taken_off_when_nothing_was_on(self) -> None:
        # Otherwise every exact run logs a warning about disabling a cache
        # that was never enabled.
        _reusing(self.transformer, 0.0)

        self.assertEqual(self.transformer.disabled, 0)


if __name__ == "__main__":
    unittest.main()
