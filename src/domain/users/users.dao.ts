import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';

import { Users } from './schemas/users';

@Injectable()
export class UsersDao {
  constructor(
    @InjectRepository(Users) private readonly repo: Repository<Users>,
  ) {}

  findOneByEmail(email: string): Promise<Users> {
    return this.repo.findOne({ where: { email } });
  }
}
