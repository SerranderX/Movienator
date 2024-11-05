import { Module } from '@nestjs/common';
import { AppService } from './app.service';
import { EnvironmentModule } from './common/config/environment.module';
import { DiscordBotModule } from './bot/discord.bot.module';
import { LoggerModule } from './common/logger/logger.module';

const commands = [
  {
    name: 'ping',
    description: 'Replies with Pong!',
  },
];

@Module({
  imports: [
    LoggerModule,
    EnvironmentModule,
    DiscordBotModule.register(commands, AppService),
  ],
  controllers: [],
  providers: [AppService],
})
export class AppModule {}
