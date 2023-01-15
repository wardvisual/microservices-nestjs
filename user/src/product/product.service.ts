import { Injectable, NotFoundException } from '@nestjs/common';
import { CreateProductDto } from './dto/create-product.dto';
import { UpdateProductDto } from './dto/update-product.dto';
import { Product, ProductDocument } from './entities/product.entity';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';

@Injectable()
export class ProductService {
  constructor(
    @InjectModel(Product.name)
    private productModel: Model<ProductDocument>,
  ) {}

  async create(createProductDto: CreateProductDto): Promise<Product> {
    const product = new this.productModel(createProductDto);

    return product.save();
  }

  async find(): Promise<Product[]> {
    return this.productModel.find().exec();
  }

  async update(id: number, updateProductDto: UpdateProductDto) {
    const product = await this.productModel.findById(id);

    if (!product) {
      throw new NotFoundException(
        `Cannot update product with an ID of ${id} as it was not found.`,
      );
    }

    product.updatedAt = new Date(Date.now());

    return await this.productModel.updateOne({ _id: id }, [
      { $set: updateProductDto },
    ]);
  }
}
