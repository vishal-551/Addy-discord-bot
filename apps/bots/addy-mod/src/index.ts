import { PermissionsBitField, SlashCommandBuilder } from "discord.js";
import { runBot } from "../../_core/src/framework.js";

runBot({
  botKey: "addy-mod",
  token: process.env.ADDY_MOD_TOKEN ?? "",
  clientId: process.env.ADDY_MOD_CLIENT_ID ?? "",
  commands: [
    { data: new SlashCommandBuilder().setName("warn").setDescription("Warn a user").addUserOption(o=>o.setName("user").setDescription("User").setRequired(true)).addStringOption(o=>o.setName("reason").setDescription("Reason").setRequired(true)), execute: async ({ interaction }) => { const user = interaction.options.getUser("user", true); const reason = interaction.options.getString("reason", true); await interaction.reply(`⚠️ Warned ${user.tag}: ${reason}`); } },
    { data: new SlashCommandBuilder().setName("lock").setDescription("Lock current channel"), execute: async ({ interaction }) => { const channel: any = interaction.channel; if (channel?.permissionOverwrites) { await channel.permissionOverwrites.edit(interaction.guildId, { SendMessages: false }); } await interaction.reply("🔒 Channel locked"); } }
  ],
  onMessage: async (_client, message) => {
    if (message.author.bot || !message.guild) return;
    if (message.content.includes("discord.gg/") && !message.member.permissions.has(PermissionsBitField.Flags.ManageGuild)) {
      await message.delete().catch(() => null);
      await message.channel.send("Invite links are blocked by Addy Mod automod.");
    }
  }
});
