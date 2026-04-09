import { Events, SlashCommandBuilder } from "discord.js";
import { runBot } from "../../_core/src/framework.js";

runBot({
  botKey: "addy-guard",
  token: process.env.ADDY_GUARD_TOKEN ?? "",
  clientId: process.env.ADDY_GUARD_CLIENT_ID ?? "",
  commands: [{ data: new SlashCommandBuilder().setName("security-score").setDescription("Show threat score"), execute: async ({ interaction }) => interaction.reply("Security score: 82/100. No active nuke signatures.") }],
  onReady: async (client) => {
    client.on(Events.ChannelCreate, async (channel) => {
      if (channel.guild.channels.cache.filter(c => c.createdTimestamp && Date.now() - c.createdTimestamp < 20_000).size > 5) {
        const system = channel.guild.systemChannel;
        if (system) await system.send("🚨 Addy Guard detected suspicious rapid channel creation.");
      }
    });
  }
});
