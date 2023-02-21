import { useState, useEffect } from "react";
import { CreateProductDto } from "../models/products/create-product.model";
import { ProductForm } from "../forms/products/product.form";
import { useNavigate } from "react-router-dom";
import { CategoryDto } from "../models/categories/category.model";
import {categoryService} from "../services/category.service";
import {productService} from "../services/product.service";
import { returnUrlRxJs } from "../store/return-url-rxjs.store";
import { useObservable } from "../hooks/use-observable.hook";


const initialProduct: CreateProductDto = {
  name: "",
  description: "",
  quantity: 0,
  price: 0,
  categoryId: "",
};

export const AddProduct = () => {
  const [product, setProduct] = useState(initialProduct);
  const [categories, setCategories] = useState([] as CategoryDto[]);
  const [isLoading, setIsLoading] = useState(true);

  const returnUrl = useObservable(returnUrlRxJs.data$, "");

  const navigate = useNavigate();

  const productUrl = "products";
  const categoryUrl = "categories";

  useEffect(() => {
    const getCategories = async () => {
      const allCategories = await categoryService.findAll(categoryUrl);
      setCategories(allCategories);
      setIsLoading(false);
    };

    getCategories();
  }, []);

  const productSubmitHandler = async (productDto: CreateProductDto) => {
    console.log({productDto});
    const productOutput = await productService.create(productUrl, {
      ...productDto, price: Number(productDto.price),  quantity: Number(productDto.quantity)});
    console.log({ productOutput });
    setProduct(productOutput);

    navigate("/list-product");
  };

  const backToList = () => {
    const backUrl = returnUrl ? returnUrl : "/list-product";
    returnUrlRxJs.updateData$('/add-product');
    navigate(backUrl);
  };

  return (
    <>
      {!isLoading && (
        <ProductForm
          initialProduct={product}
          categories={categories}
          backToList={backToList}
          onProduct={productSubmitHandler}
          formName="Create"
        />
      )}
    </>
  );
};
