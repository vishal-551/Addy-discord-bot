export const config = {
  key: "addy-welcome",
  displayName: "Addy Welcome",
  clientId: process.env.ADDY_WELCOME_CLIENT_ID ?? "",
  token: process.env.ADDY_WELCOME_TOKEN ?? "",
  requiredPlan: "free",
  dashboardRoute: "welcome"
};
