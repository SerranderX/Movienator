import { Test } from '@nestjs/testing';
import { LoggerService } from './logger.service';
import { EnvironmentService } from '../config/environment.service';
import * as winston from 'winston';

jest.mock('winston', () => {
  const mLogger = {
    info: jest.fn(),
    error: jest.fn(),
    warn: jest.fn(),
    debug: jest.fn(),
    verbose: jest.fn(),
  };
  return {
    createLogger: jest.fn(() => mLogger),
    format: {
      combine: jest.fn(),
      timestamp: jest.fn(),
      ms: jest.fn(),
      printf: jest.fn(),
    },
    transports: {
      Console: jest.fn(),
    },
  };
});

describe('LoggerService', () => {
  let loggerService: LoggerService;
  let mockLogger: winston.Logger;

  beforeEach(async () => {
    mockLogger = winston.createLogger();
    const module = await Test.createTestingModule({
      providers: [
        LoggerService,
        {
          provide: EnvironmentService,
          useValue: { get: jest.fn().mockReturnValue('debug') },
        },
      ],
    }).compile();

    loggerService = module.get<LoggerService>(LoggerService);
  });

  it('should log info messages', () => {
    const message = 'Test info message';
    loggerService.info(message);
    expect(mockLogger.info).toHaveBeenCalledWith(message);
  });

  it('should log error messages with exception details', () => {
    const message = 'Test error';
    const error = new Error('Test error detail');
    loggerService.error(message, error);
    expect(mockLogger.error).toHaveBeenCalledWith(message, {
      message: error.message,
      stack: error.stack,
    });
  });

  it('should log warnings', () => {
    const message = 'Test warning';
    loggerService.warn(message);
    expect(mockLogger.warn).toHaveBeenCalledWith(message);
  });

  it('should log debug messages', () => {
    const message = 'Test debug';
    loggerService.debug(message);
    expect(mockLogger.debug).toHaveBeenCalledWith(message);
  });

  it('should log verbose messages', () => {
    const message = 'Test verbose';
    loggerService.verbose(message);
    expect(mockLogger.verbose).toHaveBeenCalledWith(message);
  });
});
