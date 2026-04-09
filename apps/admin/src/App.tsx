import { Link, Route, Routes } from "react-router-dom";

const sections = [
  "overview", "users", "guilds", "bot-manager", "pricing-manager", "payments", "grants", "secrets", "content", "docs", "faq", "support", "announcements", "analytics"
];

const Nav = () => <div className="container nav">{sections.map((s)=><Link key={s} to={`/${s}`}>{s}</Link>)}</div>;
const Panel = ({ title, children }: { title: string; children?: React.ReactNode }) => <div className="container"><h1>{title}</h1><div className="card">{children ?? <p>Admin controls for {title}.</p>}</div></div>;

const BotManager = () => <Panel title="Bot Manager"><p>Create, edit, delete Addy bot entries with plan logic and visibility controls.</p><input placeholder="Bot name"/><input placeholder="Slug"/><input placeholder="Client ID"/><input placeholder="Token / Secret"/><select><option>freemium</option><option>free</option><option>paid</option><option>custom</option></select><button>Save Bot</button></Panel>;
const Pricing = () => <Panel title="Pricing Manager"><input placeholder="Bot key"/><input placeholder="Monthly price"/><input placeholder="Yearly price"/><input placeholder="Trial days"/><button>Update Pricing Rule</button></Panel>;
const Payments = () => <Panel title="Payment Received Management"><p>Track Stripe, Razorpay, PayPal, UPI, and manual verification.</p><button>Approve Selected</button><button>Reject Selected</button></Panel>;
const Secrets = () => <Panel title="Bot Secret Configuration"><textarea rows={8} defaultValue="Store encrypted client IDs and tokens for all Addy bots here."/><button>Rotate Secrets</button></Panel>;

export const App = () => (
  <>
    <Nav />
    <Routes>
      <Route path="/" element={<Panel title="Owner Super Admin" />} />
      <Route path="/overview" element={<Panel title="Overview" />} />
      <Route path="/users" element={<Panel title="Users" />} />
      <Route path="/guilds" element={<Panel title="Guilds" />} />
      <Route path="/bot-manager" element={<BotManager />} />
      <Route path="/pricing-manager" element={<Pricing />} />
      <Route path="/payments" element={<Payments />} />
      <Route path="/grants" element={<Panel title="Free/Trial/Premium Grants" />} />
      <Route path="/secrets" element={<Secrets />} />
      <Route path="/content" element={<Panel title="Website Content Manager" />} />
      <Route path="/docs" element={<Panel title="Docs Manager" />} />
      <Route path="/faq" element={<Panel title="FAQ Manager" />} />
      <Route path="/support" element={<Panel title="Support Requests" />} />
      <Route path="/announcements" element={<Panel title="Broadcast Announcements" />} />
      <Route path="/analytics" element={<Panel title="Revenue & Usage Analytics" />} />
    </Routes>
  </>
);
