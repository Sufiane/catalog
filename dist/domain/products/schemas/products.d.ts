import { CartedProducts } from '../../cartedProducts';
import { Categories } from '../../categories';
export declare class Products {
    id: number;
    label: string;
    description: string;
    price: number;
    thumbnailUrl: string | null;
    visiblePublic: boolean;
    visibleAuthenticated: boolean;
    categoryId: number;
    category: Categories;
    carts?: CartedProducts[];
}
