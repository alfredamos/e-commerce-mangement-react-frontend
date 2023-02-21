import { UserType } from "../../enum/user-type.enum";

export interface AuthUser {
    id: string;
    name: string;
    userType: UserType;
    isLoggedIn: boolean;
    message?: string;
    token: string;
}