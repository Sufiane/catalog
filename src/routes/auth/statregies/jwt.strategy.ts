import { ExtractJwt, Strategy } from 'passport-jwt';
import { PassportStrategy } from '@nestjs/passport';
import { Injectable } from '@nestjs/common';

import { UsersDao } from '../../../domain/users';

@Injectable()
export class JwtStrategy extends PassportStrategy(Strategy, 'jwt') {
  constructor(private readonly usersDao: UsersDao) {
    super({
      jwtFromRequest: ExtractJwt.fromAuthHeaderAsBearerToken(),
      ignoreExpiration: false,
      secretOrKey: 'MYSUPERSECRET', // todo env file
    });
  }

  // todo: here we could set a cache store to store the user and avoid the db call all the time
  async validate(payload: { id: number; email: string }) {
    const user = await this.usersDao.findOneByEmail(payload.email);

    if (!user) {
      return undefined;
    }

    return { id: payload.id, userEmail: payload.email };
  }
}
