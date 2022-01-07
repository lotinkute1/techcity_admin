import React from "react";
import { Route, Routes } from "react-router-dom";
import AdminPage from "../AdminPage/AdminPage";
import OrdersPage from "../OrdersPage/Orderspage";
import ProductsPage from "../ProductsPage/ProductsPage";
import DiscountPage from "../DiscountPage/DiscountPage";
import UsersPage from "../UsersPage/UsersPage";
import CategoriesPage from "../CategoriesPage/CategoriesPage";
export default function Router() {
  return (
    <>
      <Routes>
        {/* <Route path="/AdminPage" element={<AdminPage />} /> */}
        <Route path="/OrdersPage" element={<OrdersPage />} />
        <Route path="/ProductsPage" element={<ProductsPage />} />
        <Route path="/DiscountPage" element={<DiscountPage />} />
        <Route path="/UsersPage" element={<UsersPage />} />
        <Route path="/CategoriesPage" element={<CategoriesPage />} />
        <Route path="*" element={<ProductsPage to="/ProductsPage" />} />
      </Routes>
    </>
  );
}
