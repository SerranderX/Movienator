import { TestBed } from '@automock/jest';
import { EnvironmentService } from './environment.service';
import { ConfigService } from '@nestjs/config';
import { EnvEnum } from './types/enviroment.enum';

describe('ConfigService', () => {
  let service: EnvironmentService;
  let configService: ConfigService;

  beforeEach(async () => {
    const { unit, unitRef } = TestBed.create(EnvironmentService).compile();

    service = unit;
    configService = unitRef.get(ConfigService);
  });

  beforeAll(async () => {
    jest.clearAllMocks();
  });

  describe('get', () => {
    describe('when the variable is defined', () => {
      it('should return the value', () => {
        const value = 'test';
        jest.spyOn(configService, 'getOrThrow').mockReturnValueOnce(value);

        expect(service.get(EnvEnum.NODE_ENV)).toEqual(value);
      });
    });

    describe('when the variable is not defined', () => {
      it('should throw an error', () => {
        jest.spyOn(configService, 'getOrThrow').mockImplementationOnce(() => {
          throw new Error();
        });

        expect(() => service.get(EnvEnum.NODE_ENV)).toThrow();
      });
    });
  });

  describe('isProd', () => {
    describe('when the environment variable is "production"', () => {
      it('should return true', () => {
        jest
          .spyOn(configService, 'getOrThrow')
          .mockReturnValueOnce('production');

        const actual = service.isProd();

        expect(actual).toBe(true);
      });
    });

    describe('when the environment variable is not "production"', () => {
      it('should return false', () => {
        const value = 'development';

        jest.spyOn(configService, 'getOrThrow').mockReturnValueOnce(value);

        const actual = service.isProd();

        expect(actual).toBe(false);
      });
    });
  });
});
