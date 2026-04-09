import { PrismaClient, BotStatus, PlanType } from "@prisma/client";
import { ADDY_BOTS } from "../packages/shared/src/constants.js";

const prisma = new PrismaClient();

const toBotStatus = (status: string): BotStatus => {
  switch (status.toLowerCase()) {
    case "beta":
      return BotStatus.BETA;
    case "maintenance":
      return BotStatus.MAINTENANCE;
    case "paused":
      return BotStatus.PAUSED;
    default:
      return BotStatus.LIVE;
  }
};

async function main() {
  for (const bot of ADDY_BOTS) {
    const inviteUrl = `https://discord.com/oauth2/authorize?client_id=${bot.clientId}&scope=bot%20applications.commands&permissions=8`;

    await prisma.botConfig.upsert({
      where: { key: bot.key },
      update: {
        name: bot.name,
        description: bot.description,
        status: toBotStatus(bot.status),
        category: bot.category,
        inviteUrl,
        featureList: bot.freeFeatures,
        premiumFeatures: bot.premiumFeatures,
        dashboardRoute: bot.slug,
        slug: bot.slug
      },
      create: {
        key: bot.key,
        name: bot.name,
        slug: bot.slug,
        description: bot.description,
        category: bot.category,
        inviteUrl,
        clientId: bot.clientId,
        tokenSecret: `${bot.key.toUpperCase().replace(/-/g, "_")}_TOKEN`,
        status: toBotStatus(bot.status),
        planType: PlanType.FREEMIUM,
        monthlyPrice: 9,
        yearlyPrice: 90,
        lifetimePrice: 199,
        featureList: bot.freeFeatures,
        premiumFeatures: bot.premiumFeatures,
        dashboardRoute: bot.slug,
        showOnWebsite: true,
        showOnDashboard: true,
        disabled: false
      }
    });
  }
}

main()
  .then(async () => {
    await prisma.$disconnect();
  })
  .catch(async (error) => {
    console.error(error);
    await prisma.$disconnect();
    process.exit(1);
  });
