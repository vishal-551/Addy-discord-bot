from shared.config import settings
from shared.logger import get_logger

logger = get_logger("bot")


def main() -> None:
    if not settings.discord_token:
        logger.warning("DISCORD_TOKEN is not set. Bot startup skipped.")
        return

    logger.info("Bot runtime placeholder started. Wire discord.py client in bot/core/client.py")
