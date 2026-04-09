import { SlashCommandBuilder } from "discord.js";
import type { BotCommand } from "@addy/bot-core";

export const coreCommand: BotCommand = {
  data: new SlashCommandBuilder().setName("subscribe").setDescription("Subscribes a creator/channel feed."),
  execute: async (interaction) => {
    await interaction.reply({ content: "Addy Notify: Subscribes a creator/channel feed.", ephemeral: true });
  }
};
