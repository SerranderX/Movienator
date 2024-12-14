import { Injectable } from '@nestjs/common';
import { PrismaService } from '../prisma/prisma.service';
import { evento } from '@prisma/client';

interface UpdateEventoDTO extends evento {}
interface EventoDTO {
  name: string;
}

@Injectable()
export class EventoRepositoryService {
  constructor(private readonly prismaService: PrismaService) {}

  async create(movieDTO: EventoDTO): Promise<evento | undefined> {
    try {
      const newMovie = {
        name: movieDTO.name,
      };
      return await this.prismaService.evento.create({
        data: newMovie,
      });
    } catch (e) {
      console.log(e);
    }
  }

  async findAll(): Promise<evento[]> {
    return await this.prismaService.evento.findMany();
  }

  async findOne(id: string): Promise<evento | null> {
    return await this.prismaService.evento.findUnique({
      where: { id: id },
    });
  }

  async update(id: string, eventoDto: UpdateEventoDTO): Promise<evento> {
    try {
      const eventoItem: evento =
        await this.prismaService.evento.findUniqueOrThrow({
          where: {
            id: id,
          },
        });
      if (Object.keys(eventoItem).length > 0) {
        return await this.prismaService.evento.update({
          where: { id: id },
          data: eventoDto,
        });
      }
    } catch (e) {
      console.log(e);
    }
  }

  async remove(id: string): Promise<void> {
    await this.prismaService.evento.delete({
      where: { id: id },
    });
  }
}
