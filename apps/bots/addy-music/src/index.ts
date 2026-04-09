import { SlashCommandBuilder } from "discord.js";
import { runBot } from "../../_core/src/framework.js";

const queue = new Map<string, string[]>();

runBot({
  botKey: "addy-music",
  token: process.env.ADDY_MUSIC_TOKEN ?? "",
  clientId: process.env.ADDY_MUSIC_CLIENT_ID ?? "",
  commands: [
    { data: new SlashCommandBuilder().setName("play").setDescription("Queue a song URL").addStringOption(o=>o.setName("query").setDescription("url or query").setRequired(true)), execute: async ({ interaction }) => { const q = interaction.options.getString("query", true); const key = interaction.guildId!; queue.set(key, [...(queue.get(key) ?? []), q]); await interaction.reply(`🎵 Queued: ${q}`); } },
    { data: new SlashCommandBuilder().setName("queue").setDescription("Show queue"), execute: async ({ interaction }) => { const items = queue.get(interaction.guildId!) ?? []; await interaction.reply(items.length ? items.map((s,i)=>`${i+1}. ${s}`).join("\n") : "Queue is empty"); } },
    { data: new SlashCommandBuilder().setName("skip").setDescription("Skip current song"), execute: async ({ interaction }) => { const items = queue.get(interaction.guildId!) ?? []; items.shift(); queue.set(interaction.guildId!, items); await interaction.reply("⏭️ Skipped"); } }
  ]
});
