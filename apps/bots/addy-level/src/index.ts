import { SlashCommandBuilder } from "discord.js";
import { runBot } from "../../_core/src/framework.js";

const xp = new Map<string, number>();

runBot({
  botKey: "addy-level",
  token: process.env.ADDY_LEVEL_TOKEN ?? "",
  clientId: process.env.ADDY_LEVEL_CLIENT_ID ?? "",
  commands: [{ data: new SlashCommandBuilder().setName("rank").setDescription("Show rank").addUserOption(o=>o.setName("user").setDescription("user")), execute: async ({ interaction }) => { const user = interaction.options.getUser("user") ?? interaction.user; const score = xp.get(`${interaction.guildId}:${user.id}`) ?? 0; await interaction.reply(`${user.username} has ${score} XP`);} }],
  onMessage: async (_c, message) => {
    if (message.author.bot || !message.guildId) return;
    const key = `${message.guildId}:${message.author.id}`;
    xp.set(key, (xp.get(key) ?? 0) + 10);
  }
});
