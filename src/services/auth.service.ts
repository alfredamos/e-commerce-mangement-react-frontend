import { DataService } from "./data.service";
import {ChangePasswordDto} from "../models/auth/change-password.model";
import {EditProfileDto} from "../models/auth/edit-profile.model";
import {LoginDto} from "../models/auth/login.model";
import {SignupDto} from "../models/auth/signup.model";
import {UserInfoDto} from "../models/auth/user-info.model";
import {AuthUser} from "../models/auth/auth-user.model";

type authDto = ChangePasswordDto | EditProfileDto | LoginDto | SignupDto | UserInfoDto | AuthUser;

class AuthService extends DataService<authDto>{}

export const authService = new AuthService();

