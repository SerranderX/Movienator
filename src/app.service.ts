import { Injectable } from '@nestjs/common';
import {
  ActionRowBuilder,
  CacheType,
  ChatInputCommandInteraction,
  EmbedBuilder,
  ModalBuilder,
  StringSelectMenuBuilder,
  TextInputBuilder,
  TextInputStyle,
} from 'discord.js';
import { UserRepositoryService } from './common/database/respository/user.repository.service';
import { GeneralPullRepositoryService } from './common/database/respository/generalpull.repository.service';
import { MovieRepositoryService } from './common/database/respository/movie.repository.service';
import { movie } from '@prisma/client';
import { randomIntFromInterval } from './common/widget/utils';
import { GPullMovieVoteRepositoryService } from './common/database/respository/gpullmovievote.repository.service';

@Injectable()
export class AppService {
  constructor(
    private readonly userRepositoryService: UserRepositoryService,
    private readonly generalPullRepositoryService: GeneralPullRepositoryService,
    private readonly movieRepositoryService: MovieRepositoryService,
    private readonly gPullMovieVoteRepositoryService: GPullMovieVoteRepositoryService,
  ) {}

  async subscribirse(interaction: ChatInputCommandInteraction<CacheType>) {
    const response = await interaction.reply({
      content:
        'Para subscribirte al grupo de peliculas de la comunidad, debes estar de acuerdo con las siguiente reglas de "Movienator":',
      embeds: [
        {
          title: 'Primer mandamiento',
          color: 1,
          description:
            'Yo me comprometo a respetar la pelicula que salga de manera aleatoria para ver.',
        },
        {
          title: 'Segundo mandamiento',
          color: 2,
          description:
            'Yo no cuestionare que la herramienta de tipo bot llamada "Movienator" este alterada para beneficio de su creador.',
        },
        {
          title: 'Tercer mandamiento',
          color: 3,
          description:
            'Yo no formare conflicto alguno basado en la reproduccion de algun film.',
        },
        {
          title: 'Cuarto mandamiento',
          color: 3,
          description:
            'Yo comprendo que la participacion en esta dinamica es voluntaria.',
        },
        {
          title: 'Quinto mandamiento',
          color: 3,
          description:
            'Yo no formare conflicto si una pelicula que quiera ver, es votada fuera del pull de peliculas en rotación.',
        },
        {
          title: 'Sexto mandamiento',
          color: 3,
          description: 'El metalgogo se la come.',
        },
        {
          title:
            '¿Estas de acuerdo con todos y cada uno de los mandamientos? (En especial el ultimo)',
          color: 3,
          image: {
            url: 'https://i.ytimg.com/vi/Q97j-mSLnZU/maxresdefault.jpg',
            height: 60,
            width: 100,
          },
        },
      ],
      components: [
        {
          type: 1,
          components: [
            {
              type: 2,
              label: 'Si',
              style: 3,
              custom_id: 'agree_terms',
            },
            {
              type: 2,
              label: 'No',
              style: 4,
              custom_id: 'disagree_terms',
            },
          ],
        },
      ],
      ephemeral: false,
    });

    const collectorFilter = (i) => i.user.id === interaction.user.id;

    try {
      const confirmation = await response.awaitMessageComponent({
        filter: collectorFilter,
        time: 60_000,
      });
      if (confirmation.customId === 'agree_terms') {
        const user = await this.userRepositoryService.create({
          name: interaction.member.user.username,
          idDiscord: interaction.member.user.id,
        });

        console.log('usuario creado con exito', user);

        await confirmation.update({
          content: '',
          components: [],
          embeds: [
            {
              title: `¡Bienvenido ${interaction.member.user.username}!`,
              description:
                'Has sido agregado con exito a la lista de participantes de Movienator.',
              image: {
                url: 'https://i.giphy.com/media/v1.Y2lkPTc5MGI3NjExdWhtdDY2ZnhuNnZqZ2tiZXAyeDh1MHFqb3J1enhxYjZrem5tNWhrNiZlcD12MV9pbnRlcm5hbF9naWZfYnlfaWQmY3Q9Zw/147p93s2vFKsQU/giphy.gif',
                width: 100,
                height: 400,
              },
            },
          ],
        });
      } else if (confirmation.customId === 'disagree_terms') {
        await confirmation.update({
          content: '',
          components: [],
          embeds: [
            {
              title: `Que esti bien po`,
              image: {
                url: 'https://media.discordapp.net/attachments/952945895543025694/1306709371006488667/ducreux1.jpg?ex=6742336f&is=6740e1ef&hm=69ae31ebe4f3bbf2ddefdcda68e396464b850673ffd5cff6eecc1b10938b586c&=&format=webp',
                width: 100,
                height: 100,
              },
            },
          ],
        });
      }
    } catch (e) {
      await interaction.editReply({
        content: 'Confirmation not received within 1 minute, cancelling',
        components: [],
      });
    }
  }

