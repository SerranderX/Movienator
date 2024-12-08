import { ENUM_DB_LOGGER_LEVEL } from '../../../common/enum/common.enum';
import { EnvEnum } from './enviroment.enum';

export type Environment = Readonly<{
  [EnvEnum.NODE_ENV]: 'development' | 'production' | 'test';
  [EnvEnum.PORT]: number;
  [EnvEnum.LOG_LEVEL]: string;
  [EnvEnum.CLIENT_TOKEN]: string;
  [EnvEnum.DISCORD_APP_ID]: string;
  [EnvEnum.DB_TYPE]: string;
  [EnvEnum.DB_PORT]: number;
  [EnvEnum.DB_USER]: string;
  [EnvEnum.DB_PASS]: string;
  [EnvEnum.DB_NAME]: string;
  [EnvEnum.DB_HOST]: string;
  [EnvEnum.DB_SCHEMA]: string;
  [EnvEnum.DB_SYNCHRONIZE]: boolean;
  [EnvEnum.DB_LOGGING]: boolean;
  [EnvEnum.DB_LOGGER_LEVEL]: ENUM_DB_LOGGER_LEVEL;
  [EnvEnum.DB_PRISMA_CONNECTION]: string;
}>;
