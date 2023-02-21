import { CategoryDto } from '../categories/category.model';
export interface ProductDto{
    id?: string;
    name: string;
    quantity: number;
    description: string;
    price: number;
    categoryId: string;
    Category?: CategoryDto;
}