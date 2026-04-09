# Addy Platform Monorepo

Addy is a multi-bot Discord SaaS ecosystem with:
- Premium static marketing website (`apps/website`)
- User dashboard (`apps/dashboard`)
- Super admin control panel (`apps/admin`)
- API backend with auth, guild mapping, payments, and admin controls (`apps/api`)
- Addy bot family (`apps/bots/*`)
- Shared business logic package (`packages/shared`)
- Prisma schema for SaaS and bot configuration (`prisma/schema.prisma`)

## Monorepo Structure

- `apps/website`: public SaaS website with catalog, bot details, pricing, docs, legal, status pages.
- `apps/dashboard`: owner dashboard for guild/server bot management.
- `apps/admin`: super admin panel for bot catalog, pricing, access grants, payments, secrets.
- `apps/api`: Express + Prisma backend for auth, guilds, settings, premium, payments, content.
- `apps/bots`: separate Discord bot services:
  - `addy-main`, `addy-mod`, `addy-music`, `addy-notify`, `addy-welcome`, `addy-level`, `addy-ticket`, `addy-utility`, `addy-guard`, `addy-ai`.
- `packages/shared`: shared types, constants, validators, pricing matrix, feature-gate helpers.
- `prisma`: relational data models.

## Quick Start

1. Install dependencies:
   ```bash
   pnpm install
   ```
2. Copy environment values:
   ```bash
   cp .env.example .env
   ```
3. Generate Prisma client and run migrations:
   ```bash
   pnpm db:generate
   pnpm db:migrate
   ```
4. Run all apps in development:
   ```bash
   pnpm dev
   ```

### App ports
- Website: `http://localhost:3000`
- Dashboard: `http://localhost:3001`
- Admin: `http://localhost:3002`
- API: `http://localhost:4000`

## API Highlights

- `POST /api/auth/signup`
- `POST /api/auth/login`
- `GET /api/auth/discord/url`
- `GET /api/auth/me`
- `GET /api/guilds`
- `POST /api/guilds/sync`
- `PUT /api/guilds/settings`
- `GET /api/pricing/plans`
- `GET /api/pricing/bots`
- `POST /api/payments/checkout`
- `GET /api/payments/history`
- `POST /api/premium/activate-trial`
- `GET /api/admin/overview`
- `POST /api/admin/bots`
- `PATCH /api/admin/payments/:id`
- `POST /api/admin/grants/free`
- `POST /api/admin/grants/trial`

## Payment Modes
- Stripe, Razorpay, PayPal, manual approval, UPI-focused manual mode.
- Manual and UPI payments enter `PENDING` review flow for owner approval.

## Bot Runtime
Each bot is independently runnable:
```bash
pnpm --filter @addy/addy-mod dev
pnpm --filter @addy/addy-music dev
```

All bots share a registration and runtime framework in `apps/bots/_core/src/framework.ts`.

## Premium and Feature Gating
- Tier matrix and features in `packages/shared/src/pricing/plans.ts`.
- Access resolver in `packages/shared/src/utils/feature-gate.ts`.
- Guild subscriptions and trial grants in Prisma models.

