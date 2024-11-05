import {
  ExceptionFilter,
  Catch,
  ArgumentsHost,
  HttpException,
} from '@nestjs/common';
import { Response } from 'express';
import { v4 as uuidv4 } from 'uuid';
import { LoggerService } from '../logger/logger.service';

@Catch(Error, HttpException)
export class AllExceptionsFilter implements ExceptionFilter {
  constructor(private readonly logger: LoggerService) {}

  catch(exception: unknown, host: ArgumentsHost) {
    const ctx = host.switchToHttp();
    const response = ctx.getResponse<Response>();
    const status =
      exception instanceof HttpException ? exception.getStatus() : 500;

    const errorMessage =
      exception instanceof HttpException
        ? this.formatHttpExceptionResponse(exception)
        : this.formatGeneralErrorResponse(exception);

    this.logger.error('Error:', exception as Error);

    response.status(status).json({
      message: errorMessage,
      event_id: uuidv4(),
      data: {},
    });
  }

  private formatHttpExceptionResponse(exception: HttpException): string {
    const response = exception.getResponse();
    return typeof response === 'string'
      ? response
      : (response as any).message || 'An unexpected error occurred';
  }

  private formatGeneralErrorResponse(exception: unknown): string {
    return (
      (exception instanceof Error && exception.message) ||
      'An unexpected error occurred'
    );
  }
}
