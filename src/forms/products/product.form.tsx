import { useState, FormEvent } from "react";
import { ProductDto } from "../../models/products/product.model";
import { CategoryDto } from '../../models/categories/category.model';


interface ProductFormProp {
  initialProduct: ProductDto;
  categories: CategoryDto[];
  formName: string;
  onProduct: (productDto: ProductDto) => void;
  backToList: () => void;
}



export const ProductForm = (productFormProp: ProductFormProp) => {
  const { initialProduct, categories, backToList, onProduct, formName } = productFormProp;
  const [product, setProduct] = useState(initialProduct);

  const submitHandler = (event: FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    onProduct(product);
  
  };

  const inputChangeHandler = (event: FormEvent<HTMLInputElement>) => {
    const { name, value } = event.currentTarget;

    setProduct({ ...product, [name]: value });
  };
  const textAreaChangeHandler = (event: FormEvent<HTMLTextAreaElement>) => {
    const { name, value } = event.currentTarget;

    setProduct({ ...product, [name]: value });
  };

  const selectChangeHandler = (event: FormEvent<HTMLSelectElement>) => {
    const { name, value } = event.currentTarget;

    setProduct({ ...product, [name]: value });
  };

  return (
    <div className="border" style={{ padding: "10px" }}>
      <form onSubmit={submitHandler}>
        <div className="card">
          <div className="card-header">
            <h4 className="text-center">Product {formName} Form</h4>
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
                value={product.name}
                className="form-control"
                onChange={inputChangeHandler}
              />
            </div>
            <div className="mb-3">
              <label htmlFor="price" className="form-label">
                Price
              </label>
              <input
                id="price"
                type="number"
                name="price"
                value={product.price}
                className="form-control"
                onChange={inputChangeHandler}
              />
            </div>
            <div className="mb-3">
              <label htmlFor="quantity" className="form-label">
                Quantity
              </label>
              <input
                id="quantity"
                type="number"
                name="quantity"
                value={product.quantity}
                className="form-control"
                onChange={inputChangeHandler}
              />
            </div>
            <div className="mb-3">
              <label htmlFor="description" className="form-label">
                Description
              </label>
              <textarea
                id="description"
                name="description"
                value={product.description}
                className="form-control"
                onChange={textAreaChangeHandler}
              ></textarea>
            </div>
            <div className="mb-3">
              <label htmlFor="name" className="form-label">
                Category
              </label>
              <select
                id="categoryId"
                name="categoryId"
                value={product.categoryId}
                className="form-select"
                onChange={selectChangeHandler}
              >
                {categories?.map((category) => (
                  <option key={category.id} value={category.id} id={category.id}>{category.name}</option>
                ))}
              </select>
            </div>
          </div>
          <div className="card-footer">
            <button type="submit" className="btn btn-outline-primary form-control m-1">
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