  async lista_subscriptores(
    interaction: ChatInputCommandInteraction<CacheType>,
  ) {
    const user = await this.userRepositoryService.findByActiveUsername(
      interaction.member.user.username,
    );

    if (!user)
      throw new Error('Usuario no registrado para ejecutar esta accion');

    const users = await this.userRepositoryService.findAll();

    const fields = users.map((u) => ({
      name: u.name,
      value: u.active ? 'Activo' : 'Inactivo',
      inline: false,
    }));

    await interaction.reply({
      embeds: [
        {
          title: 'Esta es la lista de usuarios subscritos a "Movienator"',
          fields,
        },
      ],
      ephemeral: false,
    });
  }

  async listar_peliculas_rotacion(
    interaction: ChatInputCommandInteraction<CacheType>,
  ) {
    const movies = await this.generalPullRepositoryService.findAll();

    const fields = movies.map((u, idx) => ({
      name: `${idx + 1}. ${u.movie.name}`,
      value: u.movie.watched ? '📗 Vista' : '📘 Pendiente',
      inline: false,
    }));

    await interaction.reply({
      embeds: [
        {
          title:
            '📽 Esta es la lista de peliculas en el pull general de "Movienator" ',
          fields,
        },
      ],
      ephemeral: false,
    });
  }

  async listar_peliculas(interaction: ChatInputCommandInteraction<CacheType>) {
    const movies = await this.movieRepositoryService.findAll();
    let moviesStringList = ``;
    let idxMovie = 1;
    let idxMovieDEC = 1;
    const embeds = [];
    for (const movie of movies) {
      const status = movie.watched ? '📗' : '📘';
      moviesStringList += `${status} ${idxMovie}.  ${movie.name}\n`;
      if (idxMovieDEC == 5 || idxMovie == movies.length) {
        idxMovieDEC = 1;
        embeds.push({ title: moviesStringList });
        moviesStringList = ``;
      } else {
        idxMovieDEC++;
      }
      idxMovie++;
    }

    await interaction.reply({
      content:
        '📽 Esta es la lista de peliculas en el pull general de "Movienator"',
      embeds: embeds,
      ephemeral: false,
    });
  }

  async sortear_pelicula(interaction: ChatInputCommandInteraction<CacheType>) {
    try {
      let sortedAux = false;
      const user = await this.userRepositoryService.findByActiveUsername(
        interaction.member.user.username,
      );

      if (user.name == 'serrander' || user.name == 'edwardscl')
        throw new Error('Usuario no permitido para ejecutar esta accion');

      const moviesGPull = await this.generalPullRepositoryService.findAll();

      let movie;

      while (!sortedAux) {
        const sorted = randomIntFromInterval(0, moviesGPull.length - 1);

        if (moviesGPull[sorted] && moviesGPull[sorted].movie.watched == false) {
          movie = moviesGPull[sorted];
          sortedAux = true;
        }
      }

      if (!movie) throw new Error('Error al intentar elegir la pelicula');

      const gPullVote =
        await this.gPullMovieVoteRepositoryService.findByMovieId(
          movie.movie.id,
        );

      if (!gPullVote) {
        await this.gPullMovieVoteRepositoryService.create({
          id_user: user.id,
          id_movie: movie.movie.id,
          droped: false,
          sorted: true,
          sorted_date: new Date(),
        });
      } else {
        await this.gPullMovieVoteRepositoryService.update(gPullVote.id, {
          id_user: user.id,
          sorted_date: new Date(),
          sorted: true,
        });
      }

      const movieUpt = await this.movieRepositoryService.update(
        movie.movie.id,
        {
          ...movie.movie,
          watched: true,
        },
      );

      if (!movieUpt)
        throw new Error('Error al intentar actualizar la pelicula');

      await interaction.reply({
        content: '🎬 La pelicula seleccionada para el dia de hoy es:',
        embeds: [
          {
            title: `${movie.movie.name}`,
            color: 3,
            image: {
              url: 'https://i.giphy.com/media/v1.Y2lkPTc5MGI3NjExa2V6Mmk0YmJueTYzNmJjNzdlbXVlODNiNHZtczFvZXUycWUwODlhMiZlcD12MV9pbnRlcm5hbF9naWZfYnlfaWQmY3Q9Zw/RrVzUOXldFe8M/giphy.gif',
              width: 100,
              height: 100,
            },
          },
        ],
        ephemeral: false,
      });
    } catch (e) {
      interaction.reply({
        embeds: [
          {
            title: `❌ Ocurrio un problema al intentar sortear la pelicula => ${e.message} `,
            color: 3,
            image: {
              url: 'https://tenor.com/8SKS.gif',
              width: 100,
              height: 100,
            },
          },
        ],
        ephemeral: false,
      });
    }
  }

