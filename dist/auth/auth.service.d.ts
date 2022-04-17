import { Users, UsersDao } from '../domain/users';
import { JwtService } from '@nestjs/jwt';
export declare class AuthService {
    private readonly usersDao;
    private readonly jwtService;
    constructor(usersDao: UsersDao, jwtService: JwtService);
    validate(email: string, pass: string): Promise<Users | null>;
    login(user: any): Promise<{
        token: string;
    }>;
}
