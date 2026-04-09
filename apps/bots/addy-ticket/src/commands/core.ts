import { SlashCommandBuilder } from "discord.js";
import type { BotCommand } from "@addy/bot-core";

export const coreCommand: BotCommand = {
  data: new SlashCommandBuilder().setName("ticketpanel").setDescription("Creates ticket panel in selected channel."),
  execute: async (interaction) => {
    await interaction.reply({ content: "Addy Ticket: Creates ticket panel in selected channel.", ephemeral: true });
  }
};
