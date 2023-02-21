import { useState, useEffect } from "react";
import { UpdateCategoryDto } from "../models/categories/update-category.model";
import { CategoryForm } from "../forms/categories/category.form";
import { useNavigate, useParams } from "react-router-dom";
import { categoryService } from "../services/category.service";
import { returnUrlRxJs } from "../store/return-url-rxjs.store";
import { useObservable } from "../hooks/use-observable.hook";

const initialCategory: UpdateCategoryDto = {
  name: "",
};

export const EditCategory = () => {
  const [category, setCategory] = useState(initialCategory);
  const [isLoading, setIsLoading] = useState(true);

  const returnUrl = useObservable(returnUrlRxJs.data$, "");

  const navigate = useNavigate();
  const { id } = useParams();

  const categoryUrl = "categories";

  useEffect(() => {
    const getCategoryById = async () => {
      const categoryById = await categoryService.findOne(
        `${categoryUrl}/${id}`
      );
      setCategory(categoryById);
      setIsLoading(false);
    };

    getCategoryById();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  const categorySubmitHandler = async (categoryDto: UpdateCategoryDto) => {
    const categoryOutput = await categoryService.update(
      `${categoryUrl}/${id}`,
      categoryDto
    );
    console.log({ categoryOutput });
    setCategory(categoryOutput);

    navigate("/list-category");
  };

  const backToList = () => {
    console.log("returnUrl : ", returnUrl);
    const backUrl = returnUrl ? returnUrl : "/list-category";
    returnUrlRxJs.updateData$(`/edit-category/${id}`);
    console.log("backUrl : ", backUrl);
    navigate(backUrl);
  };


  return (
    <>
      {!isLoading && (
        <CategoryForm
          initialCategory={category}
          backToList={backToList}
          onCategory={categorySubmitHandler}
          formName="Edit"
        />
      )}
    </>
  );
};
