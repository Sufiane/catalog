import { Param, ParseIntPipe } from '@nestjs/common';
import { Controller, Get } from '@nestjs/common';

import { Public } from '../../decorators';
import { Products, ProductsDao } from '../../domain/products';

@Controller('products')
export class ProductsController {
  constructor(private readonly productsDao: ProductsDao) {}

  /*
  REMARKS:
  TO IMPROVE TYPINGS WE COULD ADD A TYPE GUARD TO KNOW WHEN 
  WE RETURN A PRODUCT THAT IS AVAILABLE ONLY FOR AUTHENTICATED USERS OR NOT
   */

  @Public()
  @Get()
  getAllPublic(): Promise<Products[]> {
    return this.productsDao.findAll();
  }

  @Get('/authenticated')
  getAll(): Promise<Products[]> {
    return this.productsDao.findAll(true);
  }

  @Public()
  @Get('/:id')
  findOnePublic(@Param('id', ParseIntPipe) id: number): Promise<Products> {
    return this.productsDao.findOne(id);
  }

  @Get('/:id/authenticated')
  findOne(@Param('id', ParseIntPipe) id: number): Promise<Products> {
    return this.productsDao.findOne(id, true);
  }
}
