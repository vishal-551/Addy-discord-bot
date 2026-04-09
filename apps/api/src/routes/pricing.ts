import { Router } from "express";
import { prisma } from "../lib/prisma.js";

export const pricingRouter = Router();

pricingRouter.get("/plans", async (_req, res) => {
  const plans = await prisma.premiumPlan.findMany({ where: { active: true } });
  res.json({ plans });
});

pricingRouter.get("/bots", async (_req, res) => {
  const bots = await prisma.botConfig.findMany({ where: { disabled: false, showOnWebsite: true } });
  res.json({ bots });
});
