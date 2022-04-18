import { Strategy } from 'passport-jwt';
import { ConfigService } from '@nestjs/config';
import { UsersDao } from '../../../domain/users';
declare const JwtStrategy_base: new (...args: any[]) => Strategy;
export declare class JwtStrategy extends JwtStrategy_base {
    private readonly usersDao;
    private readonly configService;
    constructor(usersDao: UsersDao, configService: ConfigService<{
        JWT_SECRET: string;
    }, true>);
    validate(payload: {
        id: number;
        email: string;
    }): Promise<{
        id: number;
        userEmail: string;
    }>;
}
export {};
