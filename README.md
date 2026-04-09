# Addy Platform Monorepo

Production-oriented monorepo for the **Addy** multi-bot Discord SaaS ecosystem.

## Apps
- `apps/website`: public premium static-style marketing app and docs.
- `apps/dashboard`: user dashboard for guild-level bot management.
- `apps/admin`: owner super admin panel (pricing, bots, payments, grants, secrets).
- `apps/api`: Express + Prisma API for auth, guild mapping, bots, billing, and admin operations.
- `apps/bots/*`: 10 separate Addy Discord bot services, each with slash commands, config loading, and runtime.
- `apps/bot-runner`: helper launcher for specific Addy bots.

## Shared package
- `packages/shared`: cross-app constants, bot catalog, tier pricing, and feature gating helpers.

## Database
- Prisma schema includes users, sessions, guilds, installs, subscriptions, payments, coupons, pricing rules, audit logs,
  analytics snapshots, and all requested settings models.

## Quickstart
1. `cp .env.example .env`
2. `pnpm install`
3. `pnpm db:generate`
4. `pnpm db:migrate --name init`
5. `pnpm db:seed`
6. `pnpm dev`

Run a single service:
- API: `pnpm --filter @addy/api dev`
- Website: `pnpm --filter @addy/website dev`
- Dashboard: `pnpm --filter @addy/dashboard dev`
- Admin: `pnpm --filter @addy/admin dev`
- Individual bot: `pnpm --filter @addy/addy-mod dev`
- Via runner: `pnpm --filter @addy/bot-runner dev addy-mod`

## Billing model
- Global tiers: Free, Addy Basic, Addy Pro, Addy Premium, Addy Ultimate, Enterprise.
- Per-bot addon and suite pricing from `@addy/shared`.
- Manual checkout endpoint supports Stripe/Razorpay/PayPal/UPI/manual workflows via payment method field and admin verification.

## Secret key management
- `BotConfig` table stores per-bot client ID/token/invite/status/plan and visibility fields.
- Admin UI includes dedicated secret-management section.
