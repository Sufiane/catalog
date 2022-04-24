import { Injectable } from '@nestjs/common';
import * as crypto from 'crypto';
import { JwtService } from '@nestjs/jwt';

import { Users, UsersDao } from '../../domain/users';

@Injectable()
export class AuthService {
  constructor(
    private readonly usersDao: UsersDao,
    private readonly jwtService: JwtService,
  ) {}

  async validate(email: string, password: string): Promise<Users | null> {
    const user = await this.usersDao.findOneByEmail(email);

    const hashedPassword = crypto
      .createHash('md5')
      .update(password)
      .digest('hex');

    if (!user || user.passwordHash !== hashedPassword) {
      return null;
    }

    return user;
  }

  login(user: any): { token: string } {
    const payload = {
      id: user.id,
      email: user.email,
    };

    return {
      token: this.jwtService.sign(payload),
    };
  }
}
