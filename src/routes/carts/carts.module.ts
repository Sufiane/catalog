import { Module } from '@nestjs/common';

import { CartedProductsModule } from '../../domain/cartedProducts';
import { CartsController } from './carts.controller';

@Module({
  imports: [CartedProductsModule],
  controllers: [CartsController],
})
export class CartsModule {}
