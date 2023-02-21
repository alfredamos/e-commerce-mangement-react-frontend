import { useState } from 'react';
import { CreateCategoryDto } from '../models/categories/create-category.model';
import { CategoryForm } from '../forms/categories/category.form';
import { useNavigate } from 'react-router-dom';
import { categoryService } from '../services/category.service';
import {returnUrlRxJs} from "../store/return-url-rxjs.store";
import { useObservable } from "../hooks/use-observable.hook";

const initialCategory: CreateCategoryDto = {
    name: "",
}

export const AddCategory = () => {
  const [category, setCategory] = useState(initialCategory);
  const returnUrl = useObservable(returnUrlRxJs.data$, "");

  const navigate = useNavigate();

  const categoryUrl = "categories";


  const categorySubmitHandler = async (categoryDto: CreateCategoryDto) => {
    const categoryOutput = await categoryService.create(
      categoryUrl,
      categoryDto
    );
    console.log({ categoryOutput });
    setCategory(categoryOutput);

    navigate("/list-category");
  };

  const backToList = () => {
    const backUrl = returnUrl ? returnUrl : "/list-category";
    returnUrlRxJs.updateData$('/add-category');
    navigate(backUrl);
  };

  return (
    <CategoryForm
      initialCategory={category}
      backToList={backToList}
      onCategory={categorySubmitHandler}
      formName="Create"
    />
  );
}