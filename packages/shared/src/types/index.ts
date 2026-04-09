import type { AddyBotKey } from "../constants/bots";

export interface BotPublicProfile {
  key: AddyBotKey;
  name: string;
  description: string;
  inviteUrl: string;
  freeFeatures: string[];
  premiumFeatures: string[];
}

export interface GuildFeatureState {
  guildId: string;
  botKey: AddyBotKey;
  plan: string;
  trialActive: boolean;
  premiumActive: boolean;
  featureFlags: Record<string, boolean>;
}
