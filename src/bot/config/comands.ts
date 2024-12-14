import { ApplicationCommandOptionType } from 'discord.js';

export const discordComands = [
  {
    name: 'suscribirse',
    description: 'Suscribirse al grupo de peliculas de movienator',
  },
  {
    name: 'desuscribirse',
    description: 'Desuscribe al usuario al grupo de peliculas de movienator',
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
    name: 'sortear_pelicula_evento',
    description:
      'Se elegira una pelicula aleatoria del evento seleccionada para ver.',
  },
  {
    name: 'quitar_pelicula_rotacion',
    description: 'Votas para eliminar una pelicula en rotacion',
  },
  {
    name: 'listar_peliculas_evento',
    description: 'Listar peliculas de un evento en especifico',
  },
  {
    name: 'agregar_pelicula',
    description: 'Agrega una pelicula a la base de datos de Movienator.',
    options: [
      {
        name: 'agregar_pelicula',
        description: 'El nombre de tu pelicula',
        type: ApplicationCommandOptionType.String,
        required: true,
      },
    ],
  },
  {
    name: 'agregar_evento',
    description: 'Crea una categoria de evento.',
    options: [
      {
        name: 'agregar_evento',
        description: 'El nombre de tu evento',
        type: ApplicationCommandOptionType.String,
        required: true,
      },
    ],
  },
  {
    name: 'agregar_pelicula_evento',
    description: 'Agrega una pelicula de tipo evento.',
    options: [
      {
        name: 'agregar_pelicula_evento',
        description: 'El nombre de tu pelicula',
        type: ApplicationCommandOptionType.String,
        required: true,
      },
    ],
  },
];
