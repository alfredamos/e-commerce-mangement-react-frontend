import { Link } from "react-router-dom";
import {ProductDto} from "../models/products/product.model";


interface SingleProductProp{
    product: ProductDto;
    deleteClick: () => void;
}


export const SingleProduct = ({product, deleteClick}: SingleProductProp) => {
    return (
        <div className="border" style={{ padding: "10px" }}>
          <div className="card">
            <div className="card-header">
              <h4 className="text-center">product Detail</h4>
            </div>
            <div className="card-body">
              <ul className="list-group">
                <li className="list-group-item">Product  : {product?.name}</li>
                <li className="list-group-item">Category   : {product?.Category?.name}</li>
                <li className="list-group-item">Price   : {product?.price}</li>                
                <li className="list-group-item">Description    : {product?.description}</li>
                <li className="list-group-item">Quantity  : {product?.quantity}</li>
              </ul>
            </div>
            <div className="card-footer">              
              <Link
                to={`/edit-product/${product.id}`}
                className="btn btn-outline-secondary form-control m-1 "
              >
                Edit
                </Link>
              <Link
                to="/list-product"
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