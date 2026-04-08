# Addy Platform — Production Architecture & Implementation Blueprint

## 1) Vision and Product Positioning

**Addy** is a multi-product Discord automation and intelligence SaaS composed of independent, premium-grade bots and one unified management platform. The product strategy is:

- **Modular bot family** (invite only what a guild needs).
- **Unified account and billing** (single identity, cross-bot subscriptions, bundles).
- **Enterprise-grade controls** (owner overrides, feature flags, trials, custom plans).
- **Static-first premium web experience** (marketing + app-like dashboard via APIs).

Core value proposition vs typical bot ecosystems:

- Better **cross-bot orchestration** (single dashboard, shared identity, shared billing).
- Better **business controls** (manual grants, custom contracts, per-feature unlocks).
- Better **security posture** (encrypted token vault, audited config changes).
- Better **analytics depth** (bot usage, feature usage, revenue, reliability).

---

## 2) Addy Bot Family (Independent Products + Suite)

Each bot is separately installable, individually billable, and included in bundle plans.

| Bot | Role | Default Plan Model |
|---|---|---|
| Addy Main | Platform bridge, onboarding, suite controls | Free core + premium orchestration |
| Addy Mod | Moderation + automod intelligence | Freemium |
| Addy Music | Audio/player ecosystem | Freemium + premium quality/limits |
| Addy Notify | YouTube/Twitch/social alerts | Freemium + channel limits |
| Addy Welcome | Welcome/verification/autoroles | Freemium |
| Addy Level | XP, ranks, leaderboards | Freemium |
| Addy Ticket | Ticketing + transcripts + SLA | Freemium |
| Addy Utility | General automation toolkit | Freemium |
| Addy Guard | Anti-nuke/anti-abuse security | Paid-first with free baseline |
| Addy AI | AI assistant + moderation suggestions | Paid-first |

### Bot registration object (canonical)

```ts
interface BotRegistryItem {
  id: string; // uuid
  slug: 'addy-main' | 'addy-mod' | 'addy-music' | ...;
  displayName: string; // Addy Mod
  category: 'core' | 'moderation' | 'music' | 'security' | 'ai' | 'utility';
  description: string;
  discordClientId: string;
  encryptedBotTokenRef: string; // pointer to secrets vault row
  inviteScopes: string[]; // ['bot', 'applications.commands']
  invitePermissions: string; // bigint string
  status: 'live' | 'beta' | 'maintenance' | 'paused';
  pricingMode: 'free' | 'paid' | 'freemium' | 'custom';
  dashboardRouteKey: string; // /dashboard/guild/:guildId/mod
  featureMap: Record<string, FeatureGateRule>;
  visibility: { showOnLanding: boolean; showInCatalog: boolean; showInDashboard: boolean };
}
```

---

## 3) System Architecture (High-Level)

## Core Services

1. **Web Frontend (Next.js + Tailwind, static optimized)**
   - Marketing pages statically generated.
   - Dashboard pages CSR/SSR hybrid with API tokens.
2. **API Backend (NestJS recommended)**
   - Auth, billing, guild management, config APIs, admin APIs.
3. **Bot Runtime Cluster (Node.js + discord.js)**
   - One process group per bot family member.
4. **Jobs/Workers (BullMQ + Redis)**
   - Notification polling, trial expiry, billing sync, analytics rollups.
5. **Data Layer (PostgreSQL + Prisma)**
   - Core relational source of truth.
6. **Cache + Queue (Redis)**
   - Session cache, distributed locks, job queues.
7. **Observability Stack**
   - OpenTelemetry + Prometheus + Grafana + Sentry.
8. **Secrets Vault**
   - KMS + encrypted DB records (or managed secret manager).

## Deployment topology

- `apps/web` deployed on Vercel/Cloudflare Pages (static-heavy).
- `apps/api` on container platform (Fly.io/Render/K8s/ECS).
- `apps/bots/*` each as isolated service autoscaled by events/load.
- `apps/worker` for asynchronous workloads.
- Managed PostgreSQL + Redis.
- CDN for static assets.

---

## 4) Monorepo Structure (Deployment-Ready)

```txt
addy-platform/
  apps/
    web/                      # Next.js static+dashboard frontend
    api/                      # NestJS REST + webhook endpoints
    worker/                   # BullMQ processors
    admin/                    # optional dedicated owner app (or route group in web)
    bots/
      addy-main/
      addy-mod/
      addy-music/
      addy-notify/
      addy-welcome/
      addy-level/
      addy-ticket/
      addy-utility/
      addy-guard/
      addy-ai/
  packages/
    ui/                       # shared design system components
    config/                   # shared env schema, constants
    types/                    # DTOs/contracts
    sdk/                      # API client for web/admin
    discord-core/             # slash command + permission framework
    billing-core/             # plan logic + gate checks
    analytics-core/           # event schema + emitters
    security-core/            # encryption, audit helper, policy checks
  infra/
    docker/
    terraform/
    k8s/
    github-actions/
  docs/
    architecture/
    api/
    runbooks/
    product/
```

