import { Injectable } from '@nestjs/common';
import { PrismaService } from '../prisma/prisma.service';
import { user } from '@prisma/client';

interface UpdateUserDTO extends user {}
interface UserDTO {
  name: string;
  idDiscord: string;
}

@Injectable()
export class UserRepositoryService {
  constructor(private readonly prismaService: PrismaService) {}

  async create(userDTO: UserDTO): Promise<user | undefined> {
    try {
      const newUser = {
        name: userDTO.name,
        idDiscord: userDTO.idDiscord,
        createdAt: new Date(),
      };
      return await this.prismaService.user.create({
        data: newUser,
      });
    } catch (e) {
      console.log(e);
    }
  }

  async findAll(): Promise<user[]> {
    return await this.prismaService.user.findMany();
  }

  async findOne(id: string): Promise<user | null> {
    return await this.prismaService.user.findUnique({
      where: { id: id },
    });
  }

  async findByActiveUsername(username: string): Promise<user | null> {
    return await this.prismaService.user.findFirst({
      where: { name: username },
    });
  }

  async update(idDiscord: string, userDto: UpdateUserDTO): Promise<void> {
    try {
      const userItem: user = await this.prismaService.user.findFirstOrThrow({
        where: {
          idDiscord: idDiscord,
        },
      });
      if (Object.keys(userItem).length > 0) {
        await this.prismaService.movie.update({
          where: { id: userItem.id },
          data: userDto,
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
