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

@Controller('products')
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

  @Patch(':id/like')
  async like(@Param('id', ParseIntPipe) id: number) {
    return await this.productService.like(id);
  }

  @EventPattern('product_updated')
  async updateOne(product: Product) {
    const _product = await this.productService.updateOne(product.id, product);

    return _product;
  }
}