---

## 5) Website and Dashboard Information Architecture

## Public static pages

- `/` Home
- `/features`
- `/bots`
- `/bots/[slug]`
- `/pricing`
- `/premium-comparison`
- `/status`
- `/docs`
- `/faq`
- `/contact`
- `/terms`
- `/privacy`
- `/invite/[slug]`
- `/login`, `/signup`, `/forgot-password`

## App/dashboard pages

- `/dashboard`
- `/dashboard/servers`
- `/dashboard/server/[guildPublicId]/overview`
- `/dashboard/server/[guildPublicId]/bots`
- `/dashboard/server/[guildPublicId]/mod`
- `/dashboard/server/[guildPublicId]/music`
- `/dashboard/server/[guildPublicId]/notify`
- `/dashboard/server/[guildPublicId]/welcome`
- `/dashboard/server/[guildPublicId]/level`
- `/dashboard/server/[guildPublicId]/ticket`
- `/dashboard/server/[guildPublicId]/utility`
- `/dashboard/server/[guildPublicId]/guard`
- `/dashboard/server/[guildPublicId]/ai`
- `/dashboard/server/[guildPublicId]/billing`
- `/dashboard/server/[guildPublicId]/logs`
- `/dashboard/server/[guildPublicId]/analytics`
- `/dashboard/support`

## Owner/super-admin pages (separate app or protected route group)

- `/owner`
- `/owner/users`
- `/owner/guilds`
- `/owner/bots`
- `/owner/bots/new`
- `/owner/bots/[botId]/secrets`
- `/owner/pricing`
- `/owner/plans`
- `/owner/coupons`
- `/owner/payments`
- `/owner/invoices`
- `/owner/feature-gates`
- `/owner/content`
- `/owner/docs-cms`
- `/owner/announcements`
- `/owner/audit-logs`
- `/owner/system-health`

---

## 6) Authentication & Identity Model

- Email/password auth (Argon2 hash).
- Discord OAuth2 link flow (`identify`, `guilds`).
- Optional social login extension.
- JWT access token + rotating refresh token.
- Device/session tracking with revocation.
- RBAC roles: `user`, `guild_admin`, `support`, `owner`.
- Route guards and policy checks per guild permission.

### Discord guild management authorization

A user can manage a guild only when:

1. Discord API indicates guild is manageable (`MANAGE_GUILD` / owner), and
2. platform `guild_memberships` maps user to guild with admin role.

---

## 7) Multi-Guild Mapping and IDs

- Keep Discord guild ID as external immutable key.
- Create internal UUID: `guild_public_id` (safe for URLs).
- Create internal numeric PK for joins/performance.

Flow on bot join:

1. Bot receives `guildCreate`.
2. Emits `GUILD_ONBOARDED` event.
3. API upserts guild by `discord_guild_id`.
4. Assigns/returns `guild_public_id`.
5. Creates bot installation record.
6. Initializes default config profiles.

---

## 8) Database Schema (PostgreSQL)

## Core identity and guild

- `users`
- `user_credentials`
- `user_discord_accounts`
- `sessions`
- `guilds`
- `guild_memberships`
- `bot_registry`
- `guild_bot_installations`
- `guild_onboarding`

## Config and feature gating

- `bot_configs` (JSONB per bot/guild with schema version)
- `feature_flags`
- `plan_definitions`
- `plan_features`
- `bot_plan_prices`
- `subscriptions`
- `subscription_items` (per bot or bundle)
- `entitlements` (resolved rights)
- `manual_overrides` (owner grants, trial extension, free unlock)

## Billing and payments

- `payment_customers`
- `payment_methods`
- `checkout_sessions`
- `payments`
- `invoices`
- `coupons`
- `coupon_redemptions`
- `refunds`

## Operations and analytics

- `audit_logs`
- `command_usage_events`
- `feature_usage_events`
- `bot_error_events`
- `notification_delivery_events`
- `job_runs`
- `announcement_broadcasts`
- `support_tickets_platform`

## Security and secrets

- `secret_store` (encrypted payload + key metadata)
- `bot_secret_bindings`
- `api_keys`
- `webhook_signing_keys`

---

## 9) Secret-Key / Token Management Architecture

## Principles

- Never expose raw tokens in frontend.
- Encrypt all bot tokens with envelope encryption.
- Read secrets only server-side in privileged runtime.
- Token rotation without downtime.
- Full audit trail for read/update/rotate events.

## Owner-only Secret Manager module

Capabilities:

