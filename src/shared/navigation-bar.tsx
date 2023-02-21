import { NavLink, Link } from "react-router-dom";
import { AuthUser } from "../models/auth/auth-user.model";
import { useObservable } from "../hooks/use-observable.hook";
import "./navigation-bar.css";
import { AuthUserRxJs } from "../store/auth-rxjs.store";

export const NavigationBar = () => {
  const authUser = useObservable(AuthUserRxJs.data$, {} as AuthUser);

  return (
    <ul className="nav nav-pills justify-content-end add mt-3 mb-3">
      <li className="nav-item">
        <NavLink
          className={({ isActive }) =>
            isActive ? "nav-link active" : "nav-link"
          }
          to="/"
        >
          Orders
        </NavLink>
      </li>
      <li className="nav-item">
        <NavLink
          className={({ isActive }) =>
            isActive ? "nav-link active" : "nav-link"
          }
          to="/list-category"
        >
          Categories
        </NavLink>
      </li>
      <li className="nav-item">
        <NavLink
          className={({ isActive }) =>
            isActive ? "nav-link active" : "nav-link"
          }
          to="/list-customer"
        >
          Customers
        </NavLink>
      </li>
      <li>
        <NavLink className="nav-link" to="/list-product">
          Products
        </NavLink>
      </li>
      {!authUser?.isLoggedIn && (
        <li className="nav-item">
          <NavLink className="nav-link" to="/login">
            Login
          </NavLink>
        </li>
      )}

      <>
        {authUser?.isLoggedIn && (
          <>
            <li className="nav-item">
              <Link className="nav-link" to="/logout">
                Logout
              </Link>
            </li>
            <div className="dropdown">
              <Link
                className="btn btn-link dropdown-toggle"
                to="#"
                role="button"
                id="dropdownMenuLink"
                data-bs-toggle="dropdown"
                aria-expanded="false"
              >
                Settings
              </Link>
              <ul className="dropdown-menu" aria-labelledby="dropdownMenuLink">
                <li>
                  <Link className="dropdown-item" to="/change-password">
                    Change password
                  </Link>
                </li>
                <li>
                  <Link className="dropdown-item" to="/edit-profile">
                    Edit profile
                  </Link>
                </li>
              </ul>
            </div>
          </>
        )}
      </>
    </ul>
  );
};
