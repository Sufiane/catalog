import { Strategy } from 'passport-local';
import { AuthService } from '../auth.service';
import { Users } from '../../../domain/users';
declare const LocalStrategy_base: new (...args: any[]) => Strategy;
export declare class LocalStrategy extends LocalStrategy_base {
    private authService;
    constructor(authService: AuthService);
    validate(username: string, password: string): Promise<Users>;
}
export {};