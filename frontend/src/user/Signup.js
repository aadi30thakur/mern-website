import React, { useState } from "react";
import Base from "../core/Base";
import { signup } from "../auth/helper";

import { Link } from "react-router-dom";

const Signup = () => {
  const [values, setValues] = useState({
    name: "",
    email: "",
    password: "",
    error: "",
    success: false,
  });
  const { name, email, password, error, success } = values;

  const handleChange = (name) => (event) => {
    setValues({ ...values, error: false, [name]: event.target.value });
  };
  const onSubmit = (event) => {
    event.preventDefault();
    setValues({ ...values, error: false });
    signup({ name, email, password })
      .then((data) => {
        if (data.error) {
          setValues({ ...values, error: data.error, success: false });
        } else {
          setValues({
            ...values,
            name: "",
            email: "",
            password: "",
            error: "",
            success: true,
          });
        }
      })
      .catch(console.log("error in signup"));
  };

  const SuccessMessage = () => {
    return (
      <div className="row">
        <div className="col-md-6 offset-sm-3 text-left">
          <div
            className="alert alert-success"
            style={{ display: success ? "" : "none" }}
          >
            {" "}
            New account was created successfully
            <Link to="/signin">login here</Link>
          </div>
        </div>
      </div>
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

  const signUpForm = () => {
    return (
      <div className="row">
        <div className="col-md-6 offset-sm-3 text-left">
          <form action="">
            <div className="form-group">
              <div className="row">
                <label className="text-light col-md-3 offset-md-2 mt-auto">
                  Name :
                </label>
                <input
                  className="col-md-6 form-control"
                  type="text"
                  name=""
                  id=""
                  value={name}
                  onChange={handleChange("name")}
                />
              </div>
            </div>
            <div className="form-group">
              <div className="row">
                <label className="text-light col-md-3 offset-md-2 mt-auto">
                  Email :
                </label>
                <input
                  className="col-md-6 form-control"
                  type="email"
                  name=""
                  id=""
                  value={email}
                  onChange={handleChange("email")}
                />
              </div>
            </div>
            <div className="form-group">
              <div className="row">
                <label className="text-light col-md-3 offset-md-2 mt-auto">
                  Password :
                </label>
                <input
                  className="col-md-6 form-control"
                  type="password"
                  name=""
                  id=""
                  value={password}
                  onChange={handleChange("password")}
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
    <Base title="Signup page" Description="a page for user signup!!">
      {SuccessMessage()}
      {errorMessage()}
      {signUpForm()}
      <p className="text-white text-center">{JSON.stringify({ values })}</p>
    </Base>
  );
};

export default Signup;
