import { Router } from "express";

const docs = {
  gettingStarted: [
    "Login or signup to Addy.",
    "Connect Discord and sync your servers.",
    "Install a bot, configure channels and roles, then activate."
  ],
  billing: [
    "Choose monthly, yearly, or lifetime plans.",
    "Apply coupons from billing page.",
    "Owner can manually grant or revoke premium in admin panel."
  ]
};

const router = Router();
router.get("/docs", (_req, res) => res.json(docs));
router.get("/faq", (_req, res) =>
  res.json([
    { q: "How do I invite Addy bot?", a: "Select bot, pick server, authorize requested permissions." },
    { q: "How does trial work?", a: "Admin can grant trial days globally or per bot." }
  ])
);

export default router;
