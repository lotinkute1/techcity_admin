import React from 'react'
import logo from  "../../assets/images/logo-web.png";

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
                <a href="/#">
                  <div className="nav-bar__list">
                    <i className="fas fa-user-secret" /> admin{" "}
                  </div>
                </a>
                <a href="/#">
                  <div className="nav-bar__list">
                    <i className="fas fa-shopping-cart" /> orders{" "}
                  </div>
                </a>
                <a href="/#">
                  <div className="nav-bar__list">
                    <i className="fas fa-archive" /> products
                  </div>
                </a>
                <a href="/#">
                  <div className="nav-bar__list">
                    <i className="fas fa-tags" /> discounts
                  </div>
                </a>
                <a href="/#">
                  <div className="nav-bar__list">
                    <i className="fas fa-users" /> users
                  </div>
                </a>
                <a href="/#">
                  <div className="nav-bar__list">
                    <i className="far fa-calendar-check" /> categories
                  </div>
                </a>
              </div>
            </div>
          </div>
        </div>
    )
}
