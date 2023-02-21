import {CategoryDto} from "../models/categories/category.model";
import {Link} from "react-router-dom"

interface SingleCategoryProp{
    category: CategoryDto;
    deleteClick: () => void;
}


export const SingleCategory = ({category, deleteClick}: SingleCategoryProp) => {
    return (
         <div className="border" style={{ padding: "10px" }}>
          <div className="card">
            <div className="card-header">
              <h4 className="text-center">Category Detail</h4>
            </div>
            <div className="card-body">
              <ul className="list-group">
                <li className="list-group-item">Name: {category.name}</li>
              </ul>
            </div>
            <div className="card-footer">
              <Link
                to={`/edit-category/${category.id}`}
                className="btn btn-outline-warning form-control m-1"
              >
                Edit
              </Link>
              <Link
                to="/list-category"
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