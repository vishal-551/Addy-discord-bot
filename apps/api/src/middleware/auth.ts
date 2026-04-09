import type { Request, Response, NextFunction } from "express";
import jwt from "jsonwebtoken";
import { env } from "../lib/env.js";

interface AuthUser {
  id: string;
  role: string;
}

export interface AuthRequest extends Request {
  userId?: string;
  role?: string;
  user?: AuthUser;
}

export const requireAuth = (req: AuthRequest, res: Response, next: NextFunction): void => {
  const header = req.headers.authorization;
  if (!header) {
    res.status(401).json({ error: "Missing authorization header" });
    return;
  }

  const token = header.replace("Bearer ", "").trim();

  try {
    const payload = jwt.verify(token, env.jwtSecret) as { sub: string; role: string };
    req.userId = payload.sub;
    req.role = payload.role;
    req.user = { id: payload.sub, role: payload.role };
    next();
  } catch {
    res.status(401).json({ error: "Invalid token" });
  }
};

export const requireAdmin = (req: AuthRequest, res: Response, next: NextFunction): void => {
  if (!req.role || !["ADMIN", "OWNER"].includes(req.role)) {
    res.status(403).json({ error: "Admin access required" });
    return;
  }

  next();
};
