import { Injectable, InternalServerErrorException } from '@nestjs/common';
import { PrismaService } from '../prisma/prisma.service';
import { pelicula_evento } from '@prisma/client';

interface UpdatePEventoDTO extends pelicula_evento {}
interface PEventoDTO {
  name: string;
  id_evento: string;
}

@Injectable()
export class PeliculaEventoRepositoryService {
  constructor(private readonly prismaService: PrismaService) {}

  async create(PEventoDTO: PEventoDTO): Promise<pelicula_evento | undefined> {
    try {
      if (!PEventoDTO.id_evento)
        throw new InternalServerErrorException(
          'id_evento not can be null or undefined',
        );
      if (!PEventoDTO.name)
        throw new InternalServerErrorException(
          'name not can be null or undefined',
        );

      const newPEvento = {
        id_evento: PEventoDTO.id_evento,
        name: PEventoDTO.name,
      };
      return await this.prismaService.pelicula_evento.create({
        data: newPEvento,
      });
    } catch (e) {
      console.log(e);
    }
  }

  async findAll() {
    return await this.prismaService.pelicula_evento.findMany({
      include: {
        evento: true,
      },
    });
  }

  async findOne(id: string): Promise<pelicula_evento | null> {
    return await this.prismaService.pelicula_evento.findUnique({
      where: { id: id },
    });
  }

  async findAllByPEvento(id_evento: string): Promise<pelicula_evento[] | null> {
    return await this.prismaService.pelicula_evento.findMany({
      where: { id_evento: id_evento },
    });
  }

  async update(
    id: string,
    updateRouteDto: UpdatePEventoDTO,
  ): Promise<pelicula_evento> {
    try {
      const route: pelicula_evento =
        await this.prismaService.pelicula_evento.findUniqueOrThrow({
          where: {
            id: id,
          },
        });
      if (Object.keys(route).length > 0) {
        return await this.prismaService.pelicula_evento.update({
          where: { id: id },
          data: updateRouteDto,
        });
      }
    } catch (e) {
      console.log(e);
    }
  }

  async remove(id: string): Promise<void> {
    await this.prismaService.pelicula_evento.delete({
      where: { id: id },
    });
  }
}
