import React from "react";
import { Route, Routes } from "react-router-dom";

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
