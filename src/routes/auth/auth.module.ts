import { Module } from '@nestjs/common';
import { JwtModule } from '@nestjs/jwt';
import { JwtStrategy, LocalStrategy } from './statregies';

import { AuthService } from './auth.service';
import { UsersModule } from '../../domain/users';
import { AuthController } from './auth.controller';

@Module({
  imports: [
    UsersModule,
    JwtModule.register({
      secret: 'MYSUPERSECRET', // todo move to env
      signOptions: { expiresIn: '60d' }, // todo move to env
    }),
  ],
  controllers: [AuthController],
  providers: [AuthService, LocalStrategy, JwtStrategy],
})
export class AuthRouteModule {}
