import { SlashCommandBuilder } from "discord.js";
import type { BotCommand } from "@addy/bot-core";

export const coreCommand: BotCommand = {
  data: new SlashCommandBuilder().setName("link").setDescription("Links this guild with Addy dashboard and suite controls."),
  execute: async (interaction) => {
    await interaction.reply({ content: "Addy Main: Links this guild with Addy dashboard and suite controls.", ephemeral: true });
  }
};
