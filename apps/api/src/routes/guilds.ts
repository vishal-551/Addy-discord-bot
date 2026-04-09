import { Router } from "express";
import { nanoid } from "nanoid";
import { guildSettingsSchema } from "@addy/shared";
import { prisma } from "../lib/prisma.js";
import { requireAuth, type AuthRequest } from "../middleware/auth.js";

export const guildRouter = Router();

guildRouter.use(requireAuth);

guildRouter.get("/", async (req: AuthRequest, res) => {
  const guilds = await prisma.guildMember.findMany({
    where: { userId: req.userId, canManage: true },
    include: { guild: true }
  });
  res.json({ guilds: guilds.map((gm) => gm.guild) });
});

guildRouter.post("/sync", async (req: AuthRequest, res) => {
  const payload = req.body as { discordGuildId: string; name: string; ownerDiscordId?: string };
  const guild = await prisma.guild.upsert({
    where: { discordGuildId: payload.discordGuildId },
    create: {
      discordGuildId: payload.discordGuildId,
      name: payload.name,
      ownerDiscordId: payload.ownerDiscordId,
      internalCode: `ADDY-${nanoid(10)}`
    },
    update: { name: payload.name, ownerDiscordId: payload.ownerDiscordId }
  });

  await prisma.guildMember.upsert({
    where: {
      guildId_userId: {
        guildId: guild.id,
        userId: req.userId!
      }
    },
    create: {
      guildId: guild.id,
      userId: req.userId!,
      isOwner: true,
      canManage: true
    },
    update: {
      isOwner: true,
      canManage: true
    }
  });

  res.json({ guild });
});

guildRouter.put("/settings", async (req, res) => {
  const parsed = guildSettingsSchema.safeParse(req.body);
  if (!parsed.success) return res.status(400).json(parsed.error.flatten());

  const { guildId, botKey, config } = parsed.data;
  const updated = await prisma.featureFlag.upsert({
    where: { guildId_botKey_flag: { guildId, botKey, flag: "custom-config" } },
    create: { guildId, botKey, flag: "custom-config", enabled: true },
    update: { enabled: true }
  });

  res.json({ updated, config });
});
