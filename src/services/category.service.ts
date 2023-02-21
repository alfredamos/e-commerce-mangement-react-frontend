import {DataService} from "./data.service";
import {CategoryDto} from "../models/categories/category.model";

class CategoryService extends DataService<CategoryDto> {}

export const categoryService = new CategoryService();
