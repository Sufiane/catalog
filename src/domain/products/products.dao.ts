import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';

import { Products } from './schemas/products';

@Injectable()
export class ProductsDao {
  constructor(
    @InjectRepository(Products) private readonly repo: Repository<Products>,
  ) {}

  findAll(authenticated = false): Promise<Products[]> {
    return this.repo.find({ where: { visibleAuthenticated: authenticated } });
  }

  findOne(id: number, authenticated = false): Promise<Products> {
    return this.repo.findOne({
      where: { id, visibleAuthenticated: authenticated },
    });
  }
}
