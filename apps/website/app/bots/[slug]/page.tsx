import Link from "next/link";
import { addyBots } from "@addy/shared";

export default async function BotDetailPage({ params }: { params: Promise<{ slug: string }> }) {
  const { slug } = await params;
  const bot = addyBots.find((entry) => entry.key === slug);
  if (!bot) return <main className="container"><h1>Bot not found</h1></main>;

  return (
    <main className="container card">
      <h1>{bot.name}</h1>
      <p>{bot.category} bot for the Addy ecosystem.</p>
      <h3>What it does</h3><p>Manages server workflows with slash commands and dashboard sync.</p>
      <h3>Feature list</h3><ul><li>Slash commands</li><li>Server settings sync</li><li>Audit and logs</li></ul>
      <h3>Free features</h3><ul><li>Core commands</li><li>Basic dashboard config</li></ul>
      <h3>Premium features</h3><ul><li>Advanced analytics</li><li>Smart automation intelligence</li></ul>
      <h3>Setup steps</h3><ol><li>Invite bot</li><li>Grant permissions</li><li>Connect guild in dashboard</li></ol>
      <h3>Permissions needed</h3><p>Manage Messages, Kick/Ban, Moderate Members, Send/Embed Links as needed per bot.</p>
      <h3>Pricing details</h3><p>{bot.premium ? "Premium module available monthly/yearly" : "Free core with optional premium."}</p>
      <h3>FAQ</h3><p>Can I use only this bot? Yes, single-bot subscription is supported.</p>
      <div style={{ display: "flex", gap: 10 }}><Link href="/invite"><button>Invite</button></Link><Link href={`http://localhost:3001/bots/${bot.key}`}><button>Dashboard</button></Link></div>
    </main>
  );
}
