export const config = {
  key: "addy-main",
  displayName: "Addy Main",
  clientId: process.env.ADDY_MAIN_CLIENT_ID ?? "",
  token: process.env.ADDY_MAIN_TOKEN ?? "",
  requiredPlan: "free",
  dashboardRoute: "suite"
};
