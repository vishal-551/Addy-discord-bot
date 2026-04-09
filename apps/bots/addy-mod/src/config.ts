export const config = {
  key: "addy-mod",
  displayName: "Addy Mod",
  clientId: process.env.ADDY_MOD_CLIENT_ID ?? "",
  token: process.env.ADDY_MOD_TOKEN ?? "",
  requiredPlan: "free",
  dashboardRoute: "mod"
};
