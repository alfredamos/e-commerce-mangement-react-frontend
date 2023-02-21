import { Gender } from '../../enum/gender.enum';
import { UserType } from '../../enum/user-type.enum';

export interface UserInfoDto {
  id: string;
  name: string
  email: string;
  phone: string;
  gender: Gender;
  userType: UserType;    
}
