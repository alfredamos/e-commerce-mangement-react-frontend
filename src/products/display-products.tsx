import { Link } from "react-router-dom";
import { ProductDto } from "../models/products/product.model";

interface DisplayProductProp {
  product: ProductDto;
}

/* 
    description: string;   
   
 */
export const DisplayProducts = ({ product }: DisplayProductProp) => {
    
  return (
    <tr>
      <td>
        <Link
          to={`/detail-product/${product.id}`}
          style={{ textDecoration: "none" }}
        >
          {product.name}
        </Link>
      </td>
      <td>{product.Category?.name}</td>
      <td>{product.price}</td>
      <td>{product.quantity}</td>
      <td>{product.description}</td>
      <td>
        <Link
          className="btn btn-outline-warning m-1"
          to={`/edit-product/${product.id}`}
        >
          Edit
        </Link>
        <Link
          className="btn btn-outline-danger m-1"
          to={`/delete-product/${product.id}`}
        >
          Delete
        </Link>
      </td>
    </tr>
  );
};
