import { INestApplication, ValidationPipe } from '@nestjs/common';
import { Test, TestingModule } from '@nestjs/testing';
import request from 'supertest';
import { ProductsController } from './../src/products/products.controller';
import { ProductsService } from './../src/products/products.service';

describe('Products routes (e2e)', () => {
  let app: INestApplication;

  const product = {
    id: 1,
    name: 'iPhone 15',
    price: 999.99,
    stock: 50,
    category: 'Electronics',
    isActive: true,
  };

  beforeEach(async () => {
    const moduleFixture: TestingModule = await Test.createTestingModule({
      controllers: [ProductsController],
      providers: [
        {
          provide: ProductsService,
          useValue: {
            create: jest.fn().mockResolvedValue({
              message: 'Product created successfully',
              data: product,
            }),
            findAll: jest.fn().mockResolvedValue({
              message: 'All products fetched successfully',
              count: 1,
              data: [product],
            }),
            search: jest.fn().mockResolvedValue({
              message: 'Products searched successfully',
              count: 1,
              data: [product],
            }),
            findByCategory: jest.fn().mockResolvedValue({
              message: 'Products fetched by category successfully',
              count: 1,
              data: [product],
            }),
            findOne: jest.fn().mockResolvedValue({
              message: 'Product fetched successfully',
              data: product,
            }),
            update: jest.fn().mockResolvedValue({
              message: 'Product updated successfully',
              data: product,
            }),
            replace: jest.fn().mockResolvedValue({
              message: 'Product replaced successfully',
              data: product,
            }),
            remove: jest.fn().mockResolvedValue({
              message: 'Product deleted successfully',
              id: 1,
            }),
            toggleActive: jest.fn().mockResolvedValue({
              message: 'Product active status toggled successfully',
              data: { ...product, isActive: false },
            }),
          },
        },
      ],
    }).compile();

    app = moduleFixture.createNestApplication();
    app.useGlobalPipes(
      new ValidationPipe({
        whitelist: true,
        forbidNonWhitelisted: true,
        transform: true,
      }),
    );
    await app.init();
  });

  afterEach(async () => {
    await app.close();
  });

  it('/products (POST)', () => {
    return request(app.getHttpServer())
      .post('/products')
      .send({
        name: 'iPhone 15',
        price: 999.99,
        stock: 50,
        category: 'Electronics',
      })
      .expect(201);
  });

  it('/products (POST) rejects invalid body', () => {
    return request(app.getHttpServer())
      .post('/products')
      .send({ price: -5, extra: 'bad' })
      .expect(400);
  });

  it('/products (GET)', () => {
    return request(app.getHttpServer()).get('/products').expect(200);
  });

  it('/products/search?keyword=phone (GET)', () => {
    return request(app.getHttpServer())
      .get('/products/search?keyword=phone')
      .expect(200);
  });

  it('/products/category/Electronics (GET)', () => {
    return request(app.getHttpServer())
      .get('/products/category/Electronics')
      .expect(200);
  });

  it('/products/1 (GET)', () => {
    return request(app.getHttpServer()).get('/products/1').expect(200);
  });

  it('/products/1 (PATCH)', () => {
    return request(app.getHttpServer())
      .patch('/products/1')
      .send({ price: 899.99, stock: 45 })
      .expect(200);
  });

  it('/products/1 (PUT)', () => {
    return request(app.getHttpServer())
      .put('/products/1')
      .send({
        name: 'iPhone 15 Pro',
        price: 1099.99,
        stock: 30,
        category: 'Electronics',
      })
      .expect(200);
  });

  it('/products/1/toggle (PATCH)', () => {
    return request(app.getHttpServer()).patch('/products/1/toggle').expect(200);
  });

  it('/products/1 (DELETE)', () => {
    return request(app.getHttpServer()).delete('/products/1').expect(200);
  });
});
