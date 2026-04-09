export const config = {
  key: "addy-utility",
  displayName: "Addy Utility",
  clientId: process.env.ADDY_UTILITY_CLIENT_ID ?? "",
  token: process.env.ADDY_UTILITY_TOKEN ?? "",
  requiredPlan: "free",
  dashboardRoute: "utility"
};
