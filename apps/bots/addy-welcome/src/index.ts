import { Events, SlashCommandBuilder } from "discord.js";
import { runBot } from "../../_core/src/framework.js";

const welcomeChannel = new Map<string, string>();

runBot({
  botKey: "addy-welcome",
  token: process.env.ADDY_WELCOME_TOKEN ?? "",
  clientId: process.env.ADDY_WELCOME_CLIENT_ID ?? "",
  commands: [{ data: new SlashCommandBuilder().setName("welcome-channel").setDescription("Set welcome channel").addChannelOption(o=>o.setName("channel").setDescription("target").setRequired(true)), execute: async ({ interaction }) => { const channel = interaction.options.getChannel("channel", true); welcomeChannel.set(interaction.guildId!, channel.id); await interaction.reply(`Welcome channel set to <#${channel.id}>`);} }],
  onReady: async (client) => {
    client.on(Events.GuildMemberAdd, async (member) => {
      const id = welcomeChannel.get(member.guild.id);
      if (!id) return;
      const channel = member.guild.channels.cache.get(id);
      if (channel?.isTextBased()) await channel.send(`👋 Welcome ${member} to ${member.guild.name}`);
    });
  }
});
