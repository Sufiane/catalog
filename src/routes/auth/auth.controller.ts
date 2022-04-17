import { Controller, Post, UseGuards, Req } from '@nestjs/common';
import { AuthGuard } from '@nestjs/passport';
import { Request } from 'express';

import { AuthService } from './auth.service';
import { Public } from '../../decorators';
import { Users, UsersDao } from '../../domain/users';

@Controller('auth')
export class AuthController {
  constructor(
    private readonly authService: AuthService,
    private readonly usersDao: UsersDao,
  ) {}

  @Public()
  @UseGuards(AuthGuard('local'))
  @Post('/login')
  async login(
    @Req() req: Request & { user: Users },
  ): Promise<{ token: string }> {
    console.log('**** ici ???', req.user);

    return this.authService.login(req.user);
  }
}
