import { FormEvent, useState } from "react";
import { ChangePasswordDto } from "../../models/auth/change-password.model";


interface ChangePasswordFormProp{
    initialAuthUser: ChangePasswordDto;
    onChangePassword: (changePasswordDto: ChangePasswordDto) => void;    
    backToList: () => void;

}


export const ChangePasswordForm = (changePasswordFormProp: ChangePasswordFormProp) => {
    const { initialAuthUser, backToList, onChangePassword} = changePasswordFormProp;
    const [authUser, setAuthUser] = useState(initialAuthUser)

    const submitHandler = (event: FormEvent<HTMLFormElement>) => {
        event.preventDefault();
        onChangePassword(authUser);
    }

    const inputChangeHandler = (event: FormEvent<HTMLInputElement>) => {
        const {name, value} = event.currentTarget;

        setAuthUser({...authUser, [name]: value});
    }

    return (
      <div className="border" style={{ padding: "10px" }}>
        <form onSubmit={submitHandler}>
          <div className="card">
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
                <label htmlFor="oldPassword" className="form-label">
                  Password
                </label>
                <input
                  id="oldPassword"
                  type="password"
                  name="oldPassword"
                  value={authUser.oldPassword}
                  className="form-control"
                  onChange={inputChangeHandler}
                />
              </div>
              <div className="mb-3">
                <label htmlFor="newPassword" className="form-label">
                  New Password
                </label>
                <input
                  id="newPassword"
                  type="password"
                  name="newPassword"
                  value={authUser.newPassword}
                  className="form-control"
                  onChange={inputChangeHandler}
                />
              </div>
              <div className="mb-3">
                <label htmlFor="confirmPassword" className="form-label">
                  Confirm Password
                </label>
                <input
                  id="confirmPassword"
                  type="password"
                  name="confirmPassword"
                  value={authUser.confirmPassword}
                  className="form-control"
                  onChange={inputChangeHandler}
                />
              </div>
            </div>
            <div className="card-footer">
              <button type="submit" className="btn btn-outline-primary form-control m-1">
                Submit
              </button>
              <button type="button" className="btn btn-outline-secondary form-control m-1" onClick={backToList}>
                Back
              </button>
            </div>
          </div>
        </form>
      </div>
    );
}