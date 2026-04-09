import { Router } from "express";
import { prisma } from "../lib/prisma.js";
import { requireAuth, type AuthRequest } from "../middleware/auth.js";

export const premiumRouter = Router();
premiumRouter.use(requireAuth);

premiumRouter.post("/activate-trial", async (req: AuthRequest, res) => {
  const { guildId, botKey } = req.body as { guildId: string; botKey: string };
  const grant = await prisma.trialGrant.findFirst({ where: { userId: req.userId, botKey, used: false } });
  if (!grant) return res.status(403).json({ error: "No trial grant available" });

  await prisma.$transaction([
    prisma.subscription.create({
      data: {
        userId: req.userId!,
        guildId,
        planCode: "ADDY_PRO",
        isTrial: true,
        expiresAt: new Date(Date.now() + grant.days * 86400000)
      }
    }),
    prisma.trialGrant.update({ where: { id: grant.id }, data: { used: true } })
  ]);

  res.json({ activated: true });
});
