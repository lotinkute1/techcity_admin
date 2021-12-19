import React from "react";
import { Route, Routes } from "react-router-dom";
import AdminPage from "../AdminPage/AdminPage";
import OrdersPage from "../AdminPage/OrdersPage";
import ProductsPage from "../AdminPage/ProductsPage";
import DiscountPage from "../AdminPage/DiscountPage";
import UsersPage from "../AdminPage/UsersPage";
import CategoriesPage from "../AdminPage/CategoriesPage";
export default function Router() {
  return (
    <>
      <Routes>
        <Route path="/" element={<AdminPage />} />
        <Route path="/" element={<OrdersPage />} />
        <Route path="/" element={<ProductsPage />} />
        <Route path="/" element={<DiscountPage />} />
        <Route path="/" element={<UsersPage />} />
        <Route path="/" element={<CategoriesPage />} />
      </Routes>
    </>
  );
}