  async quitar_peliculas_vistas_rotacion(
    interaction: ChatInputCommandInteraction<CacheType>,
  ) {
    try {
      const user = await this.userRepositoryService.findByActiveUsername(
        interaction.member.user.username,
      );

      if (user.name == 'serrander' || user.name == 'edwardscl')
        throw new Error('Usuario no permitido para ejecutar esta accion');

      const movies = await this.generalPullRepositoryService.findAllMovie(true);

      if (movies)
        throw new Error('❌ No existen peliculas vistas en rotación ❌');

      if (movies.length >= 5) {
        for (const movie of movies) {
          await this.generalPullRepositoryService.remove(movie.id);
        }
      } else {
        throw new Error(
          '❌ Las peliculas vistas en rotación deben ser al menos 5 ❌',
        );
      }
    } catch (e) {
      interaction.reply({
        embeds: [
          {
            title: `❌ Ocurrio un problema => ${e.message} `,
            color: 3,
            image: {
              url: 'https://tenor.com/8SKS.gif',
              width: 100,
              height: 100,
            },
          },
        ],
        ephemeral: false,
      });
    }
  }

  async agregar_pelicula(interaction: ChatInputCommandInteraction<CacheType>) {
    try {
      const user = await this.userRepositoryService.findByActiveUsername(
        interaction.member.user.username,
      );

      if (!user)
        throw new Error(
          '❌ Usuario no registrado para ejecutar esta accion ❌',
        );

      const data = interaction.options.data;

      if (data.length == 0 || data[0].name == '')
        throw new Error('La pelicula debe tener nombre');

      const movie = await this.movieRepositoryService.create({
        name: data[0].value.toString(),
      });

      if (movie) {
        await interaction.reply({
          embeds: [
            {
              title: `✅ ¡Se a agregado con exito "${data[0].value.toString()}" a la base de datos de peliculas!`,
              color: 3,
              image: {
                url: 'https://i.giphy.com/media/v1.Y2lkPTc5MGI3NjExb2xobzdwdzN4Z2dqa2w2aTU3b3ZiaTZyNGcxM3B4azZmbWgwa2EwZSZlcD12MV9pbnRlcm5hbF9naWZfYnlfaWQmY3Q9Zw/FjeGBljESVAzu/giphy.gif',
                width: 300,
                height: 300,
              },
            },
          ],
          ephemeral: false,
        });
      }
    } catch (e) {
      interaction.reply({
        embeds: [
          {
            title: `❌ Ocurrio un problema => ${e.message} `,
            color: 3,
            image: {
              url: 'https://tenor.com/8SKS.gif',
              width: 100,
              height: 100,
            },
          },
        ],
        ephemeral: false,
      });
    }
  }

