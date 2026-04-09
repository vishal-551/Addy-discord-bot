export const config = {
  key: "addy-level",
  displayName: "Addy Level",
  clientId: process.env.ADDY_LEVEL_CLIENT_ID ?? "",
  token: process.env.ADDY_LEVEL_TOKEN ?? "",
  requiredPlan: "free",
  dashboardRoute: "level"
};
