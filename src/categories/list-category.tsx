import { useState, useEffect } from "react";
import { CategoryDto } from "../models/categories/category.model";
import { DisplayCategories } from "./display-categories";
import { Link, Outlet } from "react-router-dom";
import { categoryService } from "../services/category.service";
import { useReturnUrl } from "../hooks/use-get-data.hook";


export const ListCategory = () => {
  const [categories, setCategories] = useState([] as CategoryDto[]);

  const url = "categories";

  useReturnUrl("/list-category"); //---> Update the returnUrl;

  useEffect(() => {
    const getCategories = async () => {
      const categoriesOutput = await categoryService.findAll(url);
      setCategories(categoriesOutput);
    };
    getCategories();
  }, []);

  return (
    <>
      <div className="border" style={{ padding: "10px" }}>
        <div className="card">
          <div className="card-header">
            <h4 className="text-center">Category List</h4>
          </div>
          <div className="card-body">
            <table className="table table-striped table-bordered table-responsive">
              <thead>
                <tr>
                  <th>Name</th>
                  <th>Actions</th>
                </tr>
              </thead>
              <tbody>
                {categories.map((category) => (
                  <DisplayCategories key={category.id} category={category} />
                ))}
              </tbody>
            </table>
          </div>
          <div className="card-footer">
            <Link
              to="/add-category"
              className="btn btn-outline-secondary form-control"
            >
              Add category
            </Link>
          </div>
        </div>
      </div>
      <Outlet />
    </>
  );
};
