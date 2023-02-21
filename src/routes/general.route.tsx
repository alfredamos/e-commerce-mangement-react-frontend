import { Route} from "react-router-dom";
import { DetailCategory } from "../categories/detail-category";
import { ListCategory } from "../categories/list-category";

import { DetailCustomer } from "../customers/detail-customer";
import { ListCustomer } from "../customers/list-customer";

import { DetailOrder } from "../orders/detail-order";
import { ListOrder } from "../orders/list-order";

import { DetailProduct } from "../products/detail-product";
import { ListProduct } from "../products/list-product";

import { LoginRoute } from "../utils/login-route.util";

interface GeneralRouteProp {
  isLoggedIn: boolean;
}

export const GeneralRoutes = ({ isLoggedIn }: GeneralRouteProp) => {
  return (
    <Route>
      <Route
        path="detail-category/:id"
        element={
          <LoginRoute isLoggedIn={isLoggedIn}>
            <DetailCategory />
          </LoginRoute>
        }
      />
      <Route
        path="list-category"
        element={
          <LoginRoute isLoggedIn={isLoggedIn}>
            <ListCategory />
          </LoginRoute>
        }
      />

      <Route
        path="detail-customer/:id"
        element={
          <LoginRoute isLoggedIn={isLoggedIn}>
            <DetailCustomer />
          </LoginRoute>
        }
      />
      <Route
        path="list-customer"
        element={
          <LoginRoute isLoggedIn={isLoggedIn}>
            <ListCustomer />
          </LoginRoute>
        }
      />

      <Route
        path="detail-order/:id"
        element={
          <LoginRoute isLoggedIn={isLoggedIn}>
            <DetailOrder />
          </LoginRoute>
        }
      />
      <Route
        path="/"
        element={
          <LoginRoute isLoggedIn={isLoggedIn}>
            <ListOrder />
          </LoginRoute>
        }
      />

      <Route
        path="detail-product/:id"
        element={
          <LoginRoute isLoggedIn={isLoggedIn}>
            <DetailProduct />
          </LoginRoute>
        }
      />
      <Route
        path="list-product"
        element={
          <LoginRoute isLoggedIn={isLoggedIn}>
            <ListProduct />
          </LoginRoute>
        }
      />
    </Route>
  );
};
