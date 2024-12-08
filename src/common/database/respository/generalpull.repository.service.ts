import { Injectable, InternalServerErrorException } from '@nestjs/common';
import { PrismaService } from '../prisma/prisma.service';
import { general_pull } from '@prisma/client';

interface UpdateGeneralPullDTO extends general_pull {}
interface GeneralPullDTO {
  id_movie: string;
}

@Injectable()
export class GeneralPullRepositoryService {
  constructor(private readonly prismaService: PrismaService) {}

  async create(
    generalPullDTO: GeneralPullDTO,
  ): Promise<general_pull | undefined> {
    try {
      if (!generalPullDTO.id_movie)
        throw new InternalServerErrorException(
          'id_movie not can be null or undefined',
        );
      const newGeneralPull = {
        id_movie: generalPullDTO.id_movie,
      };
      return await this.prismaService.general_pull.create({
        data: newGeneralPull,
      });
    } catch (e) {
      console.log(e);
    }
  }

  async findAll() {
    return await this.prismaService.general_pull.findMany({
      include: {
        movie: true,
      },
    });
  }

  async findAllMovie(watched?: boolean) {
    if (watched !== null || watched !== undefined) {
      return await this.prismaService.general_pull.findMany({
        include: {
          movie: true,
        },
        where: {
          movie: {
            watched: watched,
          },
        },
      });
    }

    return await this.prismaService.general_pull.findMany({
      include: {
        movie: true,
      },
    });
  }

  async findOne(id: string): Promise<general_pull | null> {
    return await this.prismaService.general_pull.findUnique({
      where: { id: id },
    });
  }

  async update(
    id: string,
    updateRouteDto: UpdateGeneralPullDTO,
  ): Promise<void> {
    try {
      const route: general_pull =
        await this.prismaService.general_pull.findUniqueOrThrow({
          where: {
            id: id,
          },
        });
      if (Object.keys(route).length > 0) {
        await this.prismaService.general_pull.update({
          where: { id: id },
          data: updateRouteDto,
        });
      }
    } catch (e) {
      console.log(e);
    }
  }

  async remove(id: string): Promise<void> {
    await this.prismaService.general_pull.delete({
      where: { id: id },
    });
  }
}
