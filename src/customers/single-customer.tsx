import { Link } from "react-router-dom";
import { CustomerDto } from "../models/customers/customer.model";

interface SingleCustomerProp {
  customer: CustomerDto;
  deleteClick: () => void;
}

export const SingleCustomer = ({
  customer,
  deleteClick,
}: SingleCustomerProp) => {
  return (
    <div className="border" style={{ padding: "10px" }}>
      <div className="card">
        <div className="card-header">
          <h4 className="text-center">Customer Detail</h4>
        </div>
        <div className="card-body">
          <ul className="list-group">
            <li className="list-group-item">Name : {customer.name}</li>
            <li className="list-group-item">Email : {customer.email}</li>
            <li className="list-group-item">Phone : {customer.phone}</li>
            <li className="list-group-item">Gender: {customer.gender}</li>
          </ul>
        </div>
        <div className="card-footer">
          <Link
            to="/list-customer"
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
};
