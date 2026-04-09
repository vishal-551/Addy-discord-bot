import { Router } from "express";
import { prisma } from "../lib/prisma.js";
import { requireAuth } from "../middleware/auth.js";

const router = Router();

router.get("/catalog", async (_req, res) => {
  const bots = await prisma.botConfig.findMany({ orderBy: { displayName: "asc" } });
  res.json(bots);
});

router.use(requireAuth);

router.post("/:guildId/install/:botKey", async (req, res) => {
  const bot = await prisma.botConfig.findUnique({ where: { key: req.params.botKey } });
  if (!bot) return res.status(404).json({ error: "Bot not found" });
  const install = await prisma.guildBotInstall.upsert({
    where: { guildId_botConfigId: { guildId: req.params.guildId, botConfigId: bot.id } },
    update: { enabled: true },
    create: { guildId: req.params.guildId, botConfigId: bot.id }
  });
  res.json(install);
});

export default router;
