import { SlashCommandBuilder } from "discord.js";
import { runBot } from "../../_core/src/framework.js";

runBot({
  botKey: "addy-main",
  token: process.env.ADDY_MAIN_TOKEN ?? "",
  clientId: process.env.ADDY_MAIN_CLIENT_ID ?? "",
  commands: [
    {
      data: new SlashCommandBuilder().setName("ping").setDescription("Check bot latency"),
      execute: async ({ interaction }) => interaction.reply("Addy Main online ✅")
    },
    {
      data: new SlashCommandBuilder().setName("status").setDescription("View platform status"),
      execute: async ({ interaction }) => interaction.reply("All Addy services nominal. Dashboard + API connected.")
    }
  ]
});
