import { Link } from "react-router-dom";
import {OrderDto} from "../models/orders/order.model";


interface SingleOrderProp{
    order: OrderDto;
    deleteClick: ()=> void;
}


export const SingleOrder = ({order, deleteClick}: SingleOrderProp) => {
    return (
        <div className="border" style={{ padding: "10px" }}>
          <div className="card">
            <div className="card-header">
              <h4 className="text-center">order Detail</h4>
            </div>
            <div className="card-body">
              <ul className="list-group">
                <li className="list-group-item">Customer  : {order?.customer?.name}</li>
                <li className="list-group-item">Product   : {order?.product?.name}</li>
                <li className="list-group-item">Status    : {order?.status}</li>
                <li className="list-group-item">Quantity  : {order?.quantity}</li>
              </ul>
            </div>
            <div className="card-footer">              
              <Link
                to={`/edit-order/${order.id}`}
                className="btn btn-outline-warning form-control m-1 "
              >
                Edit
              </Link>
              <Link
                to="/"
                className="btn btn-outline-secondary form-control m-1 "
              >
                Back
              </Link>
              <button
                className="btn btn-outline-danger form-control m-1"
                onClick={deleteClick}
              >
                Delete
              </button>
            </div>
            </div>
            </div>
    );
}