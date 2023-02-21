import { useState, useEffect } from "react";
import { UpdateOrderDto } from "../models/orders/update-order.model";
import { useNavigate, useParams } from "react-router-dom";
import { DeleteItem } from "../shared/delete-item";
import { Status } from "../enum/status.enum";
import { orderService } from "../services/order.service";
import {SingleOrder} from "./single-order";
import { returnUrlRxJs } from "../store/return-url-rxjs.store";
import { useObservable } from "../hooks/use-observable.hook";


const initialOrder: UpdateOrderDto = {
  customerId: "",
  productId: "",
  quantity: 1,
  status: Status.PENDING,
};

export const DeleteOrder = () => {
  const [order, setOrder] = useState(initialOrder);
  const [showDelete, setShowDelete] = useState(false);
  const [deleteTitle, setDeleteTitle] = useState("");
  const [deleteMessage, setDeleteMessage] = useState("");

  const returnUrl = useObservable(returnUrlRxJs.data$, "");

  const { id } = useParams();
  const navigate = useNavigate();

  const orderUrl = "orders";
  const url = `${orderUrl}/${id}`;

  useEffect(() => {
    const getOrderById = async () => {
      const orderById = await orderService.findOne(url);
      setOrder(orderById);
    };

    getOrderById();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  const deleteClick = () => {
    setShowDelete(!showDelete);
    setDeleteMessage(
      `Do you want to delete order belonging to customer : ${order.customer?.name}?`
    );
    setDeleteTitle("Order Delete Confirmation!");
  };

  const deleteOrder = async (value: boolean) => {
    if (value) {
      const deletedOrder = await orderService.delete(url);
      setOrder(deletedOrder);
      navigate("/");
    } else {
      const backUrl = returnUrl ? returnUrl : "/";
      returnUrlRxJs.updateData$(`/delete-order/${id}`)
      navigate(backUrl);
    }
  };


  return (
    <>
      {showDelete ? (
        <DeleteItem
          deleteMessage={deleteMessage}
          deleteTitle={deleteTitle}
          deleteItem={deleteOrder}
          cancelButton="Cancel"
          submitButton="Delete"
        />
      ) : (
        <SingleOrder order={order} deleteClick={deleteClick} />
      )}
    </>
  );
};
