import express from "express";
import cors from "cors";
import { env } from "./config/env.js";
import authRoutes from "./routes/auth.js";
import guildRoutes from "./routes/guilds.js";
import botRoutes from "./routes/bots.js";
import billingRoutes from "./routes/billing.js";
import adminRoutes from "./routes/admin.js";
import contentRoutes from "./routes/content.js";

const app = express();
app.use(cors());
app.use(express.json());

app.get("/health", (_req, res) => res.json({ ok: true, service: "addy-api" }));
app.use("/api/auth", authRoutes);
app.use("/api/guilds", guildRoutes);
app.use("/api/bots", botRoutes);
app.use("/api/billing", billingRoutes);
app.use("/api/admin", adminRoutes);
app.use("/api/content", contentRoutes);

app.listen(env.port, () => {
  console.log(`Addy API running on http://localhost:${env.port}`);
});
