import { useState, useEffect } from "react";
import { UpdateProductDto } from "../models/products/update-product.model";
import { useNavigate, useParams } from "react-router-dom";
import { DeleteItem } from "../shared/delete-item";
import {productService} from "../services/product.service";
import {SingleProduct} from "./single-product";
import { returnUrlRxJs } from "../store/return-url-rxjs.store";
import { useObservable } from "../hooks/use-observable.hook";


const initialProduct: UpdateProductDto = {
  name: "",
  categoryId: "",
  description: "",
  quantity: 1,
  price: 0,
};


export const DeleteProduct = () => {
  const [product, setProduct] = useState(initialProduct);
  const [showDelete, setShowDelete] = useState(false);
  const [deleteTitle, setDeleteTitle] = useState("");
  const [deleteMessage, setDeleteMessage] = useState("");

  const returnUrl = useObservable(returnUrlRxJs.data$, "");

  const { id } = useParams();
  const navigate = useNavigate();

  const productUrl = "products";
  const url = `${productUrl}/${id}`;

  useEffect(() => {
    const getProductById = async () => {
      const productById = await productService.findOne(url);
      setProduct(productById);
    };

    getProductById();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  const deleteClick = () => {
    setShowDelete(!showDelete);
    setDeleteMessage(`Do you want to delete product : ${product.name}?`);
    setDeleteTitle("Product Delete Confirmation!");
  };

  const deleteProduct = async (value: boolean) => {
    if (value) {
      const deletedProduct = await productService.delete(url);
      setProduct(deletedProduct);
      navigate("/list-product");
    } else {
      const backUrl = returnUrl ? returnUrl : "/list-product";
      returnUrlRxJs.updateData$(`/delete-product/${id}`);
      navigate(backUrl);
    }
  };


  return (
    <>
      {showDelete ? (
        <DeleteItem
          deleteMessage={deleteMessage}
          deleteTitle={deleteTitle}
          deleteItem={deleteProduct}
          cancelButton="Cancel"
          submitButton="Delete"
        />
      ) : (
        <SingleProduct product={product} deleteClick={deleteClick} />
      )}
    </>
  );
};
