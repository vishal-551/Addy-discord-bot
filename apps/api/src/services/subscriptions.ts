import { hasFeatureAccess } from "@addy/shared";
import { prisma } from "../lib/prisma.js";

export const resolveGuildPlan = async (guildId: string, botKey: string): Promise<string> => {
  const sub = await prisma.subscription.findFirst({
    where: { guildId, OR: [{ botConfigId: null }, { botConfigId: botKey }] },
    orderBy: { createdAt: "desc" }
  });

  if (!sub) {
    return "FREE";
  }
  if (sub.expiresAt && sub.expiresAt < new Date()) {
    return "FREE";
  }
  return sub.planCode;
};

export const canUseFeature = async (guildId: string, botKey: string, feature: string): Promise<boolean> => {
  const plan = await resolveGuildPlan(guildId, botKey);
  return hasFeatureAccess(plan as never, feature);
};
