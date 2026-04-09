import dotenv from "dotenv";

dotenv.config();

export const env = {
  port: Number(process.env.API_PORT ?? 4000),
  jwtSecret: process.env.JWT_SECRET ?? "dev-secret",
  discordClientId: process.env.DISCORD_CLIENT_ID ?? "",
  discordRedirectUri: process.env.DISCORD_REDIRECT_URI ?? ""
};
