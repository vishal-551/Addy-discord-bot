import { hasPlanAccess, PlanTier } from "@addy/shared";

export const checkPremium = (guildPlan: PlanTier, required: PlanTier = "addy_basic") =>
  hasPlanAccess(guildPlan, required);
