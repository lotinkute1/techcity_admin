import React, { useState } from "react";
import { Link } from "react-router-dom";
import logo from "../../assets/images/logo-web.png";
import StorageKeys from "../../constants";

export default function Nav() {
  const currentUser = JSON.parse(localStorage.getItem(StorageKeys.USER));
  const [token, setToken] = useState(() => {
    const param = window.location.pathname;
    const token = param.split("/")[2];
    return token;
  });
  const navOrderPageRenderer = (currentUser) => {
    return (
      <Link to={`/${currentUser?.id}/${token}/OrdersPage`}>
        <div className="nav-bar__list">
          <i className="fas fa-shopping-cart" /> orders
        </div>
      </Link>
    );
  };

  const navProductPageRenderer = (currentUser) => {
    return (
      <Link to={`/${currentUser?.id}/${token}/ProductsPage`}>
        <div className="nav-bar__list">
          <i className="fas fa-archive" /> products
        </div>
      </Link>
    );
  };
  const navDiscountPageRenderer = (currentUser) => {
    return (
      <Link to={`/${currentUser?.id}/${token}/DiscountPage`}>
        <div className="nav-bar__list">
          <i className="fas fa-archive" /> discounts
        </div>
      </Link>
    );
  };
  const navUserPageRenderer = (currentUser) => {
    return (
      <Link to={`/${currentUser?.id}/${token}/UsersPage`}>
        <div className="nav-bar__list">
          <i className="fas fa-users" /> users
        </div>
      </Link>
    );
  };
  const navCategoriesPageRenderer = (currentUser) => {
    return (
      <Link to={`/${currentUser?.id}/${token}/CategoriesPage`}>
        <div className="nav-bar__list">
          <i className="far fa-calendar-check" /> categories
        </div>
      </Link>
    );
  };
  const navAdminPageRenderer = (currentUser) => {
    return (
      <Link to={`/${currentUser?.id}/${token}/AdminPage`}>
        <div className="nav-bar__list">
          <i className="far fa-calendar-check" /> admin
        </div>
      </Link>
    );
  };

  return (
    <div className="col-2">
      {/* left container */}
      <div className="nav-bar">
        <div className="nav-bar__wrapper">
          {/* logo */}
          <div className="nav-bar__web-logo">
            <img src={logo} alt="" />
          </div>
          <div className="nav-bar__lists">
            {currentUser?.role === 0 && navAdminPageRenderer(currentUser)}
            {currentUser?.role === 0 && navOrderPageRenderer(currentUser)}
            {currentUser?.role === 0 && navProductPageRenderer(currentUser)}
            {currentUser?.role === 0 && navDiscountPageRenderer(currentUser)}
            {currentUser?.role === 0 && navUserPageRenderer(currentUser)}
            {currentUser?.role === 0 && navCategoriesPageRenderer(currentUser)}

            {currentUser?.role === 1 && navOrderPageRenderer(currentUser)}
            {currentUser?.role === 1 && navProductPageRenderer(currentUser)}
            {currentUser?.role === 1 && navDiscountPageRenderer(currentUser)}
          </div>
        </div>
      </div>
    </div>
  );
}
