import { useState, FormEvent } from "react";
import { OrderDto } from "../../models/orders/order.model";
import { CustomerDto } from "../../models/customers/customer.model";
import { ProductDto } from "../../models/products/product.model";

interface OrderFormProp {
  initialOrder: OrderDto;
  customers: CustomerDto[];
  products: ProductDto[];
  formName: string;
  onOrder: (orderDto: OrderDto) => void;
  backToList: () => void;
}

export const OrderForm = (orderFormProp: OrderFormProp) => {
  const { initialOrder, customers, products, backToList, onOrder, formName } =
    orderFormProp;
  const [order, setOrder] = useState(initialOrder);
  
  const submitHandler = (event: FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    onOrder(order);
  };

  const selectChangeHandler = (event: FormEvent<HTMLSelectElement>) => {
    const { name, value } = event.currentTarget;

    setOrder({ ...order, [name]: value });
  };
  const inputChangeHandler = (event: FormEvent<HTMLInputElement>) => {
    const { name, value } = event.currentTarget;

    setOrder({ ...order, [name]: value });
  };

  return (
    <div className="border" style={{ padding: "10px" }}>
      <form onSubmit={submitHandler}>
        <div className="card">
          <div className="card-header">
            <h4 className="text-center">Order {formName} Form</h4>
          </div>
          <div className="card-body">
            <div className="mb-3">
              <label htmlFor="customerId" className="form-label">
                Customer
              </label>
              <select
                id="customerId"
                name="customerId"
                value={order.customerId}
                className="form-select"
                onChange={selectChangeHandler}
              >
                <option value="">Please select customer</option>
                {customers.map((customer) => (
                  <option
                    key={customer.id}
                    id={customer.id}
                    value={customer.id}
                  >
                    {customer.name}
                  </option>
                ))}
              </select>
            </div>
            <div className="mb-3">
              <label htmlFor="productId" className="form-label">
                Product
              </label>
              <select
                id="productId"
                name="productId"
                value={order.productId}
                className="form-select"
                onChange={selectChangeHandler}
              >
                <option value="">Please Select Product</option>
                {products.map((product) => (
                  <option key={product.id} id={product.id} value={product.id}>
                    {product.name}
                  </option>
                ))}
              </select>
            </div>
            <div className="mb-3">
              <label htmlFor="quantity" className="form-label">
                Quantity
              </label>
              <input
                id="quantity"
                type="number"
                name="quantity"
                value={order.quantity}
                className="form-control"
                onChange={inputChangeHandler}
              />
            </div>
          </div>
          <div className="card-footer">
            <button
              type="submit"
              className="btn btn-outline-primary form-control m-1"
            >
              Submit
            </button>
            <button
              type="button"
              className="btn btn-outline-secondary form-control m-1"
              onClick={backToList}
            >
              Back
            </button>
          </div>
        </div>
      </form>
    </div>
  );
};
