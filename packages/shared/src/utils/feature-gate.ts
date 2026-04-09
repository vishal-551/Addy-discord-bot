import type { PremiumTier } from "../pricing/plans";
import { defaultPlanMatrix } from "../pricing/plans";

const tierOrder: PremiumTier[] = ["FREE", "ADDY_BASIC", "ADDY_PRO", "ADDY_PREMIUM", "ADDY_ULTIMATE", "ENTERPRISE"];

export const hasFeatureAccess = (tier: PremiumTier, feature: string): boolean => {
  const eligibleTiers = tierOrder.slice(0, tierOrder.indexOf(tier) + 1);
  return eligibleTiers.some((currentTier) => defaultPlanMatrix[currentTier].includes(feature));
};
