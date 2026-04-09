import { Client, Collection, GatewayIntentBits, REST, Routes, SlashCommandBuilder } from "discord.js";

export interface AddyCommand {
  data: SlashCommandBuilder;
  execute: (ctx: { interaction: any; client: Client }) => Promise<void>;
}

export interface BotModule {
  botKey: string;
  token: string;
  clientId: string;
  commands: AddyCommand[];
  onReady?: (client: Client) => Promise<void>;
  onMessage?: (client: Client, message: any) => Promise<void>;
}

export async function runBot(module: BotModule): Promise<void> {
  const client = new Client({ intents: [GatewayIntentBits.Guilds, GatewayIntentBits.GuildMessages, GatewayIntentBits.MessageContent, GatewayIntentBits.GuildVoiceStates, GatewayIntentBits.GuildMembers] });
  const commands = new Collection<string, AddyCommand>();
  module.commands.forEach((command) => commands.set(command.data.name, command));

  client.once("ready", async () => {
    const rest = new REST({ version: "10" }).setToken(module.token);
    await rest.put(Routes.applicationCommands(module.clientId), { body: module.commands.map((c) => c.data.toJSON()) });
    if (module.onReady) await module.onReady(client);
    console.log(`${module.botKey} ready as ${client.user?.tag}`);
  });

  client.on("interactionCreate", async (interaction) => {
    if (!interaction.isChatInputCommand()) return;
    const command = commands.get(interaction.commandName);
    if (command) await command.execute({ interaction, client });
  });

  client.on("messageCreate", async (message) => {
    if (!module.onMessage) return;
    await module.onMessage(client, message);
  });

  await client.login(module.token);
}
