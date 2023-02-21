import React from "react";
import { Route, BrowserRouter as Router, Routes } from "react-router-dom";
import { ChangePassword } from "./auth/change-password.auth";
import { EditProfile } from "./auth/edit-profile.auth";
import { Login } from "./auth/login.auth";
import { Signup } from "./auth/signup.auth";
import { NavigationBar } from "./shared/navigation-bar";

import { AddCategory } from "./categories/add-category";
import { DeleteCategory } from "./categories/delete-category";
import { DetailCategory } from "./categories/detail-category";
import { EditCategory } from "./categories/edit-category";
import { ListCategory } from "./categories/list-category";

import { DeleteCustomer } from "./customers/delete-customer";
import { DetailCustomer } from "./customers/detail-customer";
import { ListCustomer } from "./customers/list-customer";

import { AddOrder } from "./orders/add-order";
import { DeleteOrder } from "./orders/delete-order";
import { DetailOrder } from "./orders/detail-order";
import { EditOrder } from "./orders/edit-order";
import { ListOrder } from "./orders/list-order";

import { AddProduct } from "./products/add-product";
import { DeleteProduct } from "./products/delete-product";
import { DetailProduct } from "./products/detail-product";
import { EditProduct } from "./products/edit-product";
import { ListProduct } from "./products/list-product";

import { Logout } from "./auth/logout.auth";
import { NotAllowedPage } from "./utils/not-allowed-route.util";
import { LogoutPage } from "./utils/log-out-page.util";
import { useObservable } from "./hooks/use-observable.hook";
import { AuthUserRxJs } from "./store/auth-rxjs.store";
import { AuthUser } from "./models/auth/auth-user.model";
import { UserType } from "./enum/user-type.enum";
import { AdminRoute } from "./utils/admin-route.util";
import { LoginRoute } from "./utils/login-route.util";
import { HomePage } from "./utils/home-route.util";

function App() {
  const authUser = useObservable(AuthUserRxJs.data$, {} as AuthUser);
  const isAdmin = authUser?.userType === UserType.Admin;
  const isLoggedIn = authUser?.isLoggedIn;
  return (
    <Router>
      <NavigationBar />
      <Routes>
        <Route
          path="/change-password"
          element={
            <LoginRoute isLoggedIn={isLoggedIn}>
              <ChangePassword />
            </LoginRoute>
          }
        />
        <Route
          path="/edit-profile"
          element={
            <LoginRoute isLoggedIn={isLoggedIn}>
              <EditProfile />
            </LoginRoute>
          }
        />
        <Route path="/login" element={<Login />} />
        <Route path="/logout" element={<Logout />} />
        <Route path="/signup" element={<Signup />} />
        <Route path="/not-allowed" element={<NotAllowedPage />} />
        <Route path="/logout-page" element={<LogoutPage />} />
        <Route path="/home" element={<HomePage />} />

        <Route
          path="/add-category"
          element={
            <AdminRoute isAdmin={isAdmin}>
              <AddCategory />
            </AdminRoute>
          }
        />
        <Route
          path="/delete-category/:id"
          element={
            <AdminRoute isAdmin={isAdmin}>
              <DeleteCategory />
            </AdminRoute>
          }
        />
        <Route
          path="/edit-category/:id"
          element={
            <AdminRoute isAdmin={isAdmin}>
              <EditCategory />
            </AdminRoute>
          }
        />
        <Route
          path="/detail-category/:id"
          element={
            <LoginRoute isLoggedIn={isLoggedIn}>
              <DetailCategory />
            </LoginRoute>
          }
        />
        <Route
          path="/list-category"
          element={
            <LoginRoute isLoggedIn={isLoggedIn}>
              <ListCategory />
            </LoginRoute>
          }
        />

        <Route
          path="/delete-customer/:id"
          element={
            <AdminRoute isAdmin={isAdmin}>
              <DeleteCustomer />
            </AdminRoute>
          }
        />
        <Route
          path="/detail-customer/:id"
          element={
            <LoginRoute isLoggedIn={isLoggedIn}>
              <DetailCustomer />
            </LoginRoute>
          }
        />
        <Route
          path="/list-customer"
          element={
            <AdminRoute isAdmin={isAdmin}>
              <ListCustomer />
            </AdminRoute>
          }
        />

        <Route
          path="/add-order"
          element={
            <AdminRoute isAdmin={isAdmin}>
              <AddOrder />
            </AdminRoute>
          }
        />
        <Route
          path="/delete-order/:id"
          element={
            <AdminRoute isAdmin={isAdmin}>
              <DeleteOrder />
            </AdminRoute>
          }
        />
        <Route
          path="/edit-order/:id"
          element={
            <AdminRoute isAdmin={isAdmin}>
              <EditOrder />
            </AdminRoute>
          }
        />
        <Route
          path="/detail-order/:id"
          element={
            <LoginRoute isLoggedIn={isLoggedIn}>
              <DetailOrder />
            </LoginRoute>
          }
        />
        <Route
          path="/"
          element={
            <AdminRoute isAdmin={isAdmin}>
              <ListOrder />
            </AdminRoute>
          }
        />

        <Route
          path="/add-product"
          element={
            <AdminRoute isAdmin={isAdmin}>
              <AddProduct />
            </AdminRoute>
          }
        />
        <Route
          path="/delete-product/:id"
          element={
            <AdminRoute isAdmin={isAdmin}>
              <DeleteProduct />
            </AdminRoute>
          }
        />
        <Route
          path="/edit-product/:id"
          element={
            <AdminRoute isAdmin={isAdmin}>
              <EditProduct />
            </AdminRoute>
          }
        />
        <Route
          path="/detail-product/:id"
          element={
            <LoginRoute isLoggedIn={isLoggedIn}>
              <DetailProduct />
            </LoginRoute>
          }
        />
        <Route
          path="/list-product"
          element={
            <LoginRoute isLoggedIn={isLoggedIn}>
              <ListProduct />
            </LoginRoute>
          }
        />
      </Routes>
    </Router>
  );
}

export default App;
