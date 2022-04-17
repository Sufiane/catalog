import { Repository } from 'typeorm';
import { Products } from './schemas/products';
export declare class ProductsDao {
    private readonly repo;
    constructor(repo: Repository<Products>);
    findAll(authenticated?: boolean): Promise<Products[]>;
    findOne(id: number, authenticated?: boolean): Promise<Products>;
}
