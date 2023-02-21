import { CreateOrderDto } from "../models/orders/create-order.model";
import { useNavigate, useParams } from "react-router-dom";
import { useEffect, useState } from 'react';
import { Status } from "../enum/status.enum";
import { OrderForm } from "../forms/orders/order.form";
import { CustomerDto } from "../models/customers/customer.model";
import { ProductDto } from "../models/products/product.model";
import { customerService } from "../services/customer.service";
import { productService } from "../services/product.service";
import { orderService } from "../services/order.service";
import { returnUrlRxJs } from "../store/return-url-rxjs.store";
import { useObservable } from "../hooks/use-observable.hook";


const initialOrder: CreateOrderDto = {
    customerId: "",
    productId: "",
    quantity: 0,
    status: Status.PENDING,
};

export const EditOrder = () => {
  const [order, setOrder] = useState(initialOrder);
  const [customers, setCustomers] = useState([] as CustomerDto[]);
  const [products, setProducts] = useState([] as ProductDto[]);
  const [isLoading, setIsLoading] = useState(true);

  const returnUrl = useObservable(returnUrlRxJs.data$, "");

  const navigate = useNavigate();
  const { id } = useParams();

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
    };
    getProducts();
  }, []);

  useEffect(() => {
    const getOrderById = async () => {
      const orderById = await orderService.findOne(`${orderUrl}/${id}`);
      setOrder(orderById);
      setIsLoading(false);
    };

    getOrderById();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  const orderSubmitHandler = async (orderDto: CreateOrderDto) => {
    const orderOutput = await orderService.update(orderUrl, {...orderDto,
      quantity: orderDto.quantity});
    console.log({ orderOutput });
    setOrder(orderOutput);

    navigate("/");
  };

  const backToList = () => {
    const backUrl = returnUrl ? returnUrl : "/";
    returnUrlRxJs.updateData$(`/edit-order/${id}`);
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
          formName="Edit"
        />
      )}
    </>
  );
};
