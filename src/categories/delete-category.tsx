import { useState, useEffect } from "react";
import { UpdateCategoryDto } from "../models/categories/update-category.model";
import { useNavigate, useParams } from "react-router-dom";
import { DeleteItem } from "../shared/delete-item";
import { categoryService } from "../services/category.service";
import {SingleCategory} from "./single-category";
import {returnUrlRxJs} from "../store/return-url-rxjs.store";
import { useObservable } from "../hooks/use-observable.hook";

const initialCategory: UpdateCategoryDto = {
  name: "",
};

export const DeleteCategory = () => {
  const [category, setCategory] = useState(initialCategory);
  const [showDelete, setShowDelete] = useState(false);
  const [deleteTitle, setDeleteTitle] = useState("");
  const [deleteMessage, setDeleteMessage] = useState("");

  const returnUrl = useObservable(returnUrlRxJs.data$, "");

  const { id } = useParams();
  const navigate = useNavigate();

  const categoryUrl = "categories";
  const url = `${categoryUrl}/${id}`;

  useEffect(() => {
    const getCategoryById = async () => {
      const categoryById = await categoryService.findOne(url);
      setCategory(categoryById);
    };

    getCategoryById();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  const deleteClick = () => {
    setShowDelete(!showDelete);
    setDeleteMessage(`Do you want to delete category : ${category.name}?`);
    setDeleteTitle("Category Delete Confirmation!");
  };

  const deleteCategory = async (value: boolean) => {
    if (value) {
      const deletedCategory = await categoryService.delete(url);
      setCategory(deletedCategory);
      navigate("/list-category");
    } else {
      const backUrl = returnUrl ? returnUrl : "/list-category";
      returnUrlRxJs.updateData$(`/delete-category/${id}`);
      navigate(backUrl);
    }
  };


  return (
    <>
      {showDelete ? (
        <DeleteItem
          deleteMessage={deleteMessage}
          deleteTitle={deleteTitle}
          deleteItem={deleteCategory}
          cancelButton="Cancel"
          submitButton="Delete"
        />
      ) : (
        <SingleCategory category={category} deleteClick={deleteClick} />
      )}
    </>
  );
};
