import { Module } from '@nestjs/common';
import { ComandService } from './bot/config/comand.service';
import { EnvironmentModule } from './common/config/environment.module';
import { DiscordBotModule } from './bot/discord.bot.module';
import { LoggerModule } from './common/logger/logger.module';
import { PrismaModule } from './common/database/prisma/prisma.module';
import { LoggerService } from './common/logger/logger.service';
import { UserRepositoryService } from './common/database/respository/user.repository.service';
import { PrismaService } from './common/database/prisma/prisma.service';
import { GeneralPullRepositoryService } from './common/database/respository/generalpull.repository.service';
import { MovieRepositoryService } from './common/database/respository/movie.repository.service';
import { GPullMovieVoteRepositoryService } from './common/database/respository/gpullmovievote.repository.service';
import { discordComands } from './bot/config/comands';
import { PeliculaEventoRepositoryService } from './common/database/respository/peliculaevento.repository.service';
import { EventoRepositoryService } from './common/database/respository/evento.repository.service';

@Module({
  imports: [
    LoggerModule,
    EnvironmentModule,
    PrismaModule,
    DiscordBotModule.register(discordComands, ComandService),
  ],
  controllers: [],
  providers: [
    ComandService,
    LoggerService,
    UserRepositoryService,
    GeneralPullRepositoryService,
    MovieRepositoryService,
    GPullMovieVoteRepositoryService,
    PeliculaEventoRepositoryService,
    EventoRepositoryService,
    PrismaService,
  ],
})
export class AppModule {}
