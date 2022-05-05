import React, {useEffect} from "react";
import logo from "../../assets/images/logo-web.png";
import { Link } from "react-router-dom";
import StorageKeys from "../../constants";

export default function Nav() {
  // const currentUser = JSON.parse(localStorage.getItem(StorageKeys.USER));
  const currentUser = {
    id: 2,
    name: "Ms. Frances Kris",
    phone_number: "0375127486",
    email: "preston23@example.com",
    address: "523 Nader Orchard Apt. 200\nNorth Noemy, UT 91527",
    ava: "gTBupnE0ltk346NLdOr2fKtNHeyRMS156etQMhcU",
    status: "0",
    role: 0,
    email_verified_at: null,
    created_at: "2022-03-16T16:24:16.000000Z",
    updated_at: "2022-03-16T16:24:16.000000Z",
  };
  
  const navOrderPageRenderer = (currentUser) => {
    return (<Link to={`/${currentUser?.id}/OrdersPage`}>
      <div className="nav-bar__list">
        <i className="fas fa-shopping-cart" /> orders
      </div>
    </Link>)
  };
  
  const navProductPageRenderer = (currentUser) => {
    return (<Link to={`/${currentUser?.id}/ProductsPage`}>
      <div className="nav-bar__list">
        <i className="fas fa-archive" /> products
      </div>
    </Link>)
  };
  const navDiscountPageRenderer = (currentUser) => {
   return (<Link to={`/${currentUser?.id}/DiscountPage`}>
      <div className="nav-bar__list">
        <i className="fas fa-archive" /> discounts
      </div>
    </Link>)
  };
  const navUserPageRenderer = (currentUser) => {
    return  (<Link to={`/${currentUser?.id}/UsersPage`}>
    <div className="nav-bar__list">
      <i className="fas fa-users" /> users
    </div>
  </Link>)
  };
  const navCategoriesPageRenderer = (currentUser) => {
    return (<Link to={`/${currentUser?.id}/CategoriesPage`}>
    <div className="nav-bar__list">
      <i className="far fa-calendar-check" /> categories
    </div>
  </Link>)
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
            {/* {currentUser?.role === 1 && (
              <Link to={`/${currentUser?.id}/AdminPage`}>
                <div className="nav-bar__list">
                  <i className="fas fa-user-secret" /> admin{" "}
                </div>
              </Link>
            )}
            {currentUser?.role === 1 && (
              <Link to={`/${currentUser?.id}/OrdersPage`}>
                <div className="nav-bar__list">
                  <i className="fas fa-shopping-cart" /> orders{" "}
                </div>
              </Link>
            )}
            {currentUser?.role === 0 ? (
              <Link to={`/${currentUser?.id}/OrdersPage`}>
                <div className="nav-bar__list">
                  <i className="fas fa-shopping-cart" /> orders
                </div>
              </Link>
            ) : currentUser?.role === 1 ? (
              <Link to={`/${currentUser?.id}/OrdersPage`}>
                <div className="nav-bar__list">
                  <i className="fas fa-shopping-cart" /> orders
                </div>
              </Link>
            ) : (
              ""
            )} */}
            {currentUser?.role === 0 && navOrderPageRenderer(currentUser)}
            {currentUser?.role === 1 && navOrderPageRenderer(currentUser)}

            {currentUser?.role === 0 && navProductPageRenderer(currentUser)}
            {currentUser?.role === 1 && navProductPageRenderer(currentUser)}

            {currentUser?.role === 0 && navDiscountPageRenderer(currentUser)}
            {currentUser?.role === 1 && navDiscountPageRenderer(currentUser)}

            {currentUser?.role === 0 && navUserPageRenderer(currentUser)}

            {currentUser?.role === 0 && navCategoriesPageRenderer(currentUser)}
          </div>
        </div>
      </div>
    </div>
  );
}
