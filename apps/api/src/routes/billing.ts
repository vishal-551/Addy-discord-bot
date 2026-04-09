import { Router } from "express";
import { BOT_ADDON_PRICING_USD, PLAN_PRICING } from "@addy/shared";
import { prisma } from "../lib/prisma.js";
import { AuthRequest, requireAuth } from "../middleware/auth.js";

const router = Router();

router.get("/pricing", (_req, res) => res.json({ plans: PLAN_PRICING, addons: BOT_ADDON_PRICING_USD }));

router.use(requireAuth);

router.post("/checkout/manual", async (req: AuthRequest, res) => {
  const { planKey, guildId, method, amountUsd, targetBotKey } = req.body;
  const subscription = await prisma.subscription.create({
    data: { userId: req.user!.id, guildId, planKey, targetBotKey, renewsAt: new Date(Date.now() + 30 * 864e5) }
  });
  const payment = await prisma.payment.create({
    data: { userId: req.user!.id, guildId, subscriptionId: subscription.id, amountUsd, method, status: "pending" }
  });
  res.json({ subscription, payment, nextStep: "Awaiting payment verification" });
});

router.get("/history", async (req: AuthRequest, res) => {
  const payments = await prisma.payment.findMany({ where: { userId: req.user!.id }, orderBy: { createdAt: "desc" } });
  res.json(payments);
});

export default router;
