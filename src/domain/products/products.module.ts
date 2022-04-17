import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';

import { ProductsDao } from './products.dao';
import { Products } from './schemas/products';

@Module({
  imports: [TypeOrmModule.forFeature([Products])],
  providers: [ProductsDao],
  exports: [ProductsDao],
})
export class ProductsModule {}
