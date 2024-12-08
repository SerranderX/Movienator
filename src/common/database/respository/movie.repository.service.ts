import { Injectable } from '@nestjs/common';
import { PrismaService } from '../prisma/prisma.service';
import { genre, movie } from '@prisma/client';

interface UpdateMovieDTO extends movie {}
interface MovieDTO {
  name: string;
  genre?: genre;
}

@Injectable()
export class MovieRepositoryService {
  constructor(private readonly prismaService: PrismaService) {}

  async create(movieDTO: MovieDTO): Promise<movie | undefined> {
    try {
      const newMovie = {
        name: movieDTO.name,
        watched: false,
        id_genre: movieDTO?.genre?.id ?? null,
        createdAt: new Date(),
      };
      return await this.prismaService.movie.create({
        data: newMovie,
      });
    } catch (e) {
      console.log(e);
    }
  }

  async findAll(): Promise<movie[]> {
    return await this.prismaService.movie.findMany();
  }

  async findOne(id: string): Promise<movie | null> {
    return await this.prismaService.movie.findUnique({
      where: { id: id },
    });
  }

  async update(id: string, movieDto: UpdateMovieDTO): Promise<movie> {
    try {
      const movieItem: movie = await this.prismaService.movie.findUniqueOrThrow(
        {
          where: {
            id: id,
          },
        },
      );
      if (Object.keys(movieItem).length > 0) {
        return await this.prismaService.movie.update({
          where: { id: id },
          data: movieDto,
        });
      }
    } catch (e) {
      console.log(e);
    }
  }

  async remove(id: string): Promise<void> {
    await this.prismaService.movie.delete({
      where: { id: id },
    });
  }
}
