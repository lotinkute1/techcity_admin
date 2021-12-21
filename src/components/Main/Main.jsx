import React from "react";

import Router from "../../features/Router/Router";

export default function Main() {
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
                    <img src="https://i.imgflip.com/1tk4j3.jpg" alt="" />
                  </div>
                  <div className="content__nav__user-name">Minh Huy</div>
                </div>
                <div className="content__nav__user__subnav">
                  <div>
                    <div className="subnav__list">
                      <a href="/#">Profile</a>{" "}
                    </div>
                    <div className="subnav__list">
                      <a href="/#">Settings</a>{" "}
                    </div>
                    <div className="subnav__list">
                      <a href="/#">Logout</a>{" "}
                    </div>
                  </div>
                </div>
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
