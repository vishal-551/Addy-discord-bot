import { Router } from "express";
import { prisma } from "../lib/prisma.js";
import { requireAdmin, requireAuth } from "../middleware/auth.js";

const router = Router();
router.use(requireAuth, requireAdmin);

router.get("/overview", async (_req, res) => {
  const [users, guilds, subscriptions, payments] = await Promise.all([
    prisma.user.count(),
    prisma.guild.count(),
    prisma.subscription.count(),
    prisma.payment.count()
  ]);
  res.json({ users, guilds, subscriptions, payments });
});

router.get("/users", async (_req, res) => res.json(await prisma.user.findMany({ take: 100 })));
router.get("/guilds", async (_req, res) => res.json(await prisma.guild.findMany({ take: 100 })));
router.get("/payments", async (_req, res) => res.json(await prisma.payment.findMany({ take: 200, orderBy: { createdAt: "desc" } })));
router.get("/bots", async (_req, res) => res.json(await prisma.botConfig.findMany()));

router.post("/bots", async (req, res) => {
  const bot = await prisma.botConfig.create({ data: req.body });
  res.json(bot);
});

router.put("/bots/:id", async (req, res) => {
  const bot = await prisma.botConfig.update({ where: { id: req.params.id }, data: req.body });
  res.json(bot);
});

router.post("/grants/premium", async (req, res) => {
  const { userId, guildId, planKey, targetBotKey, endsAt } = req.body;
  const subscription = await prisma.subscription.create({ data: { userId, guildId, planKey, targetBotKey, status: "manual_grant", endsAt } });
  res.json(subscription);
});

router.post("/grants/free", async (req, res) => {
  const grant = await prisma.freeAccessGrant.create({ data: req.body });
  res.json(grant);
});

router.post("/grants/trial", async (req, res) => {
  const trial = await prisma.trialGrant.create({ data: req.body });
  res.json(trial);
});

router.put("/payments/:id/status", async (req, res) => {
  const payment = await prisma.payment.update({ where: { id: req.params.id }, data: { status: req.body.status } });
  res.json(payment);
});

export default router;
