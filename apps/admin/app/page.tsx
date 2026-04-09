import Link from "next/link";
const modules = ["users","guilds","bots","pricing","plans","grants","coupons","payments","invoices","feature-gates","content","docs","faq","secrets","maintenance","broadcast","analytics","abuse"];
export default function AdminHome(){return <main className="container"><h1>Addy Super Admin</h1><p>Owner-only controls for pricing, access, payments, bot secrets, and website content.</p><div className="grid">{modules.map(m=><Link key={m} href={`/${m}`} className="card">{m}</Link>)}</div></main>}
