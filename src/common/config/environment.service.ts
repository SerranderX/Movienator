import { Injectable } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';
import { Environment } from './types/environment.type';
import { EnvEnum } from './types/enviroment.enum';

@Injectable()
export class EnvironmentService {
  constructor(
    private readonly configService: ConfigService<Environment, true>,
  ) {}

  get<Key extends keyof Environment>(key: Key): Environment[Key] {
    return this.configService.getOrThrow(key);
  }

  isProd(): boolean {
    return this.get(EnvEnum.NODE_ENV) === 'production';
  }
}
