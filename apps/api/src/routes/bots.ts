import { Router } from "express";
import { prisma } from "../lib/prisma.js";
import { requireAuth } from "../middleware/auth.js";

const router = Router();

router.get("/catalog", async (_req, res) => {
  const bots = await prisma.botConfig.findMany({
    where: { disabled: false, showOnDashboard: true },
    orderBy: { name: "asc" }
  });

  res.json({ bots });
});

router.use(requireAuth);

router.post("/:guildId/install/:botKey", async (req, res) => {
  const { guildId, botKey } = req.params;

  const [guild, bot] = await Promise.all([
    prisma.guild.findUnique({ where: { id: guildId } }),
    prisma.botConfig.findUnique({ where: { key: botKey } })
  ]);

  if (!guild) return res.status(404).json({ error: "Guild not found" });
  if (!bot) return res.status(404).json({ error: "Bot not found" });

  const install = await prisma.guildBotInstall.upsert({
    where: { guildId_botConfigId: { guildId: guild.id, botConfigId: bot.id } },
    update: { active: true },
    create: { guildId: guild.id, botConfigId: bot.id, active: true }
  });

  res.json({ install });
});

export default router;
