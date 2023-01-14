import { Injectable, NotFoundException } from '@nestjs/common';
import { CreateProductDto } from './dto/create-product.dto';
import { UpdateProductDto } from './dto/update-product.dto';
import { Product } from './entities/product.entity';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';

@Injectable()
export class ProductService {
  constructor(
    @InjectRepository(Product)
    private readonly productRepository: Repository<Product>,
  ) {}

  async create(createProductDto: CreateProductDto): Promise<Product> {
    const product = new Product();

    Object.assign(product, createProductDto);

    this.productRepository.create(product);

    return this.productRepository.save(product);
  }

  async find(): Promise<Product[]> {
    return await this.productRepository.find();
  }

  async findOne(id: number): Promise<Product> {
    const product = await this.productRepository.findOne({ where: { id } });

    if (!product)
      throw new NotFoundException(
        `A product with an ID of ${id} was not found.`,
      );

    return product;
  }

  async update(
    id: number,
    updateProductDto: UpdateProductDto,
  ): Promise<Product> {
    const product = await this.findOne(id);

    if (!product) {
      throw new NotFoundException(
        `Cannot update product with an ID of ${id} as it was not found.`,
      );
    }

    product.updatedAt = new Date(Date.now());

    Object.assign(product, updateProductDto);

    return await this.productRepository.save(product);
  }

  async delete(id: number) {
    const product = await this.findOne(id);

    return this.productRepository.delete(product.id);
  }
}
