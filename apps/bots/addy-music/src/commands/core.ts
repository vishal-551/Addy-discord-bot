import { SlashCommandBuilder } from "discord.js";
import type { BotCommand } from "@addy/bot-core";

export const coreCommand: BotCommand = {
  data: new SlashCommandBuilder().setName("play").setDescription("Queues a track from query or URL."),
  execute: async (interaction) => {
    await interaction.reply({ content: "Addy Music: Queues a track from query or URL.", ephemeral: true });
  }
};
