import { Link, Route, Routes, useParams } from "react-router-dom";
import { ADDY_BOTS, PLAN_PRICING, websiteFaq } from "./lib/data";

const Nav = () => (
  <nav className="nav container">
    {[
      ["/", "Home"], ["/features", "Features"], ["/catalog", "Bot Catalog"], ["/pricing", "Pricing"],
      ["/login", "Login"], ["/signup", "Signup"], ["/dashboard", "Dashboard"], ["/docs", "Docs"],
      ["/status", "Status"], ["/faq", "FAQ"], ["/terms", "Terms"]
    ].map(([href, label]) => <Link key={href} to={href}>{label}</Link>)}
  </nav>
);

const Home = () => <div className="container"><h1>Addy Bot Ecosystem</h1><p>Premium multi-bot Discord SaaS with onboarding, billing, and admin controls.</p></div>;
const Features = () => <div className="container"><h2>Platform Features</h2><ul><li>Discord OAuth2</li><li>Per-bot and suite subscriptions</li><li>Guild-level controls and analytics</li></ul></div>;
const Pricing = () => <div className="container"><h2>Pricing</h2><div className="grid grid-3">{Object.entries(PLAN_PRICING).map(([k,v])=><div className="card" key={k}><h3>{k}</h3><p>${v.monthlyUsd}/mo · ${v.yearlyUsd}/yr</p></div>)}</div></div>;
const Auth = ({ mode }: { mode: "login" | "signup" }) => <div className="container"><h2>{mode === "login" ? "Login" : "Signup"}</h2><input placeholder="Email"/><input placeholder="Password" type="password"/><button>{mode}</button></div>;
const Docs = () => <div className="container"><h2>Documentation</h2><ol><li>Connect Discord account</li><li>Invite Addy bot with required permissions</li><li>Configure channels, roles, feature toggles</li><li>Enable trial/premium and activate</li></ol></div>;
const Status = () => <div className="container"><h2>Bot Status</h2><div className="grid grid-3">{ADDY_BOTS.map(b=><div key={b.key} className="card"><h3>{b.name}</h3><p>{b.status}</p></div>)}</div></div>;
const Faq = () => <div className="container"><h2>FAQ</h2>{websiteFaq.map(x=><div className="card" key={x.q}><b>{x.q}</b><p>{x.a}</p></div>)}</div>;
const Terms = () => <div className="container"><h2>Terms & Privacy</h2><p>Use of Addy services requires compliance with Discord Terms and applicable laws.</p></div>;
const Contact = () => <div className="container"><h2>Contact</h2><p>Email: support@addybots.example</p></div>;
const DashboardInvite = () => <div className="container"><h2>Invite & Manage</h2><p>Step flow: login → Discord connect → bot select → server select → invite → dashboard setup.</p></div>;

const Catalog = () => <div className="container"><h2>Bot Catalog</h2><div className="grid grid-3">{ADDY_BOTS.map(bot=><div key={bot.key} className="card"><h3>{bot.name}</h3><p>{bot.description}</p><Link to={`/bots/${bot.slug}`}>Details</Link></div>)}</div></div>;

const BotDetail = () => {
  const { slug } = useParams();
  const bot = ADDY_BOTS.find((b) => b.slug === slug);
  if (!bot) return <div className="container">Bot not found.</div>;
  return <div className="container"><h2>{bot.name}</h2><p>{bot.description}</p><h3>Free Features</h3><ul>{bot.freeFeatures.map(f=><li key={f}>{f}</li>)}</ul><h3>Premium Features</h3><ul>{bot.premiumFeatures.map(f=><li key={f}>{f}</li>)}</ul><p>Permissions: Manage Messages, Manage Roles, View Channels.</p><button>Invite Now</button> <button>Manage in Dashboard</button></div>;
};

export const App = () => (
  <>
    <Nav />
    <Routes>
      <Route path="/" element={<Home />} />
      <Route path="/features" element={<Features />} />
      <Route path="/catalog" element={<Catalog />} />
      <Route path="/bots/:slug" element={<BotDetail />} />
      <Route path="/pricing" element={<Pricing />} />
      <Route path="/login" element={<Auth mode="login" />} />
      <Route path="/signup" element={<Auth mode="signup" />} />
      <Route path="/dashboard" element={<DashboardInvite />} />
      <Route path="/contact" element={<Contact />} />
      <Route path="/docs" element={<Docs />} />
      <Route path="/status" element={<Status />} />
      <Route path="/premium-comparison" element={<Pricing />} />
      <Route path="/invite" element={<DashboardInvite />} />
      <Route path="/faq" element={<Faq />} />
      <Route path="/terms" element={<Terms />} />
    </Routes>
  </>
);
