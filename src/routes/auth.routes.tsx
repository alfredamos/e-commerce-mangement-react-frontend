import { Route} from "react-router-dom";
import { ChangePassword } from "../auth/change-password.auth";
import { EditProfile } from "../auth/edit-profile.auth";
import { Login } from "../auth/login.auth";
import { Logout } from "../auth/logout.auth";
import { Signup } from "../auth/signup.auth";
import { HomePage } from "../utils/home-route.util";
import { LogoutPage } from "../utils/log-out-page.util";
import { NotAllowedPage } from "../utils/not-allowed-route.util";

export const AuthRoutes = () => {
  return (
    <Route>
      <Route path="change-password" element={<ChangePassword />} />
      <Route path="edit-profile" element={<EditProfile />} />
      <Route path="login" element={<Login />} />
      <Route path="logout" element={<Logout />} />
      <Route path="signup" element={<Signup />} />
      <Route path="not-allowed" element={<NotAllowedPage />} />
      <Route path="logout-page" element={<LogoutPage />} />
      <Route path="home" element={<HomePage />} />
    </Route>
  );
};