  async agregar_pelicula_rotacion(
    interaction: ChatInputCommandInteraction<CacheType>,
  ) {
    const user = await this.userRepositoryService.findByActiveUsername(
      interaction.member.user.username,
    );

    if (!user)
      throw new Error('❌ Usuario no registrado para ejecutar esta accion ❌');

    //get max movies
    const movies = await this.movieRepositoryService.findAll();
    const maxMovies = movies.length + 1;
    let roll = true;
    let chosenMovie: movie = null;

    // roll random movie between min and max
    while (roll) {
      const randomRoll = randomIntFromInterval(1, maxMovies);

      const movieIdx = movies.findIndex(
        (mov) => !mov.watched && mov.number == BigInt(randomRoll),
      );

      if (movieIdx != -1) {
        chosenMovie = movies[movieIdx];
        roll = false;
      }
    }

    console.log(
      'Se eligio la pelicula : ' +
        chosenMovie.name +
        'para agregar al pull general',
    );

    try {
      const result = await this.generalPullRepositoryService.create({
        id_movie: chosenMovie.id,
      });

      // TODO create row for vote movie

      if (result) {
        interaction.reply({
          embeds: [
            {
              title: `La pelicula "${chosenMovie.name}" Se a agregado al pull general`,
              color: 3,
              image: {
                url: 'https://tenor.com/jn5i8aCfZmo.gif',
                width: 100,
                height: 100,
              },
            },
          ],
          ephemeral: false,
        });
      } else {
        throw new Error(
          'Error al agregar la pelicula sorteada al pull general',
        );
      }
    } catch (e) {
      interaction.reply({
        embeds: [
          {
            title: `❌ Ocurrio un problema => ${e.message} `,
            color: 3,
            image: {
              url: 'https://tenor.com/8SKS.gif',
              width: 100,
              height: 100,
            },
          },
        ],
        ephemeral: false,
      });
    }
  }

  async quitar_pelicula_rotacion(interaction) {
    try {
      const user = await this.userRepositoryService.findByActiveUsername(
        interaction.member.user.username,
      );

      if (!user)
        throw new Error(
          '❌ Usuario no registrado para ejecutar esta accion ❌',
        );

      const movies =
        await this.generalPullRepositoryService.findAllMovie(false);

      if (!movies)
        throw new Error(
          '❌ Error al intentar obtener las peliculas desde la base de datos ❌',
        );

      const moviesOptions = movies.map((movie, idx) => ({
        label: `🟢 ${movie.movie.name}`,
        value: movie.movie.id,
      }));

      const embed = new EmbedBuilder()
        .setTitle('Selecciona la pelicula que deseas quitar del pull general')
        .setColor(0x18e1ee);

      const componentsMenu = new ActionRowBuilder().addComponents(
        new StringSelectMenuBuilder()
          .setCustomId('select')
          .setPlaceholder('Nothing selected')
          .setOptions(moviesOptions),
      );

      // const modal = new ModalBuilder().setCustomId('test').setTitle('test2');

      // const textInput = new TextInputBuilder()
      //   .setCustomId('test3')
      //   .setLabel('test4')
      //   .setRequired(true)
      //   .setStyle(TextInputStyle.Short);

      // const channel = interaction.channel;

      // const variable = new ActionRowBuilder<TextInputBuilder>().addComponents(
      //   textInput,
      // );

      // modal.addComponents(variable);

      const message = await interaction.reply({
        embeds: [embed],
        components: [componentsMenu],
        fetchReply: true,
      });

      const collector = message.createMessageComponentCollector({
        filter: (u) => {
          if (u.values.length > 0) return true;
          else return false;
        },
      });

      const totalMiembros = 0;
      const totalVotos = 0;

      collector.on('collect', async (cld) => {
        if (cld.values.length > 0) {
          // await cld.showModal(modal);
          const itemIdx = moviesOptions.findIndex(
            (itm) => itm.value == cld.values[0].value,
          );

          if (itemIdx == -1) {
            console.log(moviesOptions[itemIdx]);
            interaction.reply({
              embeds: [
                {
                  title: `Se voto con exito para eliminar la pelicula 💀 "${moviesOptions[itemIdx]?.label}" 💀 del pull general.`,
                  color: 3,
                  image: {
                    url: 'https://cdn.discordapp.com/app-icons/1303048668772962396/69a3dd42701e244ecafc2652f22cdd49.png?size=256',
                    width: 100,
                    height: 100,
                  },
                },
                {
                  title: `La votacion para eliminar la pelicula del pull es: ${totalVotos}/${totalMiembros}. La pelicula se quitara cuando supere el 50% de la audiencia.`,
                  color: 3,
                },
              ],
              ephemeral: false,
            });
          } else {
            throw new Error('Error al seleccionar una pelicula de la lista');
          }
        }
      });
    } catch (e) {
      console.log(e);
      interaction.reply({
        embeds: [
          {
            title: `❌ Ocurrio un problema => ${e.message} `,
            color: 3,
            image: {
              url: 'https://tenor.com/8SKS.gif',
              width: 100,
              height: 100,
            },
          },
        ],
        ephemeral: false,
      });
    }
  }
}
