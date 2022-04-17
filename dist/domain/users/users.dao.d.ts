import { Repository } from 'typeorm';
import { Users } from './schemas/users';
export declare class UsersDao {
    private readonly repo;
    constructor(repo: Repository<Users>);
    findOneByEmail(email: string): Promise<Users>;
}
