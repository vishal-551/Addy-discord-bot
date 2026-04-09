import { startBot } from "@addy/bot-core";
import { coreCommands } from "./commands/core.js";
import { config } from "./config.js";
import { onReadyNote } from "./events/ready.js";

void startBot({
  key: config.key,
  displayName: config.displayName,
  token: config.token,
  clientId: config.clientId,
  guildId: process.env.ADDY_DEV_GUILD_ID,
  commands: coreCommands
}).then(() => {
  console.log(onReadyNote);
});
