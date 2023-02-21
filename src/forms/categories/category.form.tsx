import { useState, FormEvent } from "react";
import { CategoryDto } from "../../models/categories/category.model";


interface CategoryFormProp {
  initialCategory: CategoryDto;
  formName: string;
  onCategory: (categoryDto: CategoryDto) => void;
  backToList: () => void;
}



export const CategoryForm = (categoryFormProp: CategoryFormProp) => {
  const { initialCategory, backToList, onCategory, formName } = categoryFormProp;
  const [category, setCategory] = useState(initialCategory);

  const submitHandler = (event: FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    onCategory(category);
  };

  const inputChangeHandler = (event: FormEvent<HTMLInputElement>) => {
    const { name, value } = event.currentTarget;

    setCategory({ ...category, [name]: value });
  };

  return (
    <div className="border" style={{ padding: "10px" }}>
      <form onSubmit={submitHandler}>
        <div className="card">
          <div className="card-header">
            <h4 className="text-center">Category {formName} Form</h4>
          </div>
          <div className="card-body">
            <div className="mb-3">
              <label htmlFor="name" className="form-label">
                Name
              </label>
              <input
                id="name"
                type="text"
                name="name"
                value={category.name}
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
