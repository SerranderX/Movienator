import { Injectable, InternalServerErrorException } from '@nestjs/common';
import { PrismaService } from '../prisma/prisma.service';
import { genre } from '@prisma/client';

interface UpdateGenreDTO extends genre {}
interface GenreDTO {
  description: string;
}

@Injectable()
export class GenreRepositoryService {
  constructor(private readonly prismaService: PrismaService) {}

  async create(genreDTO: GenreDTO): Promise<genre | undefined> {
    try {
      if (!genreDTO.description)
        throw new InternalServerErrorException(
          'description not can be null or undefined',
        );
      const newGenre = {
        description: genreDTO.description,
      };
      return await this.prismaService.genre.create({
        data: newGenre,
      });
    } catch (e) {
      console.log(e);
    }
  }

  async findAll(): Promise<genre[]> {
    return await this.prismaService.genre.findMany();
  }

  async findOne(id: string): Promise<genre | null> {
    return await this.prismaService.genre.findUnique({
      where: { id: id },
    });
  }

  async update(id: string, genreDto: UpdateGenreDTO): Promise<void> {
    try {
      const genreItem: genre = await this.prismaService.genre.findUniqueOrThrow(
        {
          where: {
            id: id,
          },
        },
      );
      if (Object.keys(genreItem).length > 0) {
        await this.prismaService.genre.update({
          where: { id: id },
          data: genreDto,
        });
      }
    } catch (e) {
      console.log(e);
    }
  }

  async remove(id: string): Promise<void> {
    await this.prismaService.genre.delete({
      where: { id: id },
    });
  }
}
