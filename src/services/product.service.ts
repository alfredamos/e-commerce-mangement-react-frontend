import { DataService } from "./data.service";
import {ProductDto} from "../models/products/product.model";

class ProductService extends DataService<ProductDto>{}

export const productService = new ProductService();