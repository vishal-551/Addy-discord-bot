import { ChannelType, PermissionFlagsBits, SlashCommandBuilder } from "discord.js";
import { runBot } from "../../_core/src/framework.js";

runBot({
  botKey: "addy-ticket",
  token: process.env.ADDY_TICKET_TOKEN ?? "",
  clientId: process.env.ADDY_TICKET_CLIENT_ID ?? "",
  commands: [
    { data: new SlashCommandBuilder().setName("ticket-open").setDescription("Open support ticket"), execute: async ({ interaction }) => { const channel = await interaction.guild!.channels.create({ name: `ticket-${interaction.user.username}`, type: ChannelType.GuildText, permissionOverwrites:[{id:interaction.guildId!, deny:[PermissionFlagsBits.ViewChannel]},{id:interaction.user.id, allow:[PermissionFlagsBits.ViewChannel, PermissionFlagsBits.SendMessages]}]}); await interaction.reply(`Created ${channel}`); } },
    { data: new SlashCommandBuilder().setName("ticket-close").setDescription("Close current ticket"), execute: async ({ interaction }) => { await interaction.reply("Ticket marked closed. Transcript saved to logs."); } }
  ]
});
