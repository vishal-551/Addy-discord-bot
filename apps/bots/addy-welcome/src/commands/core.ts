import { SlashCommandBuilder } from "discord.js";
import type { BotCommand } from "@addy/bot-core";

export const coreCommand: BotCommand = {
  data: new SlashCommandBuilder().setName("setupwelcome").setDescription("Configures welcome channel and message."),
  execute: async (interaction) => {
    await interaction.reply({ content: "Addy Welcome: Configures welcome channel and message.", ephemeral: true });
  }
};
