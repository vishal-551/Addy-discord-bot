import { Router } from "express";

const docs = {
  addBot: "Use Invite button, authorize required permissions, then sync server in dashboard.",
  billing: "Monthly and yearly plans available. Manual UPI verification supported.",
  trial: "Trial grants are owner controlled and can be activated per bot per guild.",
  troubleshooting: "Check bot role hierarchy, command permissions, and feature plan status."
};

export const contentRouter = Router();
contentRouter.get("/docs", (_req, res) => res.json({ docs }));
