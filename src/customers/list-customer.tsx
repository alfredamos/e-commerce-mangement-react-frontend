
import { Link } from 'react-router-dom';
import {useEffect, useState} from "react";
import { CustomerDto } from '../models/customers/customer.model';
import { DisplayCustomers } from './display-customers';
import { customerService } from '../services/customer.service';
import { useReturnUrl } from '../hooks/use-get-data.hook';

export const ListCustomer = () => {
  const [customers, setCustomers] = useState([] as CustomerDto[]);

  const url = "customers";

  useReturnUrl("/list-customer"); //---> Update the returnUrl;

  useEffect(() => {
    const getCustomers = async () => {
      const customersOutput = await customerService.findAll(url);
      setCustomers(customersOutput);
    };
    getCustomers();
  }, []);

  return (
    <div className="border" style={{ padding: "10px" }}>
      <div className="card">
        <div className="card-header">
          <h4 className="text-center">customer List</h4>
        </div>
        <div className="card-body">
          <table className="table table-striped table-bordered table-responsive">
            <thead>
              <tr>
                <th>Name</th>
                <th>Email</th>
                <th>Phone</th>
                <th>Gender</th>
                <th>Actions</th>
              </tr>
            </thead>
            <tbody>
              {customers.map((customer) => (
                <DisplayCustomers key={customer.id} customer={customer} />
              ))}
            </tbody>
          </table>
        </div>
        <div className="card-footer">
          <Link
            to="/add-customer"
            className="btn btn-outline-secondary form-control"
          >
            Add Customer
          </Link>
        </div>
      </div>
    </div>
  );
}