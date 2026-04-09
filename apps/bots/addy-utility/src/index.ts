import { SlashCommandBuilder } from "discord.js";
import { runBot } from "../../_core/src/framework.js";

const afk = new Map<string, string>();

runBot({
  botKey: "addy-utility",
  token: process.env.ADDY_UTILITY_TOKEN ?? "",
  clientId: process.env.ADDY_UTILITY_CLIENT_ID ?? "",
  commands: [
    { data: new SlashCommandBuilder().setName("remind").setDescription("Create reminder").addStringOption(o=>o.setName("text").setDescription("reminder").setRequired(true)), execute: async ({ interaction }) => interaction.reply(`⏰ Reminder saved: ${interaction.options.getString("text", true)}`) },
    { data: new SlashCommandBuilder().setName("afk").setDescription("Set AFK status").addStringOption(o=>o.setName("reason").setDescription("reason").setRequired(true)), execute: async ({ interaction }) => { afk.set(`${interaction.guildId}:${interaction.user.id}`, interaction.options.getString("reason", true)); await interaction.reply("AFK status enabled."); } }
  ],
  onMessage: async (_c, message) => {
    if (message.author.bot || !message.guildId) return;
    for (const user of message.mentions.users.values()) {
      const reason = afk.get(`${message.guildId}:${user.id}`);
      if (reason) await message.reply(`${user.username} is AFK: ${reason}`);
    }
  }
});
