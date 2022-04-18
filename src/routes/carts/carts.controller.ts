import { Body, Controller, Delete, Get, Post } from '@nestjs/common';

import { User } from '../../decorators';
import { CartedProductsDao } from '../../domain/cartedProducts';
import { AddProductDto } from './dtos/addProduct.dto';
import { RemoveProductDto } from './dtos/removeProduct.dto';

@Controller('carts')
export class CartsController {
  constructor(private readonly cartedProductsDao: CartedProductsDao) {}

  @Get()
  async getUserCart(
    @User() { id: userId }: { id: number; userEmail: string },
  ): Promise<{
    products: {
      label: string;
      thumbnailUrl: string | null;
      quantity: number;
      price: number;
      totalPrice: number;
      category: string;
    }[];
    cartPrice: number;
  }> {
    const cartedProducts = await this.cartedProductsDao.findAllByUserId(userId);

    if (!cartedProducts) {
      return {
        products: [],
        cartPrice: 0,
      };
    }

    return {
      products: cartedProducts.map((cartedProduct) => ({
        label: cartedProduct.product.label,
        thumbnailUrl: cartedProduct.product.thumbnailUrl,
        quantity: cartedProduct.quantity,
        price: cartedProduct.product.price,
        totalPrice: cartedProduct.product.price * cartedProduct.quantity,
        category: cartedProduct.product.category.label,
      })),
      cartPrice: cartedProducts.reduce(
        (acc, cartedProduct) =>
          acc + cartedProduct.product.price * cartedProduct.quantity,
        0,
      ),
    };
  }

  // REMARKS: here we would use this endpoint to add new product or update existing one
  // we could have separate endpoints for each case
  @Post()
  async addProductToCart(
    @User() { id: userId }: { id: number; userEmail: string },
    @Body() body: AddProductDto,
  ): Promise<void> {
    await this.cartedProductsDao.addProduct(
      userId,
      body.productId,
      body.quantity,
    );
  }

  @Delete()
  async removeProductFromCart(
    @User() { userId }: { userId: number; userEmail: string },
    @Body() body: RemoveProductDto,
  ): Promise<void> {
    await this.cartedProductsDao.remove(userId, body.productId);
  }
}
