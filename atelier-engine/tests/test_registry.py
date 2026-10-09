"""
The rule that makes 8 GB enough: one model resident, the last one dropped first.

Tested with sentinels rather than weights, so it runs in milliseconds and says
something about the policy rather than about torch.
"""

import unittest
from pathlib import Path

from engine.registry import ModelRegistry, ModelSpec


def spec(key: str, built: list[str]) -> ModelSpec:
    """A model that records being built instead of loading anything."""

    def build(repo: str, cache_dir: Path, device: str):
        built.append(key)
        return (f"{key}-processor", f"{key}-model")

    return ModelSpec(key=key, repo=f"fake/{key}", licence="Apache-2.0", build=build)


class RegistryTest(unittest.TestCase):
    def setUp(self) -> None:
        self.built: list[str] = []
        self.registry = ModelRegistry(cache_dir=Path("."), device="cpu")

    def test_nothing_is_resident_to_begin_with(self) -> None:
        self.assertIsNone(self.registry.resident)

    def test_loads_on_demand(self) -> None:
        processor, model = self.registry.get(spec("dino", self.built))

        self.assertEqual(self.built, ["dino"])
        self.assertEqual(self.registry.resident, "dino")
        self.assertEqual((processor, model), ("dino-processor", "dino-model"))

    def test_asking_twice_does_not_load_twice(self) -> None:
        dino = spec("dino", self.built)
        self.registry.get(dino)
        self.registry.get(dino)

        self.assertEqual(self.built, ["dino"], "the second ask should be free")

    def test_a_different_model_evicts_the_first(self) -> None:
        # The whole point. Both resident at once is 900 MB here and would be
        # gigabytes the moment a third is added.
        self.registry.get(spec("dino", self.built))
        self.registry.get(spec("sam", self.built))

        self.assertEqual(self.built, ["dino", "sam"])
        self.assertEqual(self.registry.resident, "sam")

    def test_going_back_reloads(self) -> None:
        dino = spec("dino", self.built)
        self.registry.get(dino)
        self.registry.get(spec("sam", self.built))
        self.registry.get(dino)

        self.assertEqual(self.built, ["dino", "sam", "dino"])

    def test_evicting_leaves_nothing_resident(self) -> None:
        self.registry.get(spec("dino", self.built))
        self.registry.evict()

        self.assertIsNone(self.registry.resident)

    def test_evicting_nothing_is_not_an_error(self) -> None:
        # Called on shutdown and between runs, when there may be nothing there.
        self.registry.evict()
        self.registry.evict()

        self.assertIsNone(self.registry.resident)


if __name__ == "__main__":
    unittest.main()
