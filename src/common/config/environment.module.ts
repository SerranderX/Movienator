import { Global, Module } from '@nestjs/common';
import { ConfigModule } from '@nestjs/config';
import * as Joi from 'joi';
import { Environment } from './types/environment.type';
import { EnvironmentService } from './environment.service';
import { EnvEnum } from './types/enviroment.enum';
import { customArrayValidate } from './enviroment.utils';

@Global()
@Module({
  imports: [
    ConfigModule.forRoot({
      cache: true,
      validationSchema: Joi.object<Environment, true>({
        [EnvEnum.NODE_ENV]: Joi.string()
          .valid('development', 'production', 'test')
          .default('development'),
        [EnvEnum.PORT]: Joi.number().default(3000),
        [EnvEnum.LOG_LEVEL]: Joi.string().optional().default('info'),
        [EnvEnum.CLIENT_TOKEN]: Joi.string().required(),
        [EnvEnum.DISCORD_APP_ID]: Joi.string().required(),
        [EnvEnum.DB_TYPE]: Joi.string().required(),
        [EnvEnum.DB_PORT]: Joi.number().required(),
        [EnvEnum.DB_USER]: Joi.string().required(),
        [EnvEnum.DB_PASS]: Joi.string().required(),
        [EnvEnum.DB_NAME]: Joi.string().required(),
        [EnvEnum.DB_HOST]: Joi.string().required(),
        [EnvEnum.DB_SCHEMA]: Joi.string().required(),
        [EnvEnum.DB_SYNCHRONIZE]: Joi.boolean().default(false),
        [EnvEnum.DB_LOGGING]: Joi.boolean().default(true),
        [EnvEnum.DB_LOGGER_LEVEL]: Joi.string()
          .custom(customArrayValidate)
          .required(),
        [EnvEnum.DB_PRISMA_CONNECTION]: Joi.string().optional(),
      }),
    }),
  ],
  providers: [EnvironmentService],
  exports: [EnvironmentService],
})
export class EnvironmentModule {}
