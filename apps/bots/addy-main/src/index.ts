import { startBot, createLogger } from "@addy/bot-core";
import { coreCommand } from "./commands/core.js";
import { config } from "./config.js";
import { onReadyNote } from "./events/ready.js";

const logger = createLogger(config.key);

if (!config.token || !config.clientId) {
  logger.error("Missing token or client ID. Set environment variables before starting.");
  process.exit(1);
}

logger.info(onReadyNote);
startBot({
  key: config.key,
  displayName: config.displayName,
  token: config.token,
  clientId: config.clientId,
  guildId: process.env.DEV_GUILD_ID,
  commands: [coreCommand]
});
