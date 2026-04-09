import { Router } from "express";
import bcrypt from "bcryptjs";
import jwt from "jsonwebtoken";
import { z } from "zod";
import { prisma } from "../lib/prisma.js";
import { env } from "../config/env.js";
import { requireAuth, AuthRequest } from "../middleware/auth.js";

const router = Router();
const credentialsSchema = z.object({ email: z.string().email(), password: z.string().min(8) });

router.post("/signup", async (req, res) => {
  const parsed = credentialsSchema.safeParse(req.body);
  if (!parsed.success) return res.status(400).json(parsed.error.flatten());
  const passwordHash = await bcrypt.hash(parsed.data.password, 10);
  const user = await prisma.user.create({ data: { email: parsed.data.email, passwordHash } });
  const token = jwt.sign({ id: user.id, role: user.role }, env.jwtSecret, { expiresIn: "7d" });
  res.json({ token, user });
});

router.post("/login", async (req, res) => {
  const parsed = credentialsSchema.safeParse(req.body);
  if (!parsed.success) return res.status(400).json(parsed.error.flatten());
  const user = await prisma.user.findUnique({ where: { email: parsed.data.email } });
  if (!user || !(await bcrypt.compare(parsed.data.password, user.passwordHash))) {
    return res.status(401).json({ error: "Invalid credentials" });
  }
  const token = jwt.sign({ id: user.id, role: user.role }, env.jwtSecret, { expiresIn: "7d" });
  res.json({ token, user });
});

router.get("/me", requireAuth, async (req: AuthRequest, res) => {
  const user = await prisma.user.findUnique({ where: { id: req.user!.id } });
  res.json({ user });
});

router.get("/discord/start", (_req, res) => {
  res.json({
    authorizeUrl: `https://discord.com/oauth2/authorize?client_id=${process.env.DISCORD_CLIENT_ID}&response_type=code&redirect_uri=${encodeURIComponent(process.env.DISCORD_REDIRECT_URI ?? "")}&scope=identify%20guilds`
  });
});

router.get("/discord/callback", async (_req, res) => {
  res.json({ message: "Discord OAuth callback endpoint ready. Exchange code in production adapter." });
});

export default router;
