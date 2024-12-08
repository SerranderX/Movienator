import { Inject } from '@nestjs/common';
import {
  ApplicationCommandOptionType,
  Client,
  GatewayIntentBits,
  REST,
  Routes,
} from 'discord.js';
import { EnvironmentService } from '../common/config/environment.service';
import { EnvEnum } from '../common/config/types/enviroment.enum';

export type CommandType = {
  name: string;
  description: string;
  options?: {
    name: string;
    description: string;
    type: ApplicationCommandOptionType;
    required: boolean;
  }[];
};

export class BotService {
  rest = new REST({ version: '10' }).setToken(
    this.environmentService.get(EnvEnum.CLIENT_TOKEN),
  );

  constructor(
    private readonly environmentService: EnvironmentService,
    @Inject('DISCORD_COMMANDS') private readonly commands: CommandType[],
    @Inject('FUNCTION_SERVICE') private readonly functions: Record<string, any>,
  ) {}

  async sendMessage(channelId: string, message: string) {
    return await this.rest.post(Routes.channelMessages(channelId), {
      body: {
        content: message,
      },
    });
  }

  async initCommands() {
    try {
      await this.rest.put(
        Routes.applicationCommands(
          this.environmentService.get(EnvEnum.DISCORD_APP_ID),
        ),
        {
          body: this.commands.map((command) => {
            return { ...command, action: undefined };
          }),
        },
      );
      console.log('Comands', this.commands);
      console.log('Successfully reloaded application (/) commands.');
    } catch (error) {
      console.error(error);
    }
  }

  async start() {
    const client = new Client({
      intents: [GatewayIntentBits.Guilds, GatewayIntentBits.GuildMessages],
    });

    client.on('ready', async () => {
      console.log(`Logged in as ${client.user.tag}!`);
    });

    client.on('interactionCreate', async (interaction) => {
      if (!interaction.isChatInputCommand()) return;
      if (
        this.functions &&
        typeof this.functions[interaction.commandName] === 'function'
      )
        this.functions[interaction.commandName](interaction);
      else interaction.reply('Sorry, Command not available right now');
    });

    client.login(this.environmentService.get(EnvEnum.CLIENT_TOKEN));
  }
}
