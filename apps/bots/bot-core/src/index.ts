import "dotenv/config";
import { ChatInputCommandInteraction, Client, Collection, Events, GatewayIntentBits, REST, Routes, SlashCommandBuilder } from "discord.js";

export interface BotCommand {
  data: SlashCommandBuilder;
  execute: (interaction: ChatInputCommandInteraction) => Promise<void>;
}

export interface BotRuntimeOptions {
  key: string;
  displayName: string;
  token: string;
  clientId: string;
  guildId?: string;
  commands: BotCommand[];
}

export const createLogger = (key: string) => ({
  info: (msg: string) => console.log(`[${key}] ${msg}`),
  error: (msg: string) => console.error(`[${key}] ${msg}`)
});

export async function registerCommands(clientId: string, token: string, commands: BotCommand[], guildId?: string) {
  const rest = new REST({ version: "10" }).setToken(token);
  const payload = commands.map((c) => c.data.toJSON());
  if (guildId) {
    await rest.put(Routes.applicationGuildCommands(clientId, guildId), { body: payload });
    return;
  }
  await rest.put(Routes.applicationCommands(clientId), { body: payload });
}

export async function startBot(opts: BotRuntimeOptions) {
  const logger = createLogger(opts.key);
  const client = new Client({ intents: [GatewayIntentBits.Guilds, GatewayIntentBits.GuildMessages, GatewayIntentBits.MessageContent] });
  const commandMap = new Collection<string, BotCommand>();
  opts.commands.forEach((cmd) => commandMap.set(cmd.data.name, cmd));

  client.once(Events.ClientReady, async (c) => {
    logger.info(`${opts.displayName} online as ${c.user.tag}`);
    await registerCommands(opts.clientId, opts.token, opts.commands, opts.guildId).catch((e) => logger.error(String(e)));
  });

  client.on(Events.GuildCreate, async (guild) => logger.info(`Joined guild ${guild.name} (${guild.id})`));
  client.on(Events.InteractionCreate, async (interaction) => {
    if (!interaction.isChatInputCommand()) return;
    const command = commandMap.get(interaction.commandName);
    if (!command) return;
    await command.execute(interaction);
  });

  await client.login(opts.token);
}
