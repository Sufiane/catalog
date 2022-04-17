import { Request } from 'express';
import { AuthService } from './auth.service';
import { Users, UsersDao } from '../../domain/users';
export declare class AuthController {
    private readonly authService;
    private readonly usersDao;
    constructor(authService: AuthService, usersDao: UsersDao);
    login(req: Request & {
        user: Users;
    }): Promise<{
        token: string;
    }>;
}
