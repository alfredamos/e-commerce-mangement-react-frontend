import { useNavigate } from "react-router-dom";
import { LoginForm } from "../forms/auth/login.form";
import { AuthUser } from "../models/auth/auth-user.model";
import { LoginDto } from "../models/auth/login.model";
import {AuthUserRxJs} from "../store/auth-rxjs.store";
import { authService } from "../services/auth.service";
import { useState} from "react";
import {useObservable} from "../hooks/use-observable.hook";
import {returnUrlRxJs} from "../store/return-url-rxjs.store";


const  initialAuthUser:LoginDto =  {
  email: "",
  password: ""
}


export const Login = () => {
  const [authUser] = useState(initialAuthUser);
  const returnUrl = useObservable(returnUrlRxJs.data$, "");

  const navigate = useNavigate();

  const url = "auth/login";

  //useReturnUrl("/login"); //---> Update the returnUrl;

  const loginSubmitHandler = async (loginDto: LoginDto) => {
    console.log({ loginDto });

    const authUserResponse = (await authService.create(
      url,
      loginDto
    )) as AuthUser;
    localStorage.setItem("token", authUserResponse.token);

    AuthUserRxJs.updateData$(authUserResponse);
    console.log({ authUserResponse });
    
    navigate("/");
  };

  const backToList = () => {
    const backUrl = returnUrl ? returnUrl : "/";
    returnUrlRxJs.updateData$('/login');
    navigate(backUrl);
  };

  return (
    <LoginForm
      initialAuthUser={authUser}
      backToList={backToList}
      onLogin={loginSubmitHandler}
    />
  );
};
