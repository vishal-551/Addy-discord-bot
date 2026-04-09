import { BotDefinition } from "./types.js";

export const ADDY_BOTS: BotDefinition[] = [
  { key: "addy-main", name: "Addy Main", slug: "main", description: "Core suite orchestration, onboarding, and bundle logic.", clientId: "", status: "live", category: "core", freeFeatures: ["link-dashboard", "basic-health"], premiumFeatures: ["bundle-automation", "cross-bot-insights"] },
  { key: "addy-mod", name: "Addy Mod", slug: "mod", description: "Advanced moderation with automod intelligence.", clientId: "", status: "live", category: "moderation", freeFeatures: ["kick", "ban", "warn"], premiumFeatures: ["ai-automod", "appeal-workflows"] },
  { key: "addy-music", name: "Addy Music", slug: "music", description: "Modern music and queue control.", clientId: "", status: "beta", category: "music", freeFeatures: ["play", "pause", "queue"], premiumFeatures: ["hq-audio", "dj-mode", "smart-autoplay"] },
  { key: "addy-notify", name: "Addy Notify", slug: "notify", description: "Creator and livestream notifications.", clientId: "", status: "live", category: "notifications", freeFeatures: ["youtube-alert"], premiumFeatures: ["fast-sync", "multi-platform"] },
  { key: "addy-welcome", name: "Addy Welcome", slug: "welcome", description: "Welcome, autoroles, and verification.", clientId: "", status: "live", category: "onboarding", freeFeatures: ["welcome-message", "autorole"], premiumFeatures: ["animated-cards", "advanced-verification"] },
  { key: "addy-level", name: "Addy Level", slug: "level", description: "XP and ranking engine.", clientId: "", status: "live", category: "engagement", freeFeatures: ["xp", "leaderboard"], premiumFeatures: ["voice-xp", "premium-rank-cards"] },
  { key: "addy-ticket", name: "Addy Ticket", slug: "ticket", description: "Support ticket lifecycle management.", clientId: "", status: "live", category: "support", freeFeatures: ["ticket-create", "ticket-close"], premiumFeatures: ["advanced-forms", "multi-panel"] },
  { key: "addy-utility", name: "Addy Utility", slug: "utility", description: "Daily server utility toolkit.", clientId: "", status: "live", category: "utility", freeFeatures: ["polls", "reaction-roles"], premiumFeatures: ["backup-restore", "temp-channel-suite"] },
  { key: "addy-guard", name: "Addy Guard", slug: "guard", description: "Security and anti-nuke protection.", clientId: "", status: "beta", category: "security", freeFeatures: ["anti-bot-spam", "join-monitor"], premiumFeatures: ["threat-analytics", "abuse-forensics"] },
  { key: "addy-ai", name: "Addy AI", slug: "ai", description: "AI-powered server assistant.", clientId: "", status: "beta", category: "ai", freeFeatures: ["assistant-lite"], premiumFeatures: ["moderation-suggestions", "setup-copilot"] }
];

export const PREMIUM_TIERS = ["free", "addy_basic", "addy_pro", "addy_premium", "addy_ultimate", "enterprise"] as const;
