import { PlanTier } from "./types.js";

const tierOrder: PlanTier[] = ["free", "addy_basic", "addy_pro", "addy_premium", "addy_ultimate", "enterprise"];

export const hasPlanAccess = (current: PlanTier, required: PlanTier) => tierOrder.indexOf(current) >= tierOrder.indexOf(required);

export const resolveFeature = (
  feature: string,
  freeFeatures: string[],
  premiumFeatures: string[],
  plan: PlanTier
): boolean => {
  if (freeFeatures.includes(feature)) return true;
  if (premiumFeatures.includes(feature)) return hasPlanAccess(plan, "addy_basic");
  return false;
};
