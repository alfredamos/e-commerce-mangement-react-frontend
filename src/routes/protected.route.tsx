import { Route} from "react-router-dom";
import { AddCategory } from "../categories/add-category";
import { DeleteCategory } from "../categories/delete-category";
import { EditCategory } from "../categories/edit-category";

import { DeleteCustomer } from "../customers/delete-customer";

import { AddOrder } from "../orders/add-order";
import { DeleteOrder } from "../orders/delete-order";
import { EditOrder } from "../orders/edit-order";

import { AddProduct } from "../products/add-product";
import { DeleteProduct } from "../products/delete-product";
import { EditProduct } from "../products/edit-product";
import { AdminRoute } from "../utils/admin-route.util";

interface ProtectedRouteProp{
    isAdmin: boolean;
}

export const ProtectedRoutes = ({isAdmin}: ProtectedRouteProp) => {
  return (
    <Route>
      <Route
        path="add-category"
        element={
          <AdminRoute isAdmin={isAdmin}>
            <AddCategory />
          </AdminRoute>
        }
      />
      <Route
        path="delete-category/:id"
        element={
          <AdminRoute isAdmin={isAdmin}>
            <DeleteCategory />
          </AdminRoute>
        }
      />
      <Route
        path="edit-category/:id"
        element={
          <AdminRoute isAdmin={isAdmin}>
            <EditCategory />
          </AdminRoute>
        }
      />

      <Route
        path="delete-customer/:id"
        element={
          <AdminRoute isAdmin={isAdmin}>
            <DeleteCustomer />
          </AdminRoute>
        }
      />

      <Route
        path="add-order"
        element={
          <AdminRoute isAdmin={isAdmin}>
            <AddOrder />
          </AdminRoute>
        }
      />
      <Route
        path="delete-order/:id"
        element={
          <AdminRoute isAdmin={isAdmin}>
            <DeleteOrder />
          </AdminRoute>
        }
      />
      <Route
        path="edit-order/:id"
        element={
          <AdminRoute isAdmin={isAdmin}>
            <EditOrder />
          </AdminRoute>
        }
      />

      <Route
        path="add-product"
        element={
          <AdminRoute isAdmin={isAdmin}>
            <AddProduct />
          </AdminRoute>
        }
      />
      <Route
        path="delete-product/:id"
        element={
          <AdminRoute isAdmin={isAdmin}>
            <DeleteProduct />
          </AdminRoute>
        }
      />
      <Route
        path="edit-product/:id"
        element={
          <AdminRoute isAdmin={isAdmin}>
            <EditProduct />
          </AdminRoute>
        }
      />
    </Route>
  );
};