- CRUD bot secret bindings (per bot/environment).
- Set active secret version.
- Rollback to previous secret version.
- Maintenance mode toggle if validation fails.
- Health check test (bot login dry-run in secure worker).

Security controls:

- Enforced owner MFA.
- IP allowlist option.
- Just-in-time re-auth for secret operations.
- Immutable audit logs.

---

## 10) Pricing, Plans, and Entitlement Engine

## Tiers

- Free
- Addy Basic
- Addy Pro
- Addy Premium
- Addy Ultimate
- Enterprise/Custom

## Commercial models

1. **Per-bot subscription** (e.g., Addy Music Pro).
2. **Bundle subscription** (selected bots).
3. **Suite subscription** (all bots).
4. **Manual assignment** (owner grant / lifetime / trial).

## Entitlement resolver priority

1. Manual owner overrides.
2. Active paid subscriptions.
3. Trial entitlements.
4. Free plan defaults.
5. Beta whitelist unlocks.

Outputs:

- Allowed modules.
- Per-feature limits (e.g., number of YouTube channels).
- Rate limits and priority queues.
- UI lock/unlock states and premium badges.

---

## 11) Payment Architecture

## Gateway strategy

- Primary: Stripe.
- Secondary: Razorpay.
- Optional adapter: PayPal.
- Optional manual verification (UPI/manual invoices).

## Unified billing abstraction

Implement `PaymentProviderAdapter` with methods:

- `createCustomer`
- `createCheckout`
- `verifyWebhook`
- `syncSubscription`
- `cancelSubscription`
- `createRefund`

## Payment lifecycle

1. User selects plan (bot or bundle).
2. Checkout session created with metadata (user, guild, bot/bundle).
3. Gateway webhook confirms payment.
4. Payment recorded in `payments`.
5. Subscription + entitlements activated.
6. Invoice generated and visible in dashboard.
7. Renewal/failure jobs handle dunning + grace period.

Manual mode:

- Owner marks pending payment approved/rejected.
- Entitlements applied only on approval.

---

## 12) Slash Command and Bot Runtime Architecture

## Command framework (shared package)

- Declarative command definitions.
- Capability middleware (checks entitlement before execution).
- Cooldown/rate-limit middleware.
- Permission guards (Discord + platform roles).
- Error normalization + telemetry emission.

## Command deployment

- CI job syncs global and guild commands.
- Versioned command registry.
- Canary rollout by selected guilds.

## Event-driven internals

Bots publish to queue/topics:

- `COMMAND_EXECUTED`
- `MOD_ACTION_LOGGED`
- `NOTIFY_DELIVERY_RESULT`
- `MUSIC_QUEUE_METRICS`
- `SECURITY_THREAT_DETECTED`

Worker consumes and writes analytics, notifications, billing-metered usage.

---

## 13) Bot-Specific Functional Modules

## Addy Mod

- Core moderation actions, warnings, case history.
- Automod rule engine (regex, heuristics, trust scores).
- Premium: AI-assisted moderation scoring + advanced raid mode.

## Addy Welcome

- Message builder, embeds, image rendering templates.
- Verification/rules flow.
- Premium animated layouts and multi-flow onboarding.

## Addy Level

- XP engine (message/voice), anti-farm protections.
- Rank cards + leaderboard.
- Premium custom formulas/themes/season resets.

## Addy Notify

- YouTube/Twitch trackers, per-channel routing.
- Retry/backoff and failure telemetry.
- Premium higher limits and faster polling windows.

## Addy Music

- Lavalink-compatible playback architecture.
- Queue, filters, panel controls.
- Premium HQ modes, DJ governance, smart autoplay.

## Addy Ticket

- Panel builder, forms, transcript export.
- SLA timers, priority routing.
- Premium multi-panel automations and advanced forms.

## Addy Utility

- Reminders, reaction/button roles, polls, sticky, AFK, birthdays.
- Backup/restore server config snapshots.

## Addy Guard

- Anti-nuke module using action thresholds.
- Webhook/permission/role/channel abuse protection.
- Premium advanced threat analytics and security score.

## Addy AI

- AI setup assistant for dashboard.
- Suggested responses/moderation guidance.
- Premium higher usage quotas + deeper AI tools.

## Addy Main

- Installation orchestration.
- Cross-bot dashboard linking.
- Bundle health status and onboarding state machine.

---

## 14) Dashboard Experience Blueprint

## Key UI capabilities

- Real-time setting sync status.
- Channel/role selectors with permission validation.
- Feature locks with contextual upgrade CTA.
- Preview panels (embed, welcome card, ticket form).
- One-click defaults/reset.
- Onboarding wizard per bot + suite-level checklist.

## State management

- React Query for server state.
- Zustand/Redux for local UI state.
- WebSocket/SSE for live bot health and job status.

---

