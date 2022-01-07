import { getDatabase, onValue, ref } from "firebase/database";
import React, { useEffect, useState } from "react";
import { Link, useParams } from "react-router-dom";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

import StorageKeys from "../../constants";
import Router from "../../features/Router/Router";

export default function Main() {
  const db = getDatabase();
  const [users, setUsers] = useState([]);

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

  let { id } = useParams();

  let currenUser;

  users.forEach((user) => {
    if (id === user.id) {
      currenUser = user;
    }
  });

  if (currenUser) {
    localStorage.setItem(StorageKeys.USER, JSON.stringify(currenUser));
  }
  useEffect(() => {
    (() => {
      const categoryRef = ref(db, "users");
      onValue(categoryRef, (snapshot) => {
        const temp = [];
        snapshot.forEach((item) => {
          temp.push({
            id: item.key,
            ...item.val(),
          });
        });
        setUsers([...temp]);
      });
    })();
  }, []);

  if (currenUser) {
    localStorage.setItem(StorageKeys.USER, JSON.stringify(currenUser));
  }

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
                        currenUser?.user_ava ||
                        "https://static.thenounproject.com/png/363640-200.png"
                      }
                      alt=""
                    />
                  </div>
                  <div className="content__nav__user-name">
                    {currenUser?.name}
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
                <div onClick={handleLogout}>Logout</div>
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
