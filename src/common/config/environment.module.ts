import { Global, Module } from '@nestjs/common';
import { ConfigModule } from '@nestjs/config';
import * as Joi from 'joi';
import { Environment } from './types/environment.type';
import { EnvironmentService } from './environment.service';
import { EnvEnum } from './types/enviroment.enum';

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
      }),
    }),
  ],
  providers: [EnvironmentService],
  exports: [EnvironmentService],
})
export class EnvironmentModule {}
