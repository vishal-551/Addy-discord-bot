import { Router } from "express";
import { prisma } from "../lib/prisma.js";
import { AuthRequest, requireAuth } from "../middleware/auth.js";

const router = Router();
router.use(requireAuth);

router.get("/", async (req: AuthRequest, res) => {
  const memberships = await prisma.guildMember.findMany({ where: { userId: req.user!.id }, include: { guild: true } });
  res.json(memberships.map((m) => m.guild));
});

router.post("/sync", async (req: AuthRequest, res) => {
  const guilds = req.body.guilds as Array<{ id: string; name: string }>;
  const out = [];
  for (const guild of guilds) {
    const record = await prisma.guild.upsert({
      where: { discordGuildId: guild.id },
      update: { name: guild.name },
      create: { discordGuildId: guild.id, name: guild.name, ownerDiscordId: req.user!.id }
    });
    await prisma.guildMember.upsert({
      where: { userId_guildId: { userId: req.user!.id, guildId: record.id } },
      update: { role: "owner" },
      create: { userId: req.user!.id, guildId: record.id, role: "owner" }
    });
    out.push(record);
  }
  res.json(out);
});

router.get("/:guildId/settings", async (req, res) => {
  const guild = await prisma.guild.findUnique({
    where: { id: req.params.guildId },
    include: {
      installs: { include: { bot: true } },
      welcomeSettings: true,
      moderationSettings: true,
      automodSettings: true,
      youtubeSettings: true,
      musicSettings: true,
      levelSettings: true,
      ticketSettings: true,
      aiSettings: true
    }
  });
  res.json(guild);
});

export default router;
