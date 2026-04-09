import { SlashCommandBuilder } from "discord.js";
import { runBot } from "../../_core/src/framework.js";

runBot({
  botKey: "addy-ai",
  token: process.env.ADDY_AI_TOKEN ?? "",
  clientId: process.env.ADDY_AI_CLIENT_ID ?? "",
  commands: [
    { data: new SlashCommandBuilder().setName("ai-suggest").setDescription("AI moderation suggestion").addStringOption(o=>o.setName("message").setDescription("content").setRequired(true)), execute: async ({ interaction }) => { const content = interaction.options.getString("message", true); const score = /scam|phish|nitro/i.test(content) ? "High Risk" : "Low Risk"; await interaction.reply(`AI Suggestion: ${score}. Action: ${score === "High Risk" ? "Delete + warn" : "Allow"}`); } },
    { data: new SlashCommandBuilder().setName("ai-helper").setDescription("Setup assistant"), execute: async ({ interaction }) => interaction.reply("Enable AI automod, set safety level, and connect analytics from dashboard > AI settings.") }
  ]
});
