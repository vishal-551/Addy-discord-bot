export const config = {
  key: "addy-music",
  displayName: "Addy Music",
  clientId: process.env.ADDY_MUSIC_CLIENT_ID ?? "",
  token: process.env.ADDY_MUSIC_TOKEN ?? "",
  requiredPlan: "free",
  dashboardRoute: "music"
};
