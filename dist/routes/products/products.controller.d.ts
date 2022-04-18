import { Products, ProductsDao } from '../../domain/products';
export declare class ProductsController {
    private readonly productsDao;
    constructor(productsDao: ProductsDao);
    getAllPublic(): Promise<Products[]>;
    getAll(): Promise<Products[]>;
    findOnePublic(id: number): Promise<Products>;
    findOne(id: number): Promise<Products>;
}
