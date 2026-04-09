export const config = {
  key: "addy-notify",
  displayName: "Addy Notify",
  clientId: process.env.ADDY_NOTIFY_CLIENT_ID ?? "",
  token: process.env.ADDY_NOTIFY_TOKEN ?? "",
  requiredPlan: "free",
  dashboardRoute: "notify"
};
