import Link from "next/link";
const sections = ["overview","my-bots","servers","settings/moderation","settings/welcome","settings/level","settings/notify","settings/music","settings/ticket","settings/utility","settings/guard","settings/ai","billing","trial","logs","analytics","support"];
export default function DashboardHome(){return <main className="container"><h1>Addy Dashboard</h1><p>Manage every installed Addy bot per server.</p><div className="grid">{sections.map(s=><Link key={s} className="card" href={`/${s}`}>{s}</Link>)}</div></main>}
