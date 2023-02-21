import { useState, useEffect } from "react";
import { UpdateProductDto } from "../models/products/update-product.model";
import { ProductForm } from "../forms/products/product.form";
import { useNavigate, useParams } from "react-router-dom";
import { CategoryDto } from "../models/categories/category.model";
import { categoryService } from "../services/category.service";
import { productService } from "../services/product.service";
import { returnUrlRxJs } from "../store/return-url-rxjs.store";
import { useObservable } from "../hooks/use-observable.hook";

const initialProduct: UpdateProductDto = {
  name: "",
  description: "",
  quantity: 0,
  price: 0,
  categoryId: "",
};

export const EditProduct = () => {
  const [product, setProduct] = useState(initialProduct);
  const [categories, setCategories] = useState([] as CategoryDto[]);
  const [isLoading, setIsLoading] = useState(true);

  const returnUrl = useObservable(returnUrlRxJs.data$, "");

  const navigate = useNavigate();
  const { id } = useParams();

  const categoryUrl = "categories";
  const productUrlById = `products/${id}`;

  useEffect(() => {
    const getProductById = async () => {
      const productById = await productService.findOne(productUrlById);
      setProduct(productById);
    };

    getProductById();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  useEffect(() => {
    const getCategories = async () => {
      const allCategories = await categoryService.findAll(categoryUrl);
      setCategories(allCategories);
      setIsLoading(false);
    };

    getCategories();
  }, []);

  const productSubmitHandler = async (productDto: UpdateProductDto) => {
    console.log({ productDto });
    const productOutput = await productService.update(productUrlById, {
      ...productDto,
      price: Number(productDto.price),
      quantity: Number(productDto.quantity),
    });
    console.log({ productOutput });
    setProduct(productOutput);

    navigate("/list-product");
  };

  const backToList = () => {
    const backUrl = returnUrl ? returnUrl : "/list-product";
    returnUrlRxJs.updateData$(`/edit-product/${id}`);
    navigate(backUrl);
  };

  //useReturnUrl(`/edit-product/${id}`); //---> Update the returnUrl;

  return (
    <>
      {!isLoading && (
        <ProductForm
          initialProduct={product}
          categories={categories}
          backToList={backToList}
          onProduct={productSubmitHandler}
          formName="Edit"
        />
      )}
    </>
  );
};
