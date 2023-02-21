import { useState, useEffect } from "react";
import { UpdateCustomerDto } from "../models/customers/update-customer.model";
import { useNavigate, useParams } from "react-router-dom";
import { DeleteItem } from "../shared/delete-item";
import { Gender } from "../enum/gender.enum";
import { customerService } from "../services/customer.service";
import {SingleCustomer} from "./single-customer";
import { returnUrlRxJs } from "../store/return-url-rxjs.store";
import { useObservable } from "../hooks/use-observable.hook";
import { useReturnUrl } from '../hooks/use-get-data.hook';

const initialCustomer: UpdateCustomerDto = {
  name: "",
  email: "",
  phone: "",
  gender: Gender.Male,
};

export const DetailCustomer = () => {
  const [customer, setCustomer] = useState(initialCustomer);
  const [showDelete, setShowDelete] = useState(false);
  const [deleteTitle, setDeleteTitle] = useState("");
  const [deleteMessage, setDeleteMessage] = useState("");

  const returnUrl = useObservable(returnUrlRxJs.data$, "");

  const { id } = useParams();
  const navigate = useNavigate();

  const customerUrl = "customers";
  const url = `${customerUrl}/${id}`;

  useEffect(() => {
    const getCustomerById = async () => {
      const customerById = await customerService.findOne(url);
      setCustomer(customerById);
    };

    getCustomerById();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  const deleteClick = () => {
    setShowDelete(!showDelete);
    setDeleteMessage(`Do you want to delete customer : ${customer.name}?`);
    setDeleteTitle("Customer Delete Confirmation!");
  };

  const deleteCustomer = async (value: boolean) => {
    if (value) {
      const deletedCustomer = await customerService.delete(url);
      setCustomer(deletedCustomer);
      navigate("/list-customer");
    } else {
      const backUrl = returnUrl ? returnUrl : "/list-customer";
      navigate(backUrl);
    }
  };

  useReturnUrl(`/detail-customer/${id}`); //---> Update the returnUrl;
  return (
    <>
      {showDelete ? (
        <DeleteItem
          deleteMessage={deleteMessage}
          deleteTitle={deleteTitle}
          deleteItem={deleteCustomer}
          cancelButton="Cancel"
          submitButton="Delete"
        />
      ) : (
        <SingleCustomer customer={customer} deleteClick={deleteClick} />
      )}
    </>
  );
};
