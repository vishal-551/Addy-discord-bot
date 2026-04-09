import { hasFeatureAccess } from "@addy/shared";
import { prisma } from "../lib/prisma.js";

export const resolveGuildPlan = async (guildId: string, botKey: string): Promise<string> => {
  const latestSubscription = await prisma.subscription.findFirst({
    where: {
      guildId,
      OR: [
        { botConfigId: null },
        {
          botConfig: { key: botKey }
        }
      ]
    },
    orderBy: { startedAt: "desc" }
  });

  if (!latestSubscription) {
    return "FREE";
  }

  if (latestSubscription.expiresAt && latestSubscription.expiresAt < new Date()) {
    return "FREE";
  }

  return latestSubscription.planCode;
};

export const canUseFeature = async (guildId: string, botKey: string, feature: string): Promise<boolean> => {
  const plan = await resolveGuildPlan(guildId, botKey);
  return hasFeatureAccess(plan as never, feature);
};
