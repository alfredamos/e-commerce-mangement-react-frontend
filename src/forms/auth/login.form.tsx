import { useState, FormEvent } from "react";
import { LoginDto } from "../../models/auth/login.model";


interface LoginFormProp {
  initialAuthUser: LoginDto;
  onLogin: (loginDto: LoginDto) => void;
  backToList: () => void;
}


export const LoginForm = (loginFormProp: LoginFormProp) => {
 const { initialAuthUser, backToList, onLogin } = loginFormProp;
 const [authUser, setAuthUser] = useState(initialAuthUser);

 const submitHandler = (event: FormEvent<HTMLFormElement>) => {
   event.preventDefault();
   onLogin(authUser);
 };

 const inputChangeHandler = (event: FormEvent<HTMLInputElement>) => {
   const { name, value } = event.currentTarget;

   setAuthUser({ ...authUser, [name]: value });
 };

 return (
   <div className="border" style={{ padding: "10px" }}>
     <form onSubmit={submitHandler}>
       <div className="card">
        <div className="card-header">
          <h4 className="text-center">Login Form</h4>
        </div>
         <div className="card-body">
           <div className="mb-3">
             <label htmlFor="email" className="form-label">
               Email
             </label>
             <input
               id="email"
               type="email"
               name="email"
               value={authUser.email}
               className="form-control"
               onChange={inputChangeHandler}
             />
           </div>
           <div className="mb-3">
             <label htmlFor="password" className="form-label">
               Password
             </label>
             <input
               id="password"
               type="password"
               name="password"
               value={authUser.password}
               className="form-control"
               onChange={inputChangeHandler}
             />
           </div>           
         </div>
         <div className="card-footer">
           <button type="submit" className="btn btn-outline-primary form-control m-1">
             Submit
           </button>
           <button
             type="button"
             className="btn btn-outline-secondary form-control m-1"
             onClick={backToList}
           >
             Back
           </button>
         </div>
       </div>
     </form>
   </div>
 );
};
