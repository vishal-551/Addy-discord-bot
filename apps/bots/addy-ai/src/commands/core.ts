import { SlashCommandBuilder } from "discord.js";
import type { BotCommand } from "@addy/bot-core";

export const coreCommand: BotCommand = {
  data: new SlashCommandBuilder().setName("assist").setDescription("Runs AI helper response."),
  execute: async (interaction) => {
    await interaction.reply({ content: "Addy AI: Runs AI helper response.", ephemeral: true });
  }
};
