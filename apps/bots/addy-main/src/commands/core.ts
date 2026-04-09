import { SlashCommandBuilder, type ChatInputCommandInteraction } from "discord.js";
import type { BotCommand } from "@addy/bot-core";
import { checkPremium } from "../premium.js";

const replyEphemeral = (interaction: ChatInputCommandInteraction, content: string) =>
  interaction.reply({ content, ephemeral: true });

export const coreCommands: BotCommand[] = [
  {
    data: new SlashCommandBuilder()
      .setName("link")
      .setDescription("Link this guild to the Addy dashboard for setup and billing."),
    execute: async (interaction) => {
      const guildId = interaction.guildId ?? "unknown";
      const dashboardUrl = `https://dashboard.addy.gg/servers/${guildId}`;
      await replyEphemeral(interaction, `Server link initialized. Continue setup in: ${dashboardUrl}`);
    }
  },
  {
    data: new SlashCommandBuilder().setName("ping").setDescription("Check bot latency and API connectivity."),
    execute: async (interaction) => {
      const wsPing = interaction.client.ws.ping;
      await replyEphemeral(interaction, `🏓 Pong! Gateway latency: ${wsPing}ms`);
    }
  },
  {
    data: new SlashCommandBuilder()
      .setName("premium-status")
      .setDescription("Check whether this server has premium access for Addy Main."),
    execute: async (interaction) => {
      const guildPlan = "free" as const;
      const premiumEnabled = checkPremium(guildPlan, "addy_basic");
      await replyEphemeral(
        interaction,
        premiumEnabled
          ? "✅ Premium access is active for Addy Main."
          : "ℹ️ This server is currently on the Free plan for Addy Main."
      );
    }
  }
];
