import {
  general_pull,
  gpull_movie_vote,
  movie,
  PrismaClient,
  user,
} from '@prisma/client';
const prisma = new PrismaClient();

const users: user[] = [
  {
    id: '73d492db-6e6b-42e8-b453-ffb7e6ce303d',
    name: 'serrander',
    idDiscord: '421489243487993858',
    createdAt: new Date(),
    active: true,
  },
  {
    id: '313b6446-2d8d-4d8e-8b8c-895bd8e33e01',
    name: 'miharu',
    idDiscord: '223257019132411904',
    createdAt: new Date(),
    active: true,
  },
  {
    id: '73dae9ae-1fc6-4328-a5ed-f023b8204627',
    name: 'edwardscl',
    idDiscord: '536932144992223232',
    createdAt: new Date(),
    active: true,
  },
];

const movies: movie[] = [
  {
    id: '18274022-54d1-4a5e-ab0b-c7ba98faab0c',
    name: 'Wallace and grommet and the curse of the warerabit',
    createdAt: new Date(),
    watched: false,
    number: BigInt(2),
    id_genre: null,
  },
  {
    id: 'b1298f1c-3b8a-475d-8177-de8e19072da2',
    name: 'A Fantasy vision of the future Wizard',
    createdAt: new Date(),
    watched: false,
    number: BigInt(3),
    id_genre: null,
  },
  {
    id: '33c5e2e0-5b6d-47eb-baed-f3803dd9f304',
    name: 'The Princess Bride',
    createdAt: new Date(),
    watched: false,
    number: BigInt(4),
    id_genre: null,
  },
  {
    id: '3b0acb0a-e1b0-4ca2-bd87-a5c3b07bb018',
    name: 'Everything Everywhere all at once',
    createdAt: new Date(),
    watched: false,
    number: BigInt(5),
    id_genre: null,
  },
  {
    id: '688f0de1-1571-4fc1-ae6a-bb39d1b4a649',
    name: 'Old boy',
    createdAt: new Date(),
    watched: false,
    number: BigInt(6),
    id_genre: null,
  },
  {
    id: '2b0b3801-c40c-4f59-ae71-dcbdc98d116f',
    name: 'Dr. Strangelove',
    createdAt: new Date(),
    watched: false,
    number: BigInt(7),
    id_genre: null,
  },
  {
    id: '742cc3f4-2414-4116-a6ae-755c6b0c933b',
    name: 'Insomnia (2002)',
    createdAt: new Date(),
    watched: false,
    number: BigInt(8),
    id_genre: null,
  },
  {
    id: '54707179-df1d-4431-86e7-27298927160a',
    name: 'Leyenda (2015)',
    createdAt: new Date(),
    watched: false,
    number: BigInt(9),
    id_genre: null,
  },
  {
    id: 'dc553e1e-85b3-4cd0-a927-d6695f767b18',
    name: 'Sin city',
    createdAt: new Date(),
    watched: false,
    number: BigInt(10),
    id_genre: null,
  },
  {
    id: '0661b168-9a97-445d-ae4a-1b7194be13c1',
    name: 'Altered Carbon (Animation)',
    createdAt: new Date(),
    watched: false,
    number: BigInt(11),
    id_genre: null,
  },
  {
    id: 'ca684e14-c695-4d56-aee8-960a97dc7e8a',
    name: 'Monthy Python: And the quest of the Holy Grial',
    createdAt: new Date(),
    watched: false,
    number: BigInt(12),
    id_genre: null,
  },
  {
    id: '204a2f86-84b0-49d4-b10a-c13f893312eb',
    name: 'Lamb',
    createdAt: new Date(),
    watched: false,
    number: BigInt(13),
    id_genre: null,
  },
  {
    id: 'fadf252b-928d-42a9-918c-a30fa96e2967',
    name: 'Vulcano High School',
    createdAt: new Date(),
    watched: false,
    number: BigInt(14),
    id_genre: null,
  },
  {
    id: '4951f206-bd75-4822-aab5-508937ba9d57',
    name: 'Evil dead',
    createdAt: new Date(),
    watched: false,
    number: BigInt(15),
    id_genre: null,
  },
  {
    id: 'b2109f23-769d-4ed9-ab8e-5573786b9f1e',
    name: 'Jacob Ladder',
    createdAt: new Date(),
    watched: false,
    number: BigInt(16),
    id_genre: null,
  },
  {
    id: 'e7a7f4b2-c22b-4c1f-a572-d324e4ad9f69',
    name: 'The Gentlemen (2019)',
    createdAt: new Date(),
    watched: false,
    number: BigInt(17),
    id_genre: null,
  },
  {
    id: '8dd10dd9-3276-43ba-8fb2-1c720fdbfea6',
    name: 'El abogado del diablo',
    createdAt: new Date(),
    watched: false,
    number: BigInt(18),
    id_genre: null,
  },
  {
    id: '186e25cc-ec52-4a72-bef0-805358fbd9fe',
    name: 'El color que cayó del cielo',
    createdAt: new Date(),
    watched: false,
    number: BigInt(19),
    id_genre: null,
  },
  {
    id: '98ba8f03-dd42-4bdc-ac61-c081572bf660',
    name: 'El libro de los muertos',
    createdAt: new Date(),
    watched: false,
    number: BigInt(20),
    id_genre: null,
  },
  {
    id: '28f81e58-4e44-4899-a133-abea119940a3',
    name: 'El gato con botas 2',
    createdAt: new Date(),
    watched: true,
    number: BigInt(21),
    id_genre: null,
  },
  {
    id: '5ba8ccce-e771-4ea3-a813-11fd8fc30b1d',
    name: 'Metropolis',
    createdAt: new Date(),
    watched: false,
    number: BigInt(22),
    id_genre: null,
  },
  {
    id: '8fc0beb6-dee8-4ef5-91cd-31638bcf103d',
    name: 'The Thing',
    createdAt: new Date(),
    watched: false,
    number: BigInt(23),
    id_genre: null,
  },
  {
    id: 'e48199f8-f614-4a15-b170-212c3a079ba0',
    name: 'The Return of the Living dead',
    createdAt: new Date(),
    watched: false,
    number: BigInt(24),
    id_genre: null,
  },
  {
    id: '00511695-c954-4d25-84fd-5748209b3e6f',
    name: 'Claus',
    createdAt: new Date(),
    watched: false,
    number: BigInt(25),
    id_genre: null,
  },
  {
    id: '29e5724d-2f49-4632-b397-524d3b90145e',
    name: 'Rise of the guardians',
    createdAt: new Date(),
    watched: false,
    number: BigInt(26),
    id_genre: null,
  },
  {
    id: 'fcbfc137-e538-486a-bf9e-d64fa3f653e6',
    name: 'Los fantasmas de Scrooge',
    createdAt: new Date(),
    watched: false,
    number: BigInt(27),
    id_genre: null,
  },
  {
    id: '0e9b30d5-b39f-444c-a2c4-0383754b430e',
    name: 'Planet of the Apes',
    createdAt: new Date(),
    watched: true,
    number: BigInt(28),
    id_genre: null,
  },
  {
    id: '48a4a5b2-839a-4ba8-a51c-e1e11b4e0403',
    name: 'Godzilla 2014',
    createdAt: new Date(),
    watched: false,
    number: BigInt(29),
    id_genre: null,
  },
  {
    id: '362a1721-80c6-4228-bf18-0e4ba79eed53',
    name: 'Rango',
    createdAt: new Date(),
    watched: true,
    number: BigInt(1),
    id_genre: null,
  },
];

