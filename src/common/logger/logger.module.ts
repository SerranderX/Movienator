import { Module } from '@nestjs/common';
import { LoggerService } from './logger.service';
import { EnvironmentModule } from '../config/environment.module';

@Module({
  imports: [EnvironmentModule],
  providers: [LoggerService],
  exports: [LoggerService],
})
export class LoggerModule {}
