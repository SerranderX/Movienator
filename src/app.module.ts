import { Module } from '@nestjs/common';
import { ComandService } from './bot/config/comand.service';
import { EnvironmentModule } from './common/config/environment.module';
import { DiscordBotModule } from './bot/discord.bot.module';
import { LoggerModule } from './common/logger/logger.module';
import { PrismaModule } from './common/database/prisma/prisma.module';
import { LoggerService } from './common/logger/logger.service';
import { PrismaService } from './common/database/prisma/prisma.service';
import { discordComands } from './bot/config/comands';

@Module({
  imports: [
    LoggerModule,
    EnvironmentModule,
    PrismaModule,
    DiscordBotModule.register(discordComands, ComandService),
  ],
  controllers: [],
  providers: [ComandService, LoggerService],
})
export class AppModule {}
