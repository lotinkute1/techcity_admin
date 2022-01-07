import React from "react";
import logo from "../../assets/images/logo-web.png";
import { Link } from "react-router-dom";
import StorageKeys from "../../constants";

export default function Nav() {
  const currentUser = JSON.parse(localStorage.getItem("userLogged"));

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
            {currentUser?.user_type === 1 && (
              <Link to={`/${currentUser?.id}/AdminPage`}>
                <div className="nav-bar__list">
                  <i className="fas fa-user-secret" /> admin{" "}
                </div>
              </Link>
            )}
            {currentUser?.user_type === 1 && (
              <Link to={`/${currentUser?.id}/OrdersPage`}>
                <div className="nav-bar__list">
                  <i className="fas fa-shopping-cart" /> orders{" "}
                </div>
              </Link>
            )}
            {currentUser?.user_type === 1 ? (
              <Link to={`/${currentUser?.id}/ProductsPage`}>
                <div className="nav-bar__list">
                  <i className="fas fa-archive" /> products
                </div>
              </Link>
            ) : currentUser?.user_type === 2 ? (
              <Link to={`/${currentUser?.id}/ProductsPage`}>
                <div className="nav-bar__list">
                  <i className="fas fa-archive" /> products
                </div>
              </Link>
            ) : (
              ""
            )}
            {currentUser?.user_type === 1 ? (
              <Link to={`/${currentUser?.id}/DiscountPage`}>
                <div className="nav-bar__list">
                  <i className="fas fa-archive" /> discounts
                </div>
              </Link>
            ) : currentUser?.user_type === 2 ? (
              <Link to={`/${currentUser?.id}/DiscountPage`}>
                <div className="nav-bar__list">
                  <i className="fas fa-archive" /> discounts
                </div>
              </Link>
            ) : (
              ""
            )}

            {currentUser?.user_type === 1 && (
              <Link to={`/${currentUser?.id}/UsersPage`}>
                <div className="nav-bar__list">
                  <i className="fas fa-users" /> users
                </div>
              </Link>
            )}

            {currentUser?.user_type === 1 && (
              <Link to={`/${currentUser?.id}/CategoriesPage`}>
                <div className="nav-bar__list">
                  <i className="far fa-calendar-check" /> categories
                </div>
              </Link>
            )}
          </div>
        </div>
      </div>
    </div>
  );
}
