import { Status } from "../../enum/status.enum";
import { CustomerDto } from '../customers/customer.model';
import { ProductDto } from "../products/product.model";

export interface OrderDto{
    id?: string;
    customerId: string;
    productId: string;
    status?: Status;
    quantity: number;
    customer?:CustomerDto;
    product?: ProductDto;
}