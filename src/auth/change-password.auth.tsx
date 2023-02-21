import { ChangePasswordForm } from "../forms/auth/change-password.form";
import { ChangePasswordDto } from "../models/auth/change-password.model";
import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { AuthUser } from "../models/auth/auth-user.model";
import { authService } from "../services/auth.service";
//import { useReturnUrl } from "../hooks/use-get-data.hook";
import { useObservable } from "../hooks/use-observable.hook";
import { returnUrlRxJs } from "../store/return-url-rxjs.store";

const initialAuthUser: ChangePasswordDto = {
  email: "",
  oldPassword: "",
  newPassword: "",
  confirmPassword: "",
};

export const ChangePassword = () => {
  const [authUser] = useState(initialAuthUser);
  const returnUrl = useObservable(returnUrlRxJs.data$, "");

  const navigate = useNavigate();

  const url = "auth/edit-profile";

  //useReturnUrl("/change-password"); //---> Update the returnUrl;

  const changePasswordSubmitHandler = async (
    changePasswordDto: ChangePasswordDto
  ) => {
    console.log({ changePasswordDto });
    const authUserResponse = (await authService.update(
      url,
      changePasswordDto
    )) as AuthUser;
    console.log({ authUserResponse });
    navigate("/");
  };

  const backToList = () => {
    const backUrl = returnUrl ? returnUrl : "/";
    returnUrlRxJs.updateData$('/change-password');
    navigate(backUrl);
  };

  return (
    <ChangePasswordForm
      initialAuthUser={authUser}
      backToList={backToList}
      onChangePassword={changePasswordSubmitHandler}
    />
  );
};
