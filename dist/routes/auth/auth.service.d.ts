import { JwtService } from '@nestjs/jwt';
import { Users, UsersDao } from '../../domain/users';
export declare class AuthService {
    private readonly usersDao;
    private readonly jwtService;
    constructor(usersDao: UsersDao, jwtService: JwtService);
    validate(email: string, password: string): Promise<Users | null>;
    login(user: any): Promise<{
        token: string;
    }>;
}
