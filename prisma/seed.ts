import { PrismaClient } from "@prisma/client";
import { ADDY_BOTS } from "../packages/shared/src/constants.js";

const prisma = new PrismaClient();

async function main() {
  for (const bot of ADDY_BOTS) {
    await prisma.botConfig.upsert({
      where: { key: bot.key },
      update: {
        displayName: bot.name,
        description: bot.description,
        status: bot.status,
        category: bot.category,
        freeFeaturesJson: JSON.stringify(bot.freeFeatures),
        premiumFeaturesJson: JSON.stringify(bot.premiumFeatures)
      },
      create: {
        key: bot.key,
        displayName: bot.name,
        slug: bot.slug,
        description: bot.description,
        category: bot.category,
        clientId: "",
        tokenSecret: "",
        inviteUrl: `https://discord.com/oauth2/authorize?client_id=${bot.clientId}&scope=bot%20applications.commands&permissions=8`,
        status: bot.status,
        planType: "freemium",
        monthlyPrice: 9,
        yearlyPrice: 90,
        lifetimePrice: 199,
        freeFeaturesJson: JSON.stringify(bot.freeFeatures),
        premiumFeaturesJson: JSON.stringify(bot.premiumFeatures),
        dashboardRouteKey: bot.slug
      }
    });
  }
}

main().finally(() => prisma.$disconnect());
