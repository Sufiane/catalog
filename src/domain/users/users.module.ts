import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';

import { Users } from './schemas/users';
import { UsersDao } from './users.dao';

@Module({
  imports: [TypeOrmModule.forFeature([Users])],
  providers: [UsersDao],
  exports: [UsersDao],
})
export class UsersModule {}
