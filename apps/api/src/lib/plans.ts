import { resolveFeature } from "@addy/shared";

export const canUseFeature = (plan: string, feature: string, freeFeatures: string[], premiumFeatures: string[]) =>
  resolveFeature(feature, freeFeatures, premiumFeatures, plan as any);
