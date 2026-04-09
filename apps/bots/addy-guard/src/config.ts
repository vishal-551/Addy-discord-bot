export const config = {
  key: "addy-guard",
  displayName: "Addy Guard",
  clientId: process.env.ADDY_GUARD_CLIENT_ID ?? "",
  token: process.env.ADDY_GUARD_TOKEN ?? "",
  requiredPlan: "free",
  dashboardRoute: "guard"
};
