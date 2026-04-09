export type PlanTier = "free" | "addy_basic" | "addy_pro" | "addy_premium" | "addy_ultimate" | "enterprise";

export type BotStatus = "live" | "beta" | "maintenance" | "paused";

export type PaymentMethod = "stripe" | "razorpay" | "paypal" | "upi" | "manual";

export interface BotDefinition {
  key: string;
  name: string;
  slug: string;
  description: string;
  clientId: string;
  status: BotStatus;
  category: string;
  freeFeatures: string[];
  premiumFeatures: string[];
}

export interface GuildFeatureGate {
  guildId: string;
  botKey: string;
  plan: PlanTier;
  features: Record<string, boolean>;
}
