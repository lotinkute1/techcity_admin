import React from 'react'
import logo from  "../../assets/images/logo-web.png";
import {Link} from "react-router-dom";

export default function Nav() {
    return (
        <div className="col-2">
          {/* left container */}
          <div className="nav-bar">
            <div className="nav-bar__wrapper">
              {/* logo */}
              <div className="nav-bar__web-logo">
                <img src={logo} alt=""  />
              </div>
              <div className="nav-bar__lists">
                <Link to="/AdminPage">
                  <div className="nav-bar__list">
                    <i className="fas fa-user-secret" /> admin{" "}
                  </div>
                </Link>
                <Link to="/OrdersPage">
                  <div className="nav-bar__list">
                    <i className="fas fa-shopping-cart" /> orders{" "}
                  </div>
                </Link>
                <Link to="/ProductsPage">
                  <div className="nav-bar__list">
                    <i className="fas fa-archive" /> products
                  </div>
                </Link>
                <Link to="/DiscountPage">
                  <div className="nav-bar__list">
                    <i className="fas fa-tags" /> discounts
                  </div>
                </Link>
                <Link to="/UsersPage">
                  <div className="nav-bar__list">
                    <i className="fas fa-users" /> users
                  </div>
                </Link>
                <Link to="/CategoriesPage">
                  <div className="nav-bar__list">
                   <i className="far fa-calendar-check" /> categories
                  </div>
                </Link>
              </div>
            </div>
          </div>
        </div>
    )
}
