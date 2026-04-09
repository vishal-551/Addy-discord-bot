export const config = {
  key: "addy-ai",
  displayName: "Addy AI",
  clientId: process.env.ADDY_AI_CLIENT_ID ?? "",
  token: process.env.ADDY_AI_TOKEN ?? "",
  requiredPlan: "free",
  dashboardRoute: "ai"
};
