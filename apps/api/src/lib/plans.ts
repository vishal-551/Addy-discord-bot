import { type PlanTier, resolveFeature } from "@addy/shared";

export const canUseFeature = (
  plan: PlanTier,
  feature: string,
  freeFeatures: string[],
  premiumFeatures: string[]
): boolean => resolveFeature(feature, freeFeatures, premiumFeatures, plan);
