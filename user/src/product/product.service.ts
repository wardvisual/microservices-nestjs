import { Injectable, NotFoundException } from '@nestjs/common';
import { CreateProductDto } from './dto/create-product.dto';
import { UpdateProductDto } from './dto/update-product.dto';
import { Product, ProductDocument } from './entities/product.entity';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { HttpService } from '@nestjs/axios';
import { Response } from 'express';

@Injectable()
export class ProductService {
  private adminURL = `http://localhost:8000/api/product`;

  constructor(
    @InjectModel(Product.name)
    private productModel: Model<ProductDocument>,
    private httpService: HttpService,
  ) {}

  async create(createProductDto: CreateProductDto): Promise<Product> {
    const product = new this.productModel(createProductDto);

    return product.save();
  }

  async find(): Promise<Product[]> {
    return this.productModel.find().exec();
  }

  async findOne(id: number): Promise<Product> {
    const product = await this.productModel.findOne({ id });

    if (!product) {
      throw new NotFoundException(`Product with an ID of ${id} was not found.`);
    }

    return product;
  }

  async like(id: number) {
    const product = await this.findOne(id);

    const likeAdded = product.likes + 1;

    this.httpService
      .patch(`${this.adminURL}/${id}/like`, { likes: likeAdded })
      .subscribe((res) => {
        console.log({ res });
      });

    return await this.updateOne(id, {
      likes: likeAdded,
    });
  }

  async updateOne(id: number, updateProductDto: UpdateProductDto) {
    const product = await this.findOne(id);

    product.updatedAt = new Date(Date.now());

    return await this.productModel.updateOne({ id }, [
      { $set: updateProductDto },
    ]);
  }
}
