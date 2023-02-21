import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { AuthUser } from "../models/auth/auth-user.model";
import { DeleteItem } from "../shared/delete-item";
import { AuthUserRxJs } from "../store/auth-rxjs.store";
import { useObservable } from "../hooks/use-observable.hook";
import { LogoutPage } from "../utils/log-out-page.util";
import {returnUrlRxJs} from "../store/return-url-rxjs.store";


export const Logout = () => {
  const authUser = useObservable(AuthUserRxJs.data$, {} as AuthUser);
  const [deleteTitle] = useState("Logout Confirmation!");
  const [deleteMessage] = useState("Do you want to logout?");

  const returnUrl = useObservable(returnUrlRxJs.data$, "");

  //useReturnUrl("/logout"); //---> Update the returnUrl;

  const navigate = useNavigate();

  const logoutHandler = (value: boolean) => {
    if (value) {
      AuthUserRxJs.updateData$({} as AuthUser);
      localStorage.setItem("token", "");
      navigate("/logout-page");
    } else {
      const backUrl = returnUrl ? returnUrl : "";
      returnUrlRxJs.updateData$('/logout');
      navigate(backUrl);
    }
  };

  return (
    <>
      {authUser?.isLoggedIn ? (
        <DeleteItem
          deleteTitle={deleteTitle}
          deleteMessage={deleteMessage}
          deleteItem={logoutHandler}
          cancelButton="Back"
          submitButton="Logout"
        />
      ) : (
        <LogoutPage />
      )}
    </>
  );
};
