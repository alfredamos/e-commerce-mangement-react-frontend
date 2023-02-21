//import {BehaviorSubject} from "rxjs";
import {AuthUser} from "../models/auth/auth-user.model";
import { DataRxJs } from "./data-rxjs.store";
import {UserType} from "../enum/user-type.enum";


class UserAuthRxJs extends DataRxJs<AuthUser>{
   constructor(public authUser: AuthUser){
      super(authUser);
   }
}

export const AuthUserRxJs = new UserAuthRxJs({
  id: "",
  name: "",
  userType: UserType.None,
  isLoggedIn: false,
  message: "You are yet to login!",
  token: "",
});

