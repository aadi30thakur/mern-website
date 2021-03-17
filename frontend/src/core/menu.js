import React, { Fragment } from "react";
import { Link, withRouter } from "react-router-dom";
import { signout, isAuthenticated } from "../auth/helper";
import '../Assets/JS/script'
import '../Assets/CSS/style.css'
import logo from '../Assets/images/logo.png'


const currentTab = (history, path) => {
  if (history.location.pathname === path) {
    return { color: "red" };
  } else {
    return { color: "black" };
  }
};

const Menu = ({ history }) => {
  return (
    <>
      {/* <div>
        <ul className="nav nav-tabs">
          <li className="nav-item">
            <Link style={currentTab(history, "/")} className="nav-link" to="/">
              Home
            </Link>
          </li>
          <li className="nav-item">
            <Link
              style={currentTab(history, "/cart")}
              className="nav-link"
              to="/cart"
            >
              cart
            </Link>
          </li>
          {isAuthenticated() && isAuthenticated().user.role === 0 && (
            <li className="nav-item">
              <Link
                style={currentTab(history, "/user/dashboard")}
                className="nav-link"
                to="/user/dashboard"
              >
                daashboard
              </Link>
            </li>
          )}
          {isAuthenticated() && isAuthenticated().user.role === 1 && (
            <li className="nav-item">
              <Link
                style={currentTab(history, "/admin/dashboard")}
                className="nav-link"
                to="/admin/dashboard"
              >
                a.dashboard
              </Link>
            </li>
          )}

          {!isAuthenticated() && (
            <Fragment>
              <li className="nav-item">
                <Link
                  style={currentTab(history, "/signup")}
                  className="nav-link"
                  to="/signup"
                >
                  signup
                </Link>
              </li>
              <li className="nav-item">
                <Link
                  style={currentTab(history, "/signin")}
                  className="nav-link"
                  to="/signin"
                >
                  signin
                </Link>
              </li>
            </Fragment>
          )}
          {isAuthenticated() && (
            <li className="nav-item">
              <Link
                className="nav-link text-warning"
                onClick={() => {
                  signout(() => {
                    history.push("/");
                  });
                }}
              >
                signout
              </Link>
            </li>
          )}
        </ul>
      </div> */}

      <nav className="navbar navbar-expand-lg navbar-mainbg">
        <img src={logo} height='100' width='auto' style={{ marginTop: 5 }} alt="" />
        <button
          className="navbar-toggler"
          type="button"
          data-toggle="collapse"
          data-target="#navbarSupportedContent"
          aria-controls="navbarSupportedContent"
          aria-expanded="false"
          aria-label="Toggle navigation"
        >
          <i className="fas fa-bars "></i>
        </button>
        <div className="collapse navbar-collapse" id="navbarSupportedContent">
          <ul className="navbar-nav ml-auto">
            <div className="hori-selector">
              <div className="left"></div>
              <div className="right"></div>
            </div>
            <li className="nav-item active">

              {/* <span className="far fa-address-book" /> */}
              <Link
                style={currentTab(history, "/")}
                className="nav-link"
                to="/">
                Home
                </Link>

            </li>
            <li className="nav-item">

              {/* <i className="fas fa-tachometer-alt"></i> */}
              <Link
                style={currentTab(history, "/cart")}
                className="nav-link"
                to="/cart"
              >
                Cart
                </Link>

            </li>

            {isAuthenticated() && isAuthenticated().user.role === 0 && (
              <li className="nav-item">

                {/* <i className="far fa-clone"></i> */}
                <Link
                  style={currentTab(history, "/user/dashboard")}
                  className="nav-link"
                  to="/user/dashboard"
                >
                  Dashboard
                  </Link>

              </li>
            )}

            {isAuthenticated() && isAuthenticated().user.role === 1 && (
              <li className="nav-item">

                {/* <i className="far fa-calendar-alt"></i> */}
                <Link
                  style={currentTab(history, "/admin/dashboard")}
                  className="nav-link"
                  to="/admin/dashboard"
                >
                  Admin Dashboard
                  </Link>

              </li>
            )}

            {!isAuthenticated() && (
              <Fragment>
                <li className="nav-item">

                  {/* <i className="far fa-chart-bar"></i> */}
                  <Link
                    style={currentTab(history, "/signup")}
                    className="nav-link"
                    to="/signup"
                  >
                    signup
                    </Link>

                </li>
                <li className="nav-item">

                  {/* <i className="far fa-copy"></i> */}
                  <Link
                    style={currentTab(history, "/signin")}
                    className="nav-link"
                    to="/signin"
                  >
                    signin
                    </Link>

                </li>
              </Fragment>
            )}

            {isAuthenticated() && (
              <li className="nav-item">

                {/* <i className="far fa-copy"></i>{" "} */}
                <Link
                  to="/"
                  className="nav-link text-warning"
                  onClick={() => {
                    signout(() => {
                      history.push("/");
                    });
                  }}
                >
                  signout
                  </Link>

              </li>
            )}
          </ul>
        </div>
      </nav>
    </>
  );
};

export default withRouter(Menu);
