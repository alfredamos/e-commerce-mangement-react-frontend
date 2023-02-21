import { useState, useEffect } from "react";
import { ProductDto } from "../models/products/product.model";
import { DisplayProducts } from "./display-products";
import { Link } from "react-router-dom";
import {productService} from "../services/product.service";
import { useReturnUrl } from "../hooks/use-get-data.hook";

export const ListProduct = () => {
  const [products, setProducts] = useState([] as ProductDto[]);

  const url = "products";

  useReturnUrl('/list-product'); //---> Update the returnUrl;

  useEffect(() => {
    const getProducts = async () => {
      const productsOutput = await productService.findAll(url);
      console.log({productsOutput});
      
      setProducts(productsOutput);
    };
    getProducts();
  }, []);

  return (
    <div className="bproduct" style={{ padding: "10px" }}>
      <div className="card">
        <div className="card-header">
          <h4 className="text-center">Product List</h4>
        </div>
        <div className="card-body">
          <table className="table table-striped table-bordered table-responsive">
            <thead>
              <tr>
                <th>Name</th>
                <th>Category</th>
                <th>Price</th>
                <th>Quantity</th>
                <th>Description</th>
                <th>Actions</th>
              </tr>
            </thead>
            <tbody>
              {products.map((product) => (
                <DisplayProducts key={product.id} product={product} />
              ))}
            </tbody>
          </table>
        </div>
        <div className="card-footer">
          <Link
            to="/add-product"
            className="btn btn-outline-secondary form-control"
          >
            Add product
          </Link>
        </div>
      </div>
    </div>
  );
};
