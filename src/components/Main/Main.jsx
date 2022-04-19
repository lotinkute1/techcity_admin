import React, { useEffect, useState } from "react";
import { Link, useParams } from "react-router-dom";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

import userApi from "../../api/userApi";
import StorageKeys from "../../constants";
import Router from "../../features/Router/Router";

export default function Main() {
  const db = getDatabase();
  const [users, setUsers] = useState([]);
  const [currentUser, setCurrentUser] = useState(null);

  let { id } = useParams();
  const getUser = async () => {
    try {
      const response = await userApi.getUserById(user_id);
      const { data } = response;
      setUser(data);
    } catch (err) {
      console.log("Fail to get api user by id");
    }
  };

  useEffect(() => {
    getUser();
  }, [id]);
  console.log('currentUser',currentUser);

  // const currentUser = {
  //   id: 2,
  //   name: "Ms. Frances Kris",
  //   phone_number: "0375127486",
  //   email: "preston23@example.com",
  //   address: "523 Nader Orchard Apt. 200\nNorth Noemy, UT 91527",
  //   ava: "gTBupnE0ltk346NLdOr2fKtNHeyRMS156etQMhcU",
  //   status: "0",
  //   role: 0,
  //   email_verified_at: null,
  //   created_at: "2022-03-16T16:24:16.000000Z",
  //   updated_at: "2022-03-16T16:24:16.000000Z",
  // };

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

  // users.forEach((user) => {
  //   if (id === user.id) {
  //     currentUser = user;
  //   }
  // });

  // từ id get từ param, call api get currentUuser -> setlocalStorage

  useEffect(() => {
    if (currentUser) {
      localStorage.setItem(StorageKeys.USER, JSON.stringify(currentUser));
    }
  }, []);

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
              {/* <div className="content__nav__user">
                <div className="content__nav__user-wrapper">
                  <div className="content__nav__user-ava">
                    <img
                      src={
                        currentUser?.user_ava ||
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
              </div> */}
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
