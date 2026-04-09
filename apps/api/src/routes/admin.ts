import { Router } from "express";
import { z } from "zod";
import { prisma } from "../lib/prisma.js";
import { requireAdmin, requireAuth } from "../middleware/auth.js";

export const adminRouter = Router();
adminRouter.use(requireAuth, requireAdmin);

adminRouter.get("/overview", async (_req, res) => {
  const [users, guilds, payments] = await Promise.all([
    prisma.user.count(),
    prisma.guild.count(),
    prisma.payment.aggregate({ _sum: { amount: true } })
  ]);
  res.json({ users, guilds, revenue: payments._sum.amount ?? 0 });
});

const botSchema = z.object({
  key: z.string(), slug: z.string(), name: z.string(), description: z.string(), category: z.string(),
  inviteUrl: z.string().url(), clientId: z.string(), tokenSecret: z.string(), status: z.enum(["LIVE", "BETA", "MAINTENANCE", "PAUSED"]),
  planType: z.enum(["FREE", "PAID", "FREEMIUM", "CUSTOM"]), monthlyPrice: z.number(), yearlyPrice: z.number(),
  lifetimePrice: z.number().nullable().optional(), featureList: z.array(z.string()), premiumFeatures: z.array(z.string()),
  logoUrl: z.string().url().optional(), showOnWebsite: z.boolean(), showOnDashboard: z.boolean(), dashboardRoute: z.string()
});

adminRouter.post("/bots", async (req, res) => {
  const parsed = botSchema.safeParse(req.body);
  if (!parsed.success) return res.status(400).json(parsed.error.flatten());
  const bot = await prisma.botConfig.create({ data: { ...parsed.data, lifetimePrice: parsed.data.lifetimePrice ?? undefined } });
  res.json({ bot });
});

adminRouter.patch("/payments/:id", async (req, res) => {
  const { status } = req.body as { status: "APPROVED" | "REJECTED" };
  const payment = await prisma.payment.update({ where: { id: req.params.id }, data: { status, reviewedAt: new Date() } });
  res.json({ payment });
});

adminRouter.post("/grants/free", async (req, res) => {
  const grant = await prisma.freeAccessGrant.create({ data: req.body });
  res.json({ grant });
});

adminRouter.post("/grants/trial", async (req, res) => {
  const grant = await prisma.trialGrant.create({ data: req.body });
  res.json({ grant });
});
