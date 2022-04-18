import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { DeleteResult, Repository } from 'typeorm';
import { Categories } from '../categories';
import { Products } from '../products';

import { CartedProducts } from './schemas/cartedProducts';

@Injectable()
export class CartedProductsDao {
  constructor(
    @InjectRepository(CartedProducts)
    private readonly repo: Repository<CartedProducts>,
  ) {}

  findAllByUserId(userId: number) {
    return this.repo.find({
      where: { userId },
      join: {
        alias: 'cartedProducts',
        innerJoinAndSelect: {
          product: 'cartedProducts.product',
          category: 'product.category',
        },
      },
    });
  }

  addProduct(
    userId: number,
    productId: number,
    quantity = 1,
  ): Promise<CartedProducts> {
    if (quantity < 1) {
      throw new Error('Quantity must be greater than 0');
    }

    return this.repo.save({
      userId,
      productId,
      quantity,
    });
  }

  remove(userId: number, productId: number): Promise<DeleteResult> {
    return this.repo.delete({
      userId,
      productId,
    });
  }
}
