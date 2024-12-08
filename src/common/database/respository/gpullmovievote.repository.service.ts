import { Injectable } from '@nestjs/common';
import { PrismaService } from '../prisma/prisma.service';
import { gpull_movie_vote } from '@prisma/client';

interface UpdateGpullMovieVoteDTO {
  id_user: string;
  droped?: boolean;
  sorted?: boolean;
  droped_date?: Date;
  sorted_date?: Date;
}
interface GpullMovieVoteDTO {
  id_movie: string;
  id_user: string;
  droped?: boolean;
  sorted?: boolean;
  droped_date?: Date;
  sorted_date?: Date;
}

@Injectable()
export class GPullMovieVoteRepositoryService {
  constructor(private readonly prismaService: PrismaService) {}

  async create(
    gpullMovieVoteDTO: GpullMovieVoteDTO,
  ): Promise<gpull_movie_vote | undefined> {
    try {
      const newGpullMovieVote = {
        id_movie: gpullMovieVoteDTO.id_movie,
        id_user: gpullMovieVoteDTO.id_user,
        droped: gpullMovieVoteDTO.droped ?? false,
        sorted: gpullMovieVoteDTO.sorted ?? false,
        sorted_date: gpullMovieVoteDTO.sorted ? new Date() : null,
        droped_date: gpullMovieVoteDTO.droped ? new Date() : null,
      };
      return await this.prismaService.gpull_movie_vote.create({
        data: newGpullMovieVote,
      });
    } catch (e) {
      console.log(e);
    }
  }

  async findAll(): Promise<gpull_movie_vote[]> {
    return await this.prismaService.gpull_movie_vote.findMany();
  }

  async findOne(id: string): Promise<gpull_movie_vote | null> {
    return await this.prismaService.gpull_movie_vote.findUnique({
      where: { id: id },
    });
  }

  async findByMovieId(id: string): Promise<gpull_movie_vote | null> {
    return await this.prismaService.gpull_movie_vote.findFirst({
      where: { movie: { id: id } },
    });
  }

  async update(
    id: string,
    gpull_movie_vote: UpdateGpullMovieVoteDTO,
  ): Promise<void> {
    try {
      const gpullMovieVoteItem: gpull_movie_vote =
        await this.prismaService.gpull_movie_vote.findUniqueOrThrow({
          where: {
            id: id,
          },
        });
      if (Object.keys(gpullMovieVoteItem).length > 0) {
        let update = { ...gpull_movie_vote };
        if (gpull_movie_vote.droped !== gpullMovieVoteItem.droped)
          update = { ...update, droped_date: new Date() };

        if (gpull_movie_vote.sorted !== gpullMovieVoteItem.sorted)
          update = { ...update, sorted_date: new Date() };

        await this.prismaService.gpull_movie_vote.update({
          where: { id: id },
          data: update,
        });
      }
    } catch (e) {
      console.log(e);
    }
  }

  async remove(id: string): Promise<void> {
    await this.prismaService.gpull_movie_vote.delete({
      where: { id: id },
    });
  }
}
