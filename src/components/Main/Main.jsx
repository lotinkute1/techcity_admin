import React, { useEffect, useState } from "react";
import { Link, useParams } from "react-router-dom";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

import userApi from "../../api/userApi";
import StorageKeys from "../../constants";
import Router from "../../features/Router/Router";

export default function Main() {
  const [currentUser, setCurrentUser] = useState(null);

  let { id } = useParams();

  const notify = (type, message) =>
    toast[type](message, {
      position: "top-right",
      autoClose: 3000,
      hideProgressBar: false,
      closeOnClick: true,
      pauseOnHover: true,
      draggable: true,
      progress: undefined,
    });

  const getUser = async () => {
    try {
      const response = await userApi.getOne(id);
      const { data } = response;
      setCurrentUser(data);
    } catch (err) {
      console.log("Fail to get api user by id");
    }
  };

  useEffect(() => {
    getUser();
  }, [id]);
  console.log("currentUser", currentUser);

  // từ id get từ param, call api get currentUuser -> setlocalStorage
  useEffect(() => {
    if (currentUser) {
      localStorage.setItem(StorageKeys.USER, JSON.stringify(currentUser));
    }
  }, [currentUser]);

  const handleLogout = () => {
    localStorage.removeItem(StorageKeys.USER);
    notify("success", "Đăng xuất thành công!");
  };

  return (
    <div className="col">
      {/* right container */}
      <div className="content">
        <div className="content__wrapper">
          {/* right navigation */}
          <div className="content__nav">
            <div className="content__nav-left">
              <input
                placeholder="Search..."
                className="search-input"
                type="text"
              />
              <input
                className="btn btn-dark"
                type="button"
                defaultValue="Search"
              />
            </div>
            <div className="content__nav-right">
              <div className="content__nav__nofications">
                <a href="/#">
                  <i className="fas fa-bell" />
                </a>
                <a href="/#">
                  <i className="fas fa-envelope" />
                </a>
              </div>
              <div className="content__nav__user">
                <div className="content__nav__user-wrapper">
                  <div className="content__nav__user-ava">
                    <img
                      src={
                        currentUser?.ava ||
                        "https://static.thenounproject.com/png/363640-200.png"
                      }
                      alt=""
                    />
                  </div>
                  <div className="content__nav__user-name">
                    {currentUser?.name}
                  </div>
                </div>
                <div className="content__nav__user__subnav">
                  <div>
                    <div className="subnav__list">
                      <Link to={"/" + id}>Profile</Link>{" "}
                    </div>
                    <div className="subnav__list">
                      <Link to={"/" + id}>Settings</Link>{" "}
                    </div>
                    <div className="subnav__list">
                      <Link to={"/" + id}>Logout</Link>{" "}
                    </div>
                  </div>
                </div>
              </div>
              <div className="subnav__list">
                <a href="http://localhost:3000/" onClick={handleLogout}>
                  Quay về trang chủ
                </a>
              </div>
            </div>
          </div>
          <div className="container-fluid px-4">
            {/* main content here */}
            <Router />
          </div>
        </div>
      </div>
    </div>
  );
}