const gPullMovieVotes: gpull_movie_vote[] = [
  {
    id: 'a08f3c6e-7e84-4e60-ad6c-4e7400e11a33',
    id_user: '73d492db-6e6b-42e8-b453-ffb7e6ce303d',
    droped: false,
    sorted: true,
    sorted_date: new Date('2024-11-23 16:43:19'),
    droped_date: null,
    id_movie: '362a1721-80c6-4228-bf18-0e4ba79eed53',
  },
  {
    id: 'c653e11d-366c-46e2-9b7a-43947cfe44db',
    id_user: '73d492db-6e6b-42e8-b453-ffb7e6ce303d',
    droped: false,
    sorted: true,
    sorted_date: new Date('2024-11-30 20:46:05.621'),
    droped_date: null,
    id_movie: '28f81e58-4e44-4899-a133-abea119940a3',
  },
  {
    id: 'bdb8bcdf-81ae-49ae-bb3c-135961cce9b9',
    id_user: '73d492db-6e6b-42e8-b453-ffb7e6ce303d',
    droped: false,
    sorted: true,
    sorted_date: new Date('2024-12-07 20:29:09.38'),
    droped_date: null,
    id_movie: '0e9b30d5-b39f-444c-a2c4-0383754b430e',
  },
];

const generalPulls: general_pull[] = [
  {
    id: 'b04ad87b-28d0-4122-b23d-d010ff949033',
    id_movie: '48a4a5b2-839a-4ba8-a51c-e1e11b4e0403',
    sorted: null,
    sorted_date: null,
  },
  {
    id: '7e0ceb42-054a-4550-999c-2f2f1b579d3a',
    id_movie: '98ba8f03-dd42-4bdc-ac61-c081572bf660',
    sorted: null,
    sorted_date: null,
  },
  {
    id: '7c93e4ee-1119-40a5-86c8-af4deef35c92',
    id_movie: '742cc3f4-2414-4116-a6ae-755c6b0c933b',
    sorted: null,
    sorted_date: null,
  },
  {
    id: '6b802e11-339a-45f9-bfd2-16e68c856c0a',
    id_movie: '5ba8ccce-e771-4ea3-a813-11fd8fc30b1d',
    sorted: null,
    sorted_date: null,
  },
  {
    id: 'b019ed86-af36-4bd1-88c0-01f7354c1723',
    id_movie: '688f0de1-1571-4fc1-ae6a-bb39d1b4a649',
    sorted: null,
    sorted_date: null,
  },
  {
    id: '5454074d-a345-436a-bbc9-c7d3e151cc71',
    id_movie: '28f81e58-4e44-4899-a133-abea119940a3',
    sorted: true,
    sorted_date: new Date('2024-12-07 17:27:49'),
  },
  {
    id: 'a19483e0-9f2d-4cf2-b640-78f814c50a97',
    id_movie: '2b0b3801-c40c-4f59-ae71-dcbdc98d116f',
    sorted: null,
    sorted_date: null,
  },
  {
    id: '0f43acb4-bcf1-46e8-b3a8-76b0c00f7dad',
    id_movie: '0e9b30d5-b39f-444c-a2c4-0383754b430e',
    sorted: true,
    sorted_date: new Date('2024-12-07 17:31:21'),
  },
  {
    id: '16153bcd-df0f-4a0d-85f6-7feb5351fb5d',
    id_movie: '29e5724d-2f49-4632-b397-524d3b90145e',
    sorted: null,
    sorted_date: null,
  },
  {
    id: '61f08b90-9eec-4519-a3f0-5ba1747e21ba',
    id_movie: '362a1721-80c6-4228-bf18-0e4ba79eed53',
    sorted: true,
    sorted_date: new Date('2024-11-23 22:03:38'),
  },
];

async function main() {
  // Populate users
  for (const user of users) {
    await prisma.user.create({ data: user });
    console.log(`Create the following [user] : ${JSON.stringify(user)}`);
  }
  // Populate movie
  let i = 1;
  for (const movie of movies) {
    console.log('Movie: ' + i);
    await prisma.movie.create({ data: movie });
    // console.log(`Create the following [movie] : ${JSON.stringify(movie)}`);
    i = i + 1;
  }
  // Populate movie
  for (const gPullMovieVote of gPullMovieVotes) {
    await prisma.gpull_movie_vote.create({ data: gPullMovieVote });
    console.log(
      `Create the following [gpull_movie_vote] : ${JSON.stringify(gPullMovieVote)}`,
    );
  }
  // Populate general_pull
  for (const general_pull of generalPulls) {
    await prisma.general_pull.create({ data: general_pull });
    console.log(
      `Create the following [general_pull] : ${JSON.stringify(general_pull)}`,
    );
  }
}
main()
  .then(async () => {
    await prisma.$disconnect();
  })
  .catch(async (e) => {
    console.error(e);
    await prisma.$disconnect();
    process.exit(1);
  });
