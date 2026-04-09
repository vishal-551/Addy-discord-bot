import { Router } from "express";
import bcrypt from "bcryptjs";
import jwt from "jsonwebtoken";
import { z } from "zod";
import { env } from "../lib/env.js";
import { prisma } from "../lib/prisma.js";
import { requireAuth, type AuthRequest } from "../middleware/auth.js";

export const authRouter = Router();

const signupSchema = z.object({ email: z.string().email(), password: z.string().min(8) });
const loginSchema = signupSchema;

authRouter.post("/signup", async (req, res) => {
  const input = signupSchema.safeParse(req.body);
  if (!input.success) return res.status(400).json(input.error.flatten());

  const existing = await prisma.user.findUnique({ where: { email: input.data.email } });
  if (existing) return res.status(409).json({ error: "Email already used" });

  const passwordHash = await bcrypt.hash(input.data.password, 10);
  const user = await prisma.user.create({ data: { email: input.data.email, passwordHash } });

  const token = jwt.sign({ sub: user.id, role: user.role }, env.jwtSecret, { expiresIn: "7d" });
  res.json({ token, user: { id: user.id, email: user.email, role: user.role } });
});

authRouter.post("/login", async (req, res) => {
  const input = loginSchema.safeParse(req.body);
  if (!input.success) return res.status(400).json(input.error.flatten());

  const user = await prisma.user.findUnique({ where: { email: input.data.email } });
  if (!user || !user.passwordHash) return res.status(401).json({ error: "Invalid credentials" });

  const valid = await bcrypt.compare(input.data.password, user.passwordHash);
  if (!valid) return res.status(401).json({ error: "Invalid credentials" });

  const token = jwt.sign({ sub: user.id, role: user.role }, env.jwtSecret, { expiresIn: "7d" });
  res.json({ token, user: { id: user.id, email: user.email, role: user.role } });
});

authRouter.get("/discord/url", (_req, res) => {
  const scope = encodeURIComponent("identify guilds guilds.members.read");
  const redirect = encodeURIComponent(env.discordRedirectUri);
  const url = `https://discord.com/api/oauth2/authorize?client_id=${env.discordClientId}&redirect_uri=${redirect}&response_type=code&scope=${scope}`;
  res.json({ url });
});

authRouter.get("/me", requireAuth, async (req: AuthRequest, res) => {
  const user = await prisma.user.findUnique({ where: { id: req.userId } });
  if (!user) return res.status(404).json({ error: "User not found" });
  res.json({ user });
});
