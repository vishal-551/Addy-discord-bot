import { spawn } from "node:child_process";
import { ADDY_BOTS } from "@addy/shared";

const key = process.argv[2];
const bot = ADDY_BOTS.find((b) => b.key === key);
if (!bot) {
  console.error(`Bot key required. Available: ${ADDY_BOTS.map((b) => b.key).join(", ")}`);
  process.exit(1);
}

const proc = spawn("pnpm", ["--filter", `@addy/${bot.key}`, "dev"], { stdio: "inherit", shell: true });
proc.on("exit", (code) => process.exit(code ?? 0));
