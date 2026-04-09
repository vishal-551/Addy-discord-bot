import { SlashCommandBuilder } from "discord.js";
import { runBot } from "../../_core/src/framework.js";

const subscriptions = new Map<string, string[]>();

runBot({
  botKey: "addy-notify",
  token: process.env.ADDY_NOTIFY_TOKEN ?? "",
  clientId: process.env.ADDY_NOTIFY_CLIENT_ID ?? "",
  commands: [
    { data: new SlashCommandBuilder().setName("youtube-add").setDescription("Track YouTube channel").addStringOption(o=>o.setName("channel").setDescription("Channel handle").setRequired(true)), execute: async ({ interaction }) => { const handle = interaction.options.getString("channel", true); const key = interaction.guildId!; subscriptions.set(key, [...(subscriptions.get(key) ?? []), handle]); await interaction.reply(`📺 Tracking ${handle}`);} },
    { data: new SlashCommandBuilder().setName("youtube-list").setDescription("List tracked creators"), execute: async ({ interaction }) => { const items = subscriptions.get(interaction.guildId!) ?? []; await interaction.reply(items.length ? items.join(", ") : "No creators tracked yet"); } }
  ]
});
