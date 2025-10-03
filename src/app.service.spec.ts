import { Test, TestingModule } from '@nestjs/testing';
import { AppService } from './app.service';

describe('AppService', () => {
  let service: AppService;

  beforeAll(async () => {
    const app: TestingModule = await Test.createTestingModule({
      providers: [AppService],
    }).compile();

    service = app.get<AppService>(AppService);
  });

  describe('getHello', () => {
    it('should return "Hello World! NestJS with Narroved Prisma is running!"', () => {
      expect(service.getHello()).toBe(
        'Hello World! NestJS with Narroved Prisma is running!',
      );
    });
  });

  describe('getHealth', () => {
    it('should return health status with timestamp', () => {
      const result = service.getHealth();

      expect(result).toHaveProperty('status', 'OK');
      expect(result).toHaveProperty('timestamp');
      expect(typeof result.timestamp).toBe('string');

      // Verify timestamp is a valid ISO string
      const date = new Date(result.timestamp);
      expect(date.getTime()).not.toBeNaN();
    });
  });
});
