import { SlashCommandBuilder } from "discord.js";
import type { BotCommand } from "@addy/bot-core";

export const coreCommand: BotCommand = {
  data: new SlashCommandBuilder().setName("rank").setDescription("Shows rank and XP progress."),
  execute: async (interaction) => {
    await interaction.reply({ content: "Addy Level: Shows rank and XP progress.", ephemeral: true });
  }
};