## 15) Owner/Super Admin Control Plane

## Required domains

1. Users and guild management.
2. Bot manager (create/edit/delete bot listings).
3. Secret manager (token vault bindings).
4. Pricing manager (plans, bundles, discounts).
5. Payments and invoice operations.
6. Feature-gate manager.
7. Website content CMS blocks.
8. Analytics observability center.
9. Abuse/security enforcement (ban/suspend/restore).

## High-risk actions needing enhanced checks

- Secret/token updates.
- Manual entitlement grants/removals.
- Payment approval/reversal.
- Bot maintenance toggles.

All high-risk actions require step-up auth + audited reason.

---

## 16) Documentation and Help System

- MDX-based docs with search.
- Bot-specific guides and setup tutorials.
- Command references by bot.
- Billing and trial lifecycle docs.
- Troubleshooting playbooks.
- Embedded “copy setup” JSON templates.

Docs taxonomy:

- Getting Started
- Bot Setup Guides
- Dashboard Guides
- Billing & Plans
- Security & Permissions
- Troubleshooting
- API/Webhook Docs (for future partner ecosystem)

---

## 17) API Surface (Representative)

## Public/auth

- `POST /auth/signup`
- `POST /auth/login`
- `POST /auth/forgot-password`
- `GET /auth/discord/start`
- `GET /auth/discord/callback`

## Guild/bot management

- `GET /me/guilds`
- `GET /guilds/:guildPublicId/bots`
- `POST /guilds/:guildPublicId/bots/:botSlug/invite-link`
- `GET /guilds/:guildPublicId/config/:botSlug`
- `PUT /guilds/:guildPublicId/config/:botSlug`

## Billing

- `POST /billing/checkout`
- `POST /billing/coupons/validate`
- `GET /billing/invoices`
- `POST /billing/webhooks/:provider`

## Owner

- `POST /owner/entitlements/grant`
- `POST /owner/entitlements/revoke`
- `POST /owner/trials/extend`
- `PUT /owner/bots/:botId`
- `PUT /owner/bots/:botId/secrets`
- `PUT /owner/pricing/plans/:planId`
- `GET /owner/payments`

---

## 18) Security Architecture

- OWASP ASVS-aligned secure coding controls.
- Input schema validation (Zod/class-validator).
- CSRF protection for session routes.
- Strict CORS + secure cookie settings.
- API rate limiting + WAF rules.
- Abuse detection for suspicious onboarding/payment behavior.
- Signed webhook verification (Stripe/Razorpay/PayPal).
- Encryption at rest (DB) + in transit (TLS everywhere).
- Full audit logs for every dashboard mutation.

---

## 19) Analytics and Reporting Model

Track and expose:

- DAU/WAU/MAU.
- Active guilds per bot.
- Install/uninstall funnel.
- Premium conversion funnel.
- MRR/ARR and churn.
- Command usage and latency percentiles.
- Feature usage distribution by plan.
- Error rates and incident timelines.
- Notification success/failure by provider.

Use event pipeline:

- Bot/API emits event → queue → warehouse tables/materialized views → dashboard charts.

---

## 20) Delivery Roadmap (Execution Plan)

## Phase 0 — Foundation (2–3 weeks)

- Monorepo bootstrapping.
- Auth + Discord link.
- Guild sync and installation registry.
- Base UI shell + design system.

## Phase 1 — Core Product (4–6 weeks)

- Addy Main, Mod, Welcome, Utility MVP.
- Pricing + subscriptions + Stripe.
- Free/freemium gating engine.
- Owner panel v1 (users/guilds/manual grants).

## Phase 2 — Growth Modules (4–6 weeks)

- Addy Notify, Level, Ticket, Music.
- Analytics dashboards and audit logs.
- Coupons, yearly billing, grace periods.
- Razorpay integration + manual payment mode.

## Phase 3 — Premium Differentiation (4–8 weeks)

- Addy Guard and Addy AI advanced modules.
- Secret manager v2 with rotation automation.
- Enterprise plan tooling/custom contracts.
- Status page, docs center, in-app onboarding tours.

## Phase 4 — Scale & Reliability (ongoing)

- Multi-region optimization.
- SLO/SLA definition and error budgets.
- Cost optimization and autoscaling policies.

---

## 21) Why this is “Never-Seen-Before” Premium Positioning

Addy differentiates by combining:

- **Independent specialized bots** + **one control plane**.
- **Serious business tooling** (owner overrides, contract-like custom plans, manual approvals).
- **Premium UX** (dark futuristic interface, rich previews, guided onboarding).
- **Security-first operations** (token vault, audited changes, controlled secret access).
- **Commercial flexibility** (per-bot + bundle + suite + enterprise).

This architecture is intentionally built as a scalable, investor-grade SaaS platform rather than a single community bot with add-on features.

