import {
  Controller,
  Get,
  Post,
  Body,
  Patch,
  Param,
  Delete,
  ParseIntPipe,
} from '@nestjs/common';
import { ProductService } from './product.service';
import { CreateProductDto } from './dto/create-product.dto';
import { Product } from './entities/product.entity';
import { EventPattern } from '@nestjs/microservices';

@Controller('product')
export class ProductController {
  constructor(private readonly productService: ProductService) {}

  @EventPattern('product_created')
  async create(product: Product): Promise<Product> {
    return await this.productService.create(product);
  }

  @Get()
  async find(): Promise<Product[]> {
    return await this.productService.find();
  }

  @EventPattern('product_updated')
  async update(product: Product) {
    const _product = await this.productService.update(product.id, product);

    return _product;
  }
}
