import type { PlanTier } from "./types.js";

export const PLAN_PRICING: Record<PlanTier, { monthlyUsd: number; yearlyUsd: number; seats: number }> = {
  free: { monthlyUsd: 0, yearlyUsd: 0, seats: 1 },
  addy_basic: { monthlyUsd: 9, yearlyUsd: 90, seats: 2 },
  addy_pro: { monthlyUsd: 19, yearlyUsd: 190, seats: 5 },
  addy_premium: { monthlyUsd: 39, yearlyUsd: 390, seats: 10 },
  addy_ultimate: { monthlyUsd: 79, yearlyUsd: 790, seats: 50 },
  enterprise: { monthlyUsd: 199, yearlyUsd: 1990, seats: 500 }
};

export const BOT_ADDON_PRICING_USD: Record<string, { monthly: number; yearly: number; lifetime: number }> = {
  "addy-mod": { monthly: 8, yearly: 80, lifetime: 299 },
  "addy-music": { monthly: 8, yearly: 80, lifetime: 299 },
  "addy-notify": { monthly: 7, yearly: 70, lifetime: 249 },
  "addy-suite": { monthly: 29, yearly: 290, lifetime: 999 }
};
