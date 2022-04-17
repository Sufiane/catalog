import { Repository } from 'typeorm';
import { Products } from './schemas/products';
export declare class ProductsDao {
    private readonly repo;
    constructor(repo: Repository<Products>);
    findAll(includePrivate: boolean): Promise<Products[]>;
}
