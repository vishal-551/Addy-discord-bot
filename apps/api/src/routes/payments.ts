import { Router } from "express";
import { paymentCreateSchema } from "@addy/shared";
import { prisma } from "../lib/prisma.js";
import { requireAuth, type AuthRequest } from "../middleware/auth.js";

export const paymentRouter = Router();
paymentRouter.use(requireAuth);

paymentRouter.post("/checkout", async (req: AuthRequest, res) => {
  const parsed = paymentCreateSchema.safeParse(req.body);
  if (!parsed.success) return res.status(400).json(parsed.error.flatten());

  const paymentStatus = parsed.data.provider === "MANUAL" || parsed.data.provider === "UPI" ? "PENDING" : "APPROVED";

  const payment = await prisma.payment.create({
    data: {
      userId: req.userId!,
      guildId: parsed.data.guildId,
      botKey: parsed.data.botKey,
      planCode: parsed.data.planCode,
      provider: parsed.data.provider,
      amount: parsed.data.amount,
      status: paymentStatus,
      metadata: { coupon: parsed.data.coupon ?? null }
    }
  });

  if (paymentStatus === "APPROVED") {
    const bot = await prisma.botConfig.findUnique({ where: { key: parsed.data.botKey } });
    await prisma.subscription.create({
      data: {
        userId: req.userId!,
        guildId: parsed.data.guildId,
        botConfigId: bot?.id,
        planCode: parsed.data.planCode,
        isPremium: parsed.data.planCode !== "FREE",
        expiresAt: new Date(Date.now() + 30 * 24 * 60 * 60 * 1000)
      }
    });
  }

  res.json({ payment, nextAction: paymentStatus === "PENDING" ? "WAIT_MANUAL_REVIEW" : "ACTIVATE_NOW" });
});

paymentRouter.get("/history", async (req: AuthRequest, res) => {
  const payments = await prisma.payment.findMany({ where: { userId: req.userId }, orderBy: { createdAt: "desc" } });
  res.json({ payments });
});
