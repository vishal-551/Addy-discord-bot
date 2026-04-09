import express from "express";
import cors from "cors";
import { env } from "./lib/env.js";
import { authRouter } from "./routes/auth.js";
import { guildRouter } from "./routes/guilds.js";
import { pricingRouter } from "./routes/pricing.js";
import { paymentRouter } from "./routes/payments.js";
import { premiumRouter } from "./routes/premium.js";
import { adminRouter } from "./routes/admin.js";
import { contentRouter } from "./routes/content.js";

const app = express();
app.use(cors());
app.use(express.json({ limit: "1mb" }));

app.get("/health", (_req, res) => res.json({ ok: true, service: "addy-api" }));
app.use("/api/auth", authRouter);
app.use("/api/guilds", guildRouter);
app.use("/api/pricing", pricingRouter);
app.use("/api/payments", paymentRouter);
app.use("/api/premium", premiumRouter);
app.use("/api/admin", adminRouter);
app.use("/api/content", contentRouter);

app.listen(env.port, () => {
  console.log(`Addy API running on http://localhost:${env.port}`);
});
