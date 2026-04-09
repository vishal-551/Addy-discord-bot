export const config = {
  key: "addy-ticket",
  displayName: "Addy Ticket",
  clientId: process.env.ADDY_TICKET_CLIENT_ID ?? "",
  token: process.env.ADDY_TICKET_TOKEN ?? "",
  requiredPlan: "free",
  dashboardRoute: "ticket"
};
