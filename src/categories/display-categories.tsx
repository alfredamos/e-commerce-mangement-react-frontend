import { Link } from "react-router-dom";
import { CategoryDto } from "../models/categories/category.model";

interface DisplayCategoryProp {
  category: CategoryDto;
}

export const DisplayCategories = ({ category }: DisplayCategoryProp) => {
  return (
    <tr>
      <td>
      <Link
        to={`/detail-category/${category.id}`}
        style={{ textDecoration: "none" }}
      >
        {category.name}
      </Link>
      </td>
      <td>
        <Link
          className="btn btn-outline-warning m-1"
          to={`/edit-category/${category.id}`}
        >
          Edit
        </Link>
        <Link
          className="btn btn-outline-danger m-1"
          to={`/delete-category/${category.id}`}
        >
          Delete
        </Link>
      </td>
    </tr>
  );
};
