from pathlib import Path


def discover_cogs() -> list[str]:
    cogs_dir = Path(__file__).parent / "cogs"
    return [str(path.relative_to(Path(__file__).parent)).replace("/", ".")[:-3] for path in cogs_dir.rglob("*.py") if path.name != "__init__.py"]
