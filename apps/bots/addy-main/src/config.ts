import type { PlanTier } from "@addy/shared";

export const config: {
  key: "addy-main";
  displayName: string;
  clientId: string;
  token: string;
  requiredPlan: PlanTier;
  dashboardRoute: string;
} = {
  key: "addy-main",
  displayName: "Addy Main",
  clientId: process.env.ADDY_MAIN_CLIENT_ID ?? "",
  token: process.env.ADDY_MAIN_TOKEN ?? "",
  requiredPlan: "free",
  dashboardRoute: "suite"
};
