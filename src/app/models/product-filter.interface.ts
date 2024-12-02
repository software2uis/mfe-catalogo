import { Category } from './product.interface';
export interface ProductFilterDTO{
    query?:string;
    categoryName?: string;
    minPrice?: number;
    maxPrice?: number;
    rating?:number;
    category?: 'Shirts'|'Electronics'|'Accesories'|'Beverages' | '';
}

