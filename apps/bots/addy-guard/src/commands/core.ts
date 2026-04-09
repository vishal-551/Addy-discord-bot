import { SlashCommandBuilder } from "discord.js";
import type { BotCommand } from "@addy/bot-core";

export const coreCommand: BotCommand = {
  data: new SlashCommandBuilder().setName("security").setDescription("Shows security score and risk summary."),
  execute: async (interaction) => {
    await interaction.reply({ content: "Addy Guard: Shows security score and risk summary.", ephemeral: true });
  }
};
