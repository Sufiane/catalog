import { ExtractJwt, Strategy } from 'passport-jwt';
import { PassportStrategy } from '@nestjs/passport';
import { Injectable } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';

import { UsersDao } from '../../../domain/users';

@Injectable()
export class JwtStrategy extends PassportStrategy(Strategy, 'jwt') {
  constructor(
    private readonly usersDao: UsersDao,
    private readonly configService: ConfigService<{ JWT_SECRET: string }, true>,
  ) {
    super({
      jwtFromRequest: ExtractJwt.fromAuthHeaderAsBearerToken(),
      ignoreExpiration: false,
      secretOrKey: configService.get('JWT_SECRET'),
    });
  }

  // REMARKS: we could add a cache store, to store db responses to avoid
  // multiple db calls for the same user in a short period of time
  async validate(payload: {
    id: number;
    email: string;
  }): Promise<{ id: number; userEmail: string }> {
    const user = await this.usersDao.findOneByEmail(payload.email);

    if (!user) {
      return undefined;
    }

    return { id: payload.id, userEmail: payload.email };
  }
}
