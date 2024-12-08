import { DynamicModule, Module } from '@nestjs/common';
import { BotController } from './bot.controller';
import { BotService, CommandType } from './bot.service';
import { PrismaService } from '../common/database/prisma/prisma.service';
import { UserRepositoryService } from '../common/database/respository/user.repository.service';
import { GeneralPullRepositoryService } from '../common/database/respository/generalpull.repository.service';
import { MovieRepositoryService } from '../common/database/respository/movie.repository.service';
import { GPullMovieVoteRepositoryService } from '../common/database/respository/gpullmovievote.repository.service';

@Module({
  controllers: [BotController],
})
export class DiscordBotModule {
  static botService: BotService;

  static register(commands: CommandType[], service: any): DynamicModule {
    return {
      module: DiscordBotModule,
      providers: [
        BotService,
        {
          provide: 'DISCORD_COMMANDS',
          useValue: commands,
        },
        {
          provide: 'FUNCTION_SERVICE',
          useClass: service,
        },
        PrismaService,
        UserRepositoryService,
        GeneralPullRepositoryService,
        MovieRepositoryService,
        GPullMovieVoteRepositoryService,
      ],
      exports: [BotService],
    };
  }
}
