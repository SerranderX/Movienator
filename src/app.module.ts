import { Module } from '@nestjs/common';
import { AppService } from './app.service';
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
import { ApplicationCommandOptionType } from 'discord.js';

const commands = [
  {
    name: 'subscribirse',
    description: 'Subscribirse al grupo de peliculas de movienator',
  },
  {
    name: 'lista_subscriptores',
    description: 'Despliega la lista de subscriptores de Movienator',
  },
  {
    name: 'agregar_pelicula_rotacion',
    description:
      'Agrega una pelicula aleatoria desde la base de datos de peliculas disponibles a la rotacion.',
  },
  {
    name: 'listar_peliculas_rotacion',
    description: 'Despliega la lista de peliculas en la rotacion actual',
  },
  {
    name: 'listar_peliculas',
    description:
      'Despliega la lista de peliculas total que contiene Movienator en su base de datos.',
  },
  {
    name: 'sortear_pelicula',
    description: 'Se elegira una pelicula aleatoria del pull general para ver.',
  },
  {
    name: 'quitar_pelicula_rotacion',
    description: 'Votas para eliminar una pelicula en rotacion',
  },
  {
    name: 'agregar_pelicula',
    description: 'Agrega una pelicula a la base de datos de Movienator.',
    options: [
      {
        name: 'agregar_pelicula',
        description: 'The name of your movie',
        type: ApplicationCommandOptionType.String,
        required: true,
      },
    ],
  },
];

@Module({
  imports: [
    LoggerModule,
    EnvironmentModule,
    PrismaModule,
    DiscordBotModule.register(commands, AppService),
  ],
  controllers: [],
  providers: [
    AppService,
    LoggerService,
    UserRepositoryService,
    GeneralPullRepositoryService,
    MovieRepositoryService,
    GPullMovieVoteRepositoryService,
    PrismaService,
  ],
})
export class AppModule {}
