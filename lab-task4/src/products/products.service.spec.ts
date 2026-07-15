import { NotFoundException } from '@nestjs/common';
import { getRepositoryToken } from '@nestjs/typeorm';
import { Test, TestingModule } from '@nestjs/testing';
import { Repository } from 'typeorm';
import { Products } from './entities/products.entity';
import { ProductsService } from './products.service';

describe('ProductsService', () => {
  let service: ProductsService;
  let repo: jest.Mocked<Partial<Repository<Products>>>;

  const product: Products = {
    id: 1,
    name: 'iPhone 15',
    description: undefined,
    price: 999.99,
    stock: 50,
    category: 'Electronics',
    isActive: true,
    createdAt: new Date('2026-01-01T00:00:00.000Z'),
    updatedAt: new Date('2026-01-01T00:00:00.000Z'),
  };

  beforeEach(async () => {
    repo = {
      create: jest.fn().mockImplementation((dto) => dto as Products),
      save: jest.fn().mockImplementation((entity) => Promise.resolve(entity)),
      find: jest.fn().mockResolvedValue([product]),
      findOne: jest.fn().mockResolvedValue(product),
      update: jest.fn().mockResolvedValue({ affected: 1 }),
      delete: jest.fn().mockResolvedValue({ affected: 1 }),
    };

    const module: TestingModule = await Test.createTestingModule({
      providers: [
        ProductsService,
        {
          provide: getRepositoryToken(Products),
          useValue: repo,
        },
      ],
    }).compile();

    service = module.get<ProductsService>(ProductsService);
  });

  it('should create a product', async () => {
    await expect(
      service.create({
        name: 'iPhone 15',
        price: 999.99,
        stock: 50,
        category: 'Electronics',
      }),
    ).resolves.toEqual({
      message: 'Product created successfully',
      data: {
        name: 'iPhone 15',
        price: 999.99,
        stock: 50,
        category: 'Electronics',
      },
    });
  });

  it('should return products ordered newest first', async () => {
    await expect(service.findAll()).resolves.toEqual({
      message: 'All products fetched successfully',
      count: 1,
      data: [product],
    });

    expect(repo.find).toHaveBeenCalledWith({ order: { createdAt: 'DESC' } });
  });

  it('should throw not found when product is missing', async () => {
    repo.findOne = jest.fn().mockResolvedValue(null);

    await expect(service.findOne(999)).rejects.toBeInstanceOf(
      NotFoundException,
    );
  });
});
