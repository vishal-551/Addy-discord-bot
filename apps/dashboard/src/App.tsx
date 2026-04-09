import { Link, Route, Routes } from "react-router-dom";
import { ADDY_BOTS } from "@addy/shared";

const navItems = ["overview", "my-bots", "server-selector", "bot-status", "moderation", "welcome", "level", "notify", "music", "ticket", "utility", "guard", "ai", "billing", "trial", "logs", "analytics", "invite-manage", "support"];

const Nav = () => <div className="container nav">{navItems.map((n) => <Link key={n} to={`/${n}`}>{n}</Link>)}</div>;

const Overview = () => <div className="container"><h1>Addy Dashboard</h1><p>Manage servers, bots, premium, and feature controls.</p></div>;
const MyBots = () => <div className="container"><h2>Installed Bots</h2><div className="grid grid-3">{ADDY_BOTS.map(b=><div className="card" key={b.key}><h3>{b.name}</h3><p>{b.description}</p><button>Configure</button></div>)}</div></div>;
const ServerSelector = () => <div className="container"><h2>Server Selector</h2><select><option>Demo Guild</option></select></div>;
const Generic = ({ title }: { title: string }) => <div className="container"><h2>{title}</h2><div className="card"><p>Guild-specific settings, feature toggles, and premium lock indicators available here.</p></div></div>;
const Billing = () => <div className="container"><h2>Premium & Billing</h2><div className="card"><p>Manage monthly/yearly plans, coupons, invoices, and renewals.</p><button>Upgrade to Addy Premium</button></div></div>;

export const App = () => (
  <>
    <Nav />
    <Routes>
      <Route path="/" element={<Overview />} />
      <Route path="/overview" element={<Overview />} />
      <Route path="/my-bots" element={<MyBots />} />
      <Route path="/server-selector" element={<ServerSelector />} />
      <Route path="/bot-status" element={<Generic title="Bot Status" />} />
      <Route path="/moderation" element={<Generic title="Moderation Settings" />} />
      <Route path="/welcome" element={<Generic title="Welcome Settings" />} />
      <Route path="/level" element={<Generic title="Level Settings" />} />
      <Route path="/notify" element={<Generic title="Notification Settings" />} />
      <Route path="/music" element={<Generic title="Music Settings" />} />
      <Route path="/ticket" element={<Generic title="Ticket Settings" />} />
      <Route path="/utility" element={<Generic title="Utility Settings" />} />
      <Route path="/guard" element={<Generic title="Guard Settings" />} />
      <Route path="/ai" element={<Generic title="AI Settings" />} />
      <Route path="/billing" element={<Billing />} />
      <Route path="/trial" element={<Generic title="Trial Status" />} />
      <Route path="/logs" element={<Generic title="Bot Logs" />} />
      <Route path="/analytics" element={<Generic title="Analytics" />} />
      <Route path="/invite-manage" element={<Generic title="Invite / Manage" />} />
      <Route path="/support" element={<Generic title="Support" />} />
    </Routes>
  </>
);
