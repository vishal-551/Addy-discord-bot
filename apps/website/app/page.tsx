import Link from "next/link";
import { addyBots } from "@addy/shared";

const faqs = [
  ["Is Addy free?", "Yes, core features are free and premium modules unlock advanced capabilities."],
  ["Can I buy one bot only?", "Yes, per-bot premium and full-suite bundles are both supported."],
  ["Do you support manual payments?", "Yes, manual approval mode and UPI verification are available."]
];

export default function HomePage() {
  return (
    <main className="container">
      <section className="card">
        <h1>Addy — Premium Discord Bot Ecosystem</h1>
        <p>Launch moderation, music, AI, ticketing, and growth automation across your Discord servers.</p>
        <div style={{ display: "flex", gap: 12 }}>
          <Link href="/invite"><button>Invite Bots</button></Link>
          <Link href="http://localhost:3001"><button>Open Dashboard</button></Link>
          <Link href="/pricing"><button>Upgrade Plan</button></Link>
        </div>
      </section>

      <section>
        <h2>Bot Cards</h2>
        <div className="grid">
          {addyBots.map((bot) => (
            <article key={bot.key} className="card">
              <h3>{bot.name}</h3>
              <p>{bot.category}</p>
              <span className="badge">{bot.premium ? "Premium" : "Free + Premium"}</span>
              <div style={{ marginTop: 10, display: "flex", gap: 8 }}>
                <Link href={`/bots/${bot.key}`}>Details</Link>
                <Link href="/invite">Invite</Link>
              </div>
            </article>
          ))}
        </div>
      </section>

      <section className="card">
        <h2>Free vs Premium</h2>
        <p>Free: core moderation, welcome, leveling, utility. Premium: AI automation, HQ music, analytics, anti-nuke intelligence.</p>
      </section>

      <section className="card">
        <h2>Feature Comparison</h2>
        <ul>
          <li>Free: Basic command suite, standard support, limited channels.</li>
          <li>Pro: Advanced automod, notify sync acceleration, ticket forms.</li>
          <li>Ultimate: Full suite premium and enterprise tooling.</li>
        </ul>
      </section>

      <section className="card">
        <h2>Trusted by Fast-Growing Communities</h2>
        <p>"Addy helped us automate moderation and support at scale." — Community Ops Lead</p>
      </section>

      <section className="card">
        <h2>FAQ</h2>
        {faqs.map(([q, a]) => (
          <details key={q} style={{ marginBottom: 8 }}>
            <summary>{q}</summary>
            <p>{a}</p>
          </details>
        ))}
      </section>
    </main>
  );
}
