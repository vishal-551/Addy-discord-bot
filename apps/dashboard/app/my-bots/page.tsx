import { addyBots } from "@addy/shared";
export default function MyBots(){return <main className="container"><h1>My Bots</h1><div className="grid">{addyBots.map(b=><div className="card" key={b.key}><h3>{b.name}</h3><p>Status: active</p><p>{b.premium?"Premium available":"Free"}</p></div>)}</div></main>}
