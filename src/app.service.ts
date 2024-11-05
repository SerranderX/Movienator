import { Injectable } from '@nestjs/common';
import { CacheType, ChatInputCommandInteraction } from 'discord.js';

@Injectable()
export class AppService {
  async ping(interaction: ChatInputCommandInteraction<CacheType>) {
    await interaction.reply('Pong!');
  }
}
