import { Router } from "express";
import { BOT_ADDON_PRICING_USD, PLAN_PRICING, paymentCreateSchema } from "@addy/shared";
import { prisma } from "../lib/prisma.js";
import { type AuthRequest, requireAuth } from "../middleware/auth.js";

const router = Router();

router.get("/pricing", (_req, res) => {
  res.json({ plans: PLAN_PRICING, addons: BOT_ADDON_PRICING_USD });
});

router.use(requireAuth);

router.post("/checkout/manual", async (req: AuthRequest, res) => {
  const parsed = paymentCreateSchema.safeParse({ ...req.body, provider: "MANUAL" });
  if (!parsed.success) return res.status(400).json(parsed.error.flatten());

  const payment = await prisma.payment.create({
    data: {
      userId: req.userId!,
      guildId: parsed.data.guildId,
      botKey: parsed.data.botKey,
      planCode: parsed.data.planCode,
      provider: "MANUAL",
      amount: parsed.data.amount,
      status: "PENDING",
      metadata: { coupon: parsed.data.coupon ?? null }
    }
  });

  res.json({ payment, nextStep: "Awaiting manual verification" });
});

router.get("/history", async (req: AuthRequest, res) => {
  const payments = await prisma.payment.findMany({
    where: { userId: req.userId },
    orderBy: { createdAt: "desc" }
  });
  res.json({ payments });
});

export default router;
