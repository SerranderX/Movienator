export type Environment = Readonly<{
  NODE_ENV: 'development' | 'production' | 'test';
  PORT: number;
  LOG_LEVEL: string;
  CLIENT_TOKEN: string;
  DISCORD_APP_ID: string;
}>;
