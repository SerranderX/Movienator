import { Module } from '@nestjs/common';
import { PrismaService } from './prisma.service';
import { UserRepositoryService } from '../respository/user.repository.service';
import { GeneralPullRepositoryService } from '../respository/generalpull.repository.service';
import { MovieRepositoryService } from '../respository/movie.repository.service';
import { GPullMovieVoteRepositoryService } from '../respository/gpullmovievote.repository.service';
import { PeliculaEventoRepositoryService } from '../respository/peliculaevento.repository.service';
import { EventoRepositoryService } from '../respository/evento.repository.service';
import { LoggerModule } from '../../../common/logger/logger.module';
import { LoggerService } from 'src/common/logger/logger.service';

@Module({
  imports: [LoggerModule],
  providers: [
    PrismaService,
    UserRepositoryService,
    GeneralPullRepositoryService,
    MovieRepositoryService,
    GPullMovieVoteRepositoryService,
    PeliculaEventoRepositoryService,
    EventoRepositoryService,
    LoggerService,
  ],
  exports: [
    PrismaService,
    UserRepositoryService,
    GeneralPullRepositoryService,
    MovieRepositoryService,
    GPullMovieVoteRepositoryService,
    PeliculaEventoRepositoryService,
    EventoRepositoryService,
  ],
})
export class PrismaModule {}
