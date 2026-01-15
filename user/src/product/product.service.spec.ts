import { Test, TestingModule } from '@nestjs/testing';
import { ProductService } from './product.service';
import { getModelToken } from '@nestjs/mongoose';
import { Product } from './entities/product.entity';
import { HttpService } from '@nestjs/axios';

describe('ProductService', () => {
  let service: ProductService;

  const mockProductModel = {
    find: jest.fn(),
    findOne: jest.fn(),
    updateOne: jest.fn(),
    save: jest.fn(),
  };

  const mockHttpService = {
    patch: jest.fn(),
  };

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [
        ProductService,
        {
          provide: getModelToken(Product.name),
          useValue: mockProductModel,
        },
        {
          provide: HttpService,
          useValue: mockHttpService,
        },
      ],
    }).compile();

    service = module.get<ProductService>(ProductService);
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });
});
