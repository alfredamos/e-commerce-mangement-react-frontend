import { Gender } from '../../enum/gender.enum';
import { UserType } from '../../enum/user-type.enum';

export interface EditProfileDto {
  name: string
  email: string;
  phone: string;
  gender: Gender;
  userType?: UserType;
  password: string;
  newPassword: string;
  confirmPassword: string;
}
