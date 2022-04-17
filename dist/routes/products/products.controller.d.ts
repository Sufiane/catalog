import { Products, ProductsDao } from '../../domain/products';
export declare class ProductsController {
    private readonly productsDao;
    constructor(productsDao: ProductsDao);
    findOnePublic(id: number): Promise<Products>;
    findOne(id: number): Promise<Products>;
    getAllPublic(): Promise<Products[]>;
    getAll(): Promise<Products[]>;
}
