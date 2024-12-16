import { Injectable, OnModuleInit, OnModuleDestroy } from '@nestjs/common';
import { PrismaClient } from '@prisma/client';
import { EnvironmentService } from '../../config/environment.service';
import { EnvEnum } from '../../config/types/enviroment.enum';
import { LoggerService } from 'src/common/logger/logger.service';

@Injectable()
export class PrismaService
  extends PrismaClient
  implements OnModuleInit, OnModuleDestroy
{
  constructor(
    private readonly environmentService: EnvironmentService,
    private readonly loggerService: LoggerService,
  ) {
    super({
      log: JSON.parse(environmentService.get(EnvEnum.DB_LOGGER_LEVEL)),
      datasources: {
        db: {
          url: `${environmentService.get(
            EnvEnum.DB_TYPE,
          )}://${environmentService.get(
            EnvEnum.DB_USER,
          )}:${environmentService.get(
            EnvEnum.DB_PASS,
          )}@${environmentService.get(
            EnvEnum.DB_HOST,
          )}:${environmentService.get(
            EnvEnum.DB_PORT,
          )}/${environmentService.get(
            EnvEnum.DB_NAME,
          )}?schema=${environmentService.get(EnvEnum.DB_SCHEMA)}`,
        },
      },
    });

    this.loggerService.info(
      `Conexion to database with Prisma: ${this.environmentService.get(EnvEnum.DB_TYPE)}://${this.environmentService.get(
        EnvEnum.DB_USER,
      )}:${this.environmentService.get(EnvEnum.DB_PASS)}@${this.environmentService.get(
        EnvEnum.DB_HOST,
      )}:${this.environmentService.get(EnvEnum.DB_PORT)}/${this.environmentService.get(
        EnvEnum.DB_NAME,
      )}?schema=${this.environmentService.get(EnvEnum.DB_SCHEMA)}`,
    );
  }

  async onModuleInit() {
    await this.$connect();
  }

  async onModuleDestroy(): Promise<void> {
    await this.$disconnect();
  }
}
