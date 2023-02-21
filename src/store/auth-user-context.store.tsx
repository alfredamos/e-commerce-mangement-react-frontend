import {createContext, useState} from "react";
import { AuthUser } from "../models/auth/auth-user.model";

interface AuthContextType {
  authUser: AuthUser;
  setAuthUser: React.Dispatch<React.SetStateAction<AuthUser>>;  
}

export const AuthContext = createContext(
  {} as AuthContextType
);

interface AuthContextProviderProp {
  children: React.ReactNode;
}


export const AuthContextProvider = ({children}: AuthContextProviderProp) =>{
    const [authUser, setAuthUser] = useState({} as AuthUser)

    return ( 
    <AuthContext.Provider value={{authUser, setAuthUser}}> 
    {children}
    </AuthContext.Provider>);
}


