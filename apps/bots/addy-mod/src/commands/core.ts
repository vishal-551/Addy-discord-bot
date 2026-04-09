import { SlashCommandBuilder } from "discord.js";
import type { BotCommand } from "@addy/bot-core";

export const coreCommand: BotCommand = {
  data: new SlashCommandBuilder().setName("warn").setDescription("Issues a warning and logs a moderation case."),
  execute: async (interaction) => {
    await interaction.reply({ content: "Addy Mod: Issues a warning and logs a moderation case.", ephemeral: true });
  }
};
