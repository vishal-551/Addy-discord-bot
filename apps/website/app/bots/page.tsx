import Link from "next/link";
import { addyBots } from "@addy/shared";

export default function BotCatalogPage() {
  return <main className="container"><h1>Bot Catalog</h1><div className="grid">{addyBots.map((bot)=><div className="card" key={bot.key}><h3>{bot.name}</h3><p>{bot.category}</p><span className="badge">{bot.premium?"Premium":"Free"}</span><div style={{display:"flex",gap:8,marginTop:10}}><Link href="/invite">Invite</Link><Link href={`http://localhost:3001/bots/${bot.key}`}>Manage</Link></div></div>)}</div></main>;
}
