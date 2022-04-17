import { Module } from '@nestjs/common';

import { ProductsModule } from '../../domain/products';
import { ProductsController } from './products.controller';

@Module({
  imports: [ProductsModule],
  controllers: [ProductsController],
})
export class ProductsRouteModule {}
