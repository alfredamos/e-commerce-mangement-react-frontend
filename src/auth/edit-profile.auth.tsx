import { EditProfileForm } from "../forms/auth/edit-profile.form";
import { EditProfileDto } from "../models/auth/edit-profile.model";
import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { AuthUser } from "../models/auth/auth-user.model";
import { Gender } from "../enum/gender.enum";
import { UserType } from "../enum/user-type.enum";
import { UserInfoDto } from "../models/auth/user-info.model";
import { authService } from "../services/auth.service";
import {useObservable} from "../hooks/use-observable.hook";
import {returnUrlRxJs} from "../store/return-url-rxjs.store";


const initialUserProfile: UserInfoDto = {
  id: "",
  name: "",
  email: "",
  phone: "",
  gender: Gender.None,
  userType: UserType.None,
};

const initialAuthUser: EditProfileDto = {
  ...initialUserProfile,
  password: "",
  newPassword: "",
  confirmPassword: "",
};

export const EditProfile = () => {
  const [authUser, setAuthUser] = useState(initialAuthUser);
  const [isLoading, setIsLoading] = useState(true);
  const returnUrl = useObservable(returnUrlRxJs.data$, "");

  const navigate = useNavigate();

  const editProfileUrl = "auth/edit-profile";
  const currentUserUrl = "customers/current-user";

  //useReturnUrl("/edit-profile"); //---> Update the returnUrl;

  useEffect(() => {
    const getUserProfile = async () => {
      const userInfo = (await authService.findOne(
        currentUserUrl
      )) as UserInfoDto;

      console.log("In edit profile, userInfo : ", userInfo);
      setAuthUser({
        ...userInfo,
        password: "",
        newPassword: "",
        confirmPassword: "",
      });
      setIsLoading(false);
    };
    getUserProfile();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  const EditProfileSubmitHandler = async (editProfileDto: EditProfileDto) => {
    console.log({ editProfileDto });
    const authUserResponse = (await authService.update(
      editProfileUrl,
      editProfileDto
    )) as AuthUser;
    console.log({ authUserResponse });
   
    navigate("/");
  };

  const backToList = () => {
    const backUrl = returnUrl ? returnUrl : "/";
    returnUrlRxJs.updateData$('/edit-profile');
    navigate(backUrl);
  };

  return (
    <>
      {!isLoading && (
        <EditProfileForm
          initialAuthUser={authUser}
          backToList={backToList}
          onEditProfile={EditProfileSubmitHandler}
        />
      )}
    </>
  );
};
