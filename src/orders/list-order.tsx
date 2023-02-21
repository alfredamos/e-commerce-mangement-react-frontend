import { useState, useEffect } from "react";
import { OrderDto } from "../models/orders/order.model";
import { DisplayOrders } from "./display-orders";
import { Link } from "react-router-dom";
import { orderService } from "../services/order.service";
import { useReturnUrl } from "../hooks/use-get-data.hook";


export const ListOrder = () => {
  const [orders, setOrders] = useState([] as OrderDto[]);

  const url = "orders";

  useReturnUrl('/'); //---> Update the returnUrl;

  useEffect(() => {
    const getOrders = async () => {
      const ordersOutput = await orderService.findAll(url);
      setOrders(ordersOutput);
    };
    getOrders();
  }, []);

  return (
    <div className="border" style={{ padding: "10px" }}>
      <div className="card">
        <div className="card-header">
          <h4 className="text-center">Order List</h4>
        </div>
        <div className="card-body">
          <table className="table table-striped table-bordered table-responsive">
            <thead>
              <tr>
                <th>Customer</th>
                <th>Product</th>
                <th>Quantity</th>
                <th>Status</th>
                <th>Actions</th>
              </tr>
            </thead>
            <tbody>
              {orders.map((order) => (
                <DisplayOrders key={order.id} order={order} />
              ))}
            </tbody>
          </table>
        </div>
        <div className="card-footer">
          <Link
            to="/add-order"
            className="btn btn-outline-secondary form-control"
          >
            Add order
          </Link>
        </div>
      </div>
    </div>
  );
}