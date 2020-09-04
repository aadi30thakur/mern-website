import React, { useState } from "react";
import Base from "../core/Base";

import { Redirect } from "react-router-dom";
import { signin, authenticate, isAuthenticated } from "../auth/helper";
const Signin = () => {
  const [values, setValues] = useState({
    email: "",
    password: "",
    error: "",
    loading: false,
    didRedirect: false,
  });

  const { email, password, error, loading, didRedirect } = values;

  const { user } = isAuthenticated();

  const handleChange = (name) => (event) => {
    setValues({ ...values, error: false, [name]: event.target.value });
  };
  const onSubmit = (event) => {
    event.preventDefault();
    setValues({ ...values, error: false, loading: true });
    signin({ email, password })
      .then((data) => {
        if (data.error) {
          setValues({ ...values, error: data.error, loading: false });
        } else {
          authenticate(data, () => {
            setValues({ ...values, didRedirect: true });
          });
        }
      })
      .catch((err) => {
        return console.log("signin failed", err);
      });
  };

  const performRedirect = () => {
    if (didRedirect) {
      if (user && user.role === 1) {
        return <Redirect to="/admin/dashboard" />;
      } else {
        return <Redirect to="/user/dashboard" />;
      }
    }
    if (isAuthenticated()) {
      return <Redirect to="/" />;
    }
  };

  const loadingMessage = () => {
    return (
      loading && (
        <div className="alert alert-info">
          <h2>loading</h2>
        </div>
      )
    );
  };

  const errorMessage = () => {
    return (
      <div className="row">
        <div className="col-md-6 offset-sm-3 text-left">
          <div
            className="alert alert-danger"
            style={{ display: error ? "" : "none" }}
          >
            {error}
          </div>
        </div>
      </div>
    );
  };

  const signInForm = () => {
    return (
      <div className="row">
        <div className="col-md-6 offset-sm-3 text-left">
          <form action="">
            <div className="form-group">
              <div className="row">
                <label className="text-light col-md-3 offset-md-2 mt-auto">
                  Email :
                </label>
                <input
                  onChange={handleChange("email")}
                  className="col-md-6 form-control"
                  type="email"
                  value={email}
                />
              </div>
            </div>
            <div className="form-group">
              <div className="row">
                <label className="text-light col-md-3 offset-md-2 mt-auto">
                  Password :
                </label>
                <input
                  onChange={handleChange("password")}
                  className="col-md-6 form-control"
                  type="password"
                  value={password}
                />
              </div>
            </div>
            <button onClick={onSubmit} className="btn btn-success btn-block">
              subiit
            </button>
          </form>
        </div>
      </div>
    );
  };

  return (
    <Base title="Signin page" Description="a page for user signin!!">
      {loadingMessage()}
      {errorMessage()}
      {signInForm()}
      {performRedirect()}

      {/* <p className="text-white text-center">{JSON.stringify(values)}</p> */}    
    </Base>
  );
};

export default Signin;
