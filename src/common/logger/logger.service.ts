import { Injectable } from '@nestjs/common';
import { createLogger, format } from 'winston';
import { Console } from 'winston/lib/winston/transports';
import { utilities as nestWinstonModuleUtilities } from 'nest-winston';
import { EnvironmentService } from '../config/environment.service';

@Injectable()
export class LoggerService {
  private logger: any;

  constructor(private readonly environmentService: EnvironmentService) {
    const consoleTransport = new Console({
      format: format.combine(
        format.timestamp(),
        format.ms(),
        nestWinstonModuleUtilities.format.nestLike(
          'v' + process.env.npm_package_version,
          {
            prettyPrint: true,
          },
        ),
      ),
    });
    this.logger = createLogger({
      level: 'info',
      transports: [consoleTransport],
    });
  }

  info(message: string) {
    this.logger.info(message);
  }

  error(message: any, exception: Error) {
    this.logger.error(message, this.buildMessage(exception));
  }

  warn(message: any) {
    this.logger.warn(message);
  }

  debug(message: any) {
    this.logger.debug(message);
  }

  verbose(message: any) {
    this.logger.verbose(message);
  }

  private buildMessage(exception: Error): any {
    return {
      message: exception.message,
      stack: exception.stack,
    };
  }
}
