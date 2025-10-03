import { Test, TestingModule } from '@nestjs/testing';
import { INestApplication, ValidationPipe } from '@nestjs/common';
import { DocumentBuilder, SwaggerModule } from '@nestjs/swagger';
import * as request from 'supertest';
import { AppModule } from '../src/app.module';

describe('AppController (e2e)', () => {
  let app: INestApplication;

  beforeEach(async () => {
    const moduleFixture: TestingModule = await Test.createTestingModule({
      imports: [AppModule],
    }).compile();

    app = moduleFixture.createNestApplication();

    // Global prefix (must be set before Swagger)
    app.setGlobalPrefix('api/v1');

    // Apply global validation pipe
    app.useGlobalPipes(
      new ValidationPipe({
        whitelist: true,
        forbidNonWhitelisted: true,
        transform: true,
      }),
    );

    // CORS
    app.enableCors();

    // Swagger API documentation
    const config = new DocumentBuilder()
      .setTitle('NestJS Narroved Prisma API')
      .setDescription('API documentation for NestJS with Narroved Prisma')
      .setVersion('1.0')
      .addBearerAuth()
      .setBasePath('api/v1')
      .build();
    const document = SwaggerModule.createDocument(app, config);
    SwaggerModule.setup('api', app, document);

    await app.init();
  });

  afterEach(async () => {
    await app.close();
  });

  describe('/api/v1/app (GET)', () => {
    it('should return hello message', () => {
      return request(app.getHttpServer())
        .get('/api/v1/app')
        .expect(200)
        .expect('Hello World! NestJS with Narroved Prisma is running!');
    });
  });

  describe('/api/v1/app/health (GET)', () => {
    it('should return health status', () => {
      return request(app.getHttpServer())
        .get('/api/v1/app/health')
        .expect(200)
        .expect((res) => {
          expect(res.body).toHaveProperty('status', 'OK');
          expect(res.body).toHaveProperty('timestamp');
          expect(typeof res.body.timestamp).toBe('string');
        });
    });
  });

  describe('/api (GET)', () => {
    it('should serve Swagger documentation', () => {
      return request(app.getHttpServer())
        .get('/api')
        .expect(200);
    });
  });

  describe('/healthz (GET)', () => {
    it('should return 404 for unknown routes', () => {
      return request(app.getHttpServer()).get('/healthz').expect(404);
    });
  });
});
