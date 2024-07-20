import {
  Controller,
  Get,
  Post,
  Body,
  Patch,
  Param,
  Delete,
  ParseIntPipe,
  Inject,
} from '@nestjs/common';
import { ProductService } from './product.service';
import { CreateProductDto } from './dto/create-product.dto';
import { UpdateProductDto } from './dto/update-product.dto';
import { Product } from './entities/product.entity';
import { ClientProxy } from '@nestjs/microservices';

@Controller('products')
export class ProductController {
  constructor(
    private readonly productService: ProductService,
    @Inject('USER_SERVICE') private readonly client: ClientProxy,
  ) {}

  @Post()
  async create(@Body() createProductDto: CreateProductDto): Promise<Product> {
    const product = await this.productService.create(createProductDto);

    this.client.emit<Product>('product_created', product);

    return product;
  }

  @Get()
  async find(): Promise<Product[]> {
    return await this.productService.find();
  }

  @Get(':id')
  async findOne(@Param('id', ParseIntPipe) id: number): Promise<Product> {
    return await this.productService.findOne(id);
  }

  @Patch(':id')
  async update(
    @Param('id', ParseIntPipe) id: number,
    @Body() updateProductDto: UpdateProductDto,
  ) {
    const product = await this.productService.update(id, updateProductDto);

    this.client.emit<Product>('product_updated', product);

    return product;
  }

  @Delete(':id')
  async delete(@Param('id', ParseIntPipe) id: number) {
    this.client.emit<Product>('product_deleted', id);

    return await this.productService.delete(id);
  }

  @Patch(':id/like')
  async like(
    @Param('id', ParseIntPipe) id: number,
    @Body() updateProductDto: UpdateProductDto,
  ): Promise<Product> {
    return await this.productService.like(id, updateProductDto);
  }
}
