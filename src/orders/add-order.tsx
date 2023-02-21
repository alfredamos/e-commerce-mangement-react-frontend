import { useState, useEffect } from "react";
import { CreateOrderDto } from "../models/orders/create-order.model";
import { OrderForm } from "../forms/orders/order.form";
import { useNavigate } from "react-router-dom";
import { Status } from "../enum/status.enum";
import { CustomerDto } from "../models/customers/customer.model";
import { ProductDto } from "../models/products/product.model";
import { productService } from "../services/product.service";
import { customerService } from "../services/customer.service";
import { orderService } from "../services/order.service";
import { returnUrlRxJs } from "../store/return-url-rxjs.store";
import { useObservable } from "../hooks/use-observable.hook";

const initialOrder: CreateOrderDto = {
  customerId: "",
  productId: "",
  quantity: 0,
  status: Status.PENDING,
};

export const AddOrder = () => {
  const [order, setOrder] = useState(initialOrder);
  const [customers, setCustomers] = useState([] as CustomerDto[]);
  const [products, setProducts] = useState([] as ProductDto[]);
  const [isLoading, setIsLoading] = useState(true);

  const returnUrl = useObservable(returnUrlRxJs.data$, "");

  const navigate = useNavigate();

  const customerUrl = "customers";
  const productUrl = "products";

  const orderUrl = "orders";

  useEffect(() => {
    const getCustomers = async () => {
      const allCustomers = await customerService.findAll(customerUrl);

      setCustomers(allCustomers);
    };
    getCustomers();
  }, []);

  useEffect(() => {
    const getProducts = async () => {
      const allProducts = await productService.findAll(productUrl);

      setProducts(allProducts);
      setIsLoading(false);
    };
    getProducts();
  }, []);

  const orderSubmitHandler = async (orderDto: CreateOrderDto) => {
    const orderOutput = await orderService.create(orderUrl, {
      ...orderDto,
      quantity: Number(orderDto.quantity),
    });
    console.log({ orderOutput });
    setOrder(orderOutput);

    navigate("/");
  };

  const backToList = () => {
    const backUrl = returnUrl ? returnUrl : "/";
    returnUrlRxJs.updateData$("/add-order");
    navigate(backUrl);
  };

  return (
    <>
      {!isLoading && (
        <OrderForm
          initialOrder={order}
          customers={customers}
          products={products}
          backToList={backToList}
          onOrder={orderSubmitHandler}
          formName="Create"
        />
      )}
    </>
  );
};
