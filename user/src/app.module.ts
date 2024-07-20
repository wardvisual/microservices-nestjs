import { Module } from '@nestjs/common';
import { MongooseModule } from '@nestjs/mongoose';
import { ConfigModule } from '@nestjs/config';
import { ProductModule } from './product/product.module';

@Module({
  imports: [
    ConfigModule.forRoot(),
    MongooseModule.forRoot("mongodb://root:password@localhost:3308/admin"),
    ProductModule,
  ],
  controllers: [],
  providers: [],
})
export class AppModule {}
