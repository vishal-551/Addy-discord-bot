import type { Client } from "discord.js";

export const onReadyNote = "Addy Main runtime initialized with guild mapping and premium gate support.";

export const logReadyContext = (client: Client): void => {
  const guildCount = client.guilds.cache.size;
  console.log(`${onReadyNote} Connected guilds: ${guildCount}`);
};
