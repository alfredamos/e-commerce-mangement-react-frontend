import { SignupForm } from "../forms/auth/signup.form";
import { SignupDto } from "../models/auth/signup.model";
import { useState } from "react";
import { AuthUser } from "../models/auth/auth-user.model";
import { Gender } from "../enum/gender.enum";
import { UserType } from "../enum/user-type.enum";
import { useNavigate } from "react-router-dom";
import { authService } from "../services/auth.service";
import {returnUrlRxJs} from "../store/return-url-rxjs.store";
import { useObservable } from "../hooks/use-observable.hook";


const initialAuthUser: SignupDto = {
  name: "",
  email: "",
  phone: "",
  gender: Gender.None,
  userType: UserType.Customer,
  password: "",
  confirmPassword: "",
};

export const Signup = () => {
  const [authUser] = useState(initialAuthUser);

  const returnUrl = useObservable(returnUrlRxJs.data$, "");

  const navigate = useNavigate();

  const url = "auth/signup";

  //useReturnUrl("/signup"); //---> Update the returnUrl;

  const signupSubmitHandler = async (signupDto: SignupDto) => {
    console.log({ signupDto });
    const authUserResponse = (await authService.create(
      url,
      signupDto
    )) as AuthUser;
    console.log({ authUserResponse });

    navigate("/");
  };

  const backToList = () => {
    const backUrl = returnUrl ? returnUrl : "";
    returnUrlRxJs.updateData$('/signup');
    navigate(backUrl);
  };

  return (
    <SignupForm
      initialAuthUser={authUser}
      backToList={backToList}
      onSignup={signupSubmitHandler}
    />
  );
};
