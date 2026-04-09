export const premiumTiers = [
  "FREE",
  "ADDY_BASIC",
  "ADDY_PRO",
  "ADDY_PREMIUM",
  "ADDY_ULTIMATE",
  "ENTERPRISE"
] as const;

export type PremiumTier = (typeof premiumTiers)[number];

export const defaultPlanMatrix: Record<PremiumTier, string[]> = {
  FREE: ["basic.commands", "standard.support"],
  ADDY_BASIC: ["basic.commands", "dashboard.access", "email.support"],
  ADDY_PRO: ["advanced.automod", "youtube.notify", "ticketing"],
  ADDY_PREMIUM: ["hq.audio", "ai.suggestions", "security.analytics"],
  ADDY_ULTIMATE: ["full.suite", "priority.support", "whiteglove.setup"],
  ENTERPRISE: ["custom.sla", "custom.features", "dedicated.manager"]
};
