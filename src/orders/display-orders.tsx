import { Link } from "react-router-dom";
import { OrderDto } from "../models/orders/order.model";

interface DisplayOrderProp {
  order: OrderDto;
}


export const DisplayOrders = ({ order }: DisplayOrderProp) => {
  return (
    <tr>
      <td>
        <Link
          to={`/detail-order/${order.id}`}
          style={{ textDecoration: "none" }}
        >
          {order.customer?.name}
        </Link>
      </td>
      <td>{order.product?.name}</td>
      <td>{order.quantity}</td>
      <td>{order.status}</td>
      <td>
        <Link
          className="btn btn-outline-warning m-1"
          to={`/edit-order/${order.id}`}
        >
          Edit
        </Link>
        <Link
          className="btn btn-outline-danger m-1"
          to={`/delete-order/${order.id}`}
        >
          Delete
        </Link>
      </td>
    </tr>
  );
};