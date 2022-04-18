import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';

import { CartedProductsDao } from './cartedProducts.dao';
import { CartedProducts } from './schemas/cartedProducts';

@Module({
  imports: [TypeOrmModule.forFeature([CartedProducts])],
  providers: [CartedProductsDao],
  exports: [CartedProductsDao],
})
export class CartedProductsModule {}
