import { Test, TestingModule } from '@nestjs/testing';
import { AppController } from './app.controller';
import { AppService } from './app.service';

describe('AppController', () => {
  let appController: AppController;
  let appService: AppService;

  beforeEach(async () => {
    const app: TestingModule = await Test.createTestingModule({
      controllers: [AppController],
      providers: [
        {
          provide: AppService,
          useValue: {
            getHello: jest.fn(),
            getHealth: jest.fn(),
          },
        },
      ],
    }).compile();

    appController = app.get<AppController>(AppController);
    appService = app.get<AppService>(AppService);
  });

  describe('getHello', () => {
    it('should return welcome message', () => {
      const result = 'Hello World! NestJS with Narroved Prisma is running!';

      jest.spyOn(appService, 'getHello').mockReturnValue(result);

      expect(appController.getHello()).toBe(result);
      expect(appService.getHello).toHaveBeenCalled();
    });
  });

  describe('getHealth', () => {
    it('should return health status', () => {
      const mockHealth = {
        status: 'OK',
        timestamp: '2023-12-01T10:00:00.000Z',
      };

      jest.spyOn(appService, 'getHealth').mockReturnValue(mockHealth);

      const result = appController.getHealth();

      expect(result).toEqual(mockHealth);
      expect(appService.getHealth).toHaveBeenCalled();
    });
  });
});
