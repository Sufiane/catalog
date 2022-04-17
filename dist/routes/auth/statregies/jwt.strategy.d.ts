import { Strategy } from 'passport-jwt';
import { UsersDao } from '../../../domain/users';
declare const JwtStrategy_base: new (...args: any[]) => Strategy;
export declare class JwtStrategy extends JwtStrategy_base {
    private readonly usersDao;
    constructor(usersDao: UsersDao);
    validate(payload: {
        id: number;
        email: string;
    }): Promise<{
        id: number;
        userEmail: string;
    }>;
}
export {};
