import { ArgumentsHost, HttpException } from '@nestjs/common';
import { Test } from '@nestjs/testing';
import { LoggerService } from '../logger/logger.service';
import { AllExceptionsFilter } from './all-exception.filter';
import { Response } from 'express';

function createMockResponse(): Response {
  const res: any = {
    status: jest.fn().mockReturnThis(),
    json: jest.fn().mockReturnThis(),
  };
  return res as Response;
}

function createMockArgumentsHost(response: Response): ArgumentsHost {
  return {
    switchToHttp: () => ({
      getResponse: () => response,
      getRequest: () => ({}),
    }),
    getType: jest.fn(),
    getArgByIndex: jest.fn(),
    getArgs: jest.fn(),
    getHandler: jest.fn(),
  } as unknown as ArgumentsHost;
}

describe('AllExceptionsFilter', () => {
  let filter: AllExceptionsFilter;
  let response: Response;
  let host: ArgumentsHost;
  let loggerService: LoggerService;

  beforeEach(async () => {
    const module = await Test.createTestingModule({
      providers: [
        AllExceptionsFilter,
        {
          provide: LoggerService,
          useValue: { error: jest.fn() },
        },
      ],
    }).compile();

    loggerService = module.get<LoggerService>(LoggerService);
    filter = new AllExceptionsFilter(loggerService);
    response = createMockResponse();
    host = createMockArgumentsHost(response);
  });

  it('sets status from HttpException', () => {
    const status = 404;
    const exception = new HttpException('Resource not found', status);

    filter.catch(exception, host);

    expect(response.status).toHaveBeenCalledWith(status);
  });

  it('sets JSON response from HttpException', () => {
    const exception = new HttpException('Resource not found', 404);

    filter.catch(exception, host);

    expect(response.json).toHaveBeenCalledWith({
      message: 'Resource not found',
      event_id: expect.any(String),
      data: {},
    });
  });

  it('logs HttpException', () => {
    const exception = new HttpException('Resource not found', 404);

    filter.catch(exception, host);

    expect(loggerService.error).toHaveBeenCalledWith('Error:', exception);
  });

  it('handles non-HttpException as a server error', () => {
    const exception = new Error('Internal server error');

    filter.catch(exception, host);

    expect(response.status).toHaveBeenCalledWith(500);
    expect(response.json).toHaveBeenCalledWith({
      message: 'Internal server error',
      event_id: expect.any(String),
      data: {},
    });
  });

  it('logs non-HttpException errors', () => {
    const exception = new Error('Internal server error');

    filter.catch(exception, host);

    expect(loggerService.error).toHaveBeenCalledWith('Error:', exception);
  });
  it('formats HttpException with string response correctly', () => {
    const exception = new HttpException('Bad Request', 400);
    const result = filter['formatHttpExceptionResponse'](exception);
    expect(result).toEqual('Bad Request');
  });

  it('formats HttpException with object response correctly', () => {
    const response = { statusCode: 400, message: 'Bad Request' };
    const exception = new HttpException(response, 400);
    const result = filter['formatHttpExceptionResponse'](exception);
    expect(result).toEqual('Bad Request');
  });

  it('formats HttpException with no response correctly', () => {
    const response = { statusCode: 400 };
    const exception = new HttpException(response, 400);
    const result = filter['formatHttpExceptionResponse'](exception);
    expect(result).toEqual('An unexpected error occurred');
  });

  it('formats general error response from Error instance correctly', () => {
    const error = new Error('Something failed');
    const result = filter['formatGeneralErrorResponse'](error);
    expect(result).toEqual('Something failed');
  });

  it('formats general error response from non-Error correctly', () => {
    const error = { someProperty: 'Some value' };
    const result = filter['formatGeneralErrorResponse'](error);
    expect(result).toEqual('An unexpected error occurred');
  });
});
