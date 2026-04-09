import { SlashCommandBuilder } from "discord.js";
import type { BotCommand } from "@addy/bot-core";

export const coreCommand: BotCommand = {
  data: new SlashCommandBuilder().setName("remind").setDescription("Schedules a server reminder."),
  execute: async (interaction) => {
    await interaction.reply({ content: "Addy Utility: Schedules a server reminder.", ephemeral: true });
  }
};
