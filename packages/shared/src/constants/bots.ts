export const addyBots = [
  { key: "addy-main", name: "Addy Main", category: "Core", premium: false },
  { key: "addy-mod", name: "Addy Mod", category: "Moderation", premium: false },
  { key: "addy-music", name: "Addy Music", category: "Music", premium: true },
  { key: "addy-notify", name: "Addy Notify", category: "Notifications", premium: true },
  { key: "addy-welcome", name: "Addy Welcome", category: "Engagement", premium: false },
  { key: "addy-level", name: "Addy Level", category: "Engagement", premium: false },
  { key: "addy-ticket", name: "Addy Ticket", category: "Support", premium: true },
  { key: "addy-utility", name: "Addy Utility", category: "Utility", premium: false },
  { key: "addy-guard", name: "Addy Guard", category: "Security", premium: true },
  { key: "addy-ai", name: "Addy AI", category: "AI", premium: true }
] as const;

export type AddyBotKey = (typeof addyBots)[number]["key"];
