import React from "react";
import Base from "../core/Base";

import { isAuthenticated } from "../auth/helper";
import { Link } from "react-router-dom";

const AdminDashboard = () => {
  const {
    user: { name, email, role },
  } = isAuthenticated();
  const adminLeftSide = () => {
    return (
      <div className="card">
        <h4 className="card-header bg-dark text-white">Navigation</h4>
        <ul className="list-group">
          <li className="list-group-item">
            <Link to="/admin/create/category" className="nav-link text-success">
              Create Categories
            </Link>
          </li>
          <li className="list-group-item">
            <Link to="/admin/categories" className="nav-link text-success">
              manage categories
            </Link>
          </li>
          <li className="list-group-item">
            <Link to="/admin/create/products" className="nav-link text-success">
              Create product
            </Link>
          </li>
          <li className="list-group-item">
            <Link to="/admin/products" className="nav-link text-success">
              manage products
            </Link>
          </li>
          <li className="list-group-item">
            <Link to="/admin/orders" className="nav-link text-success">
              manage orders
            </Link>
          </li>
        </ul>
      </div>
    );
  };
  const adminrightSide = () => {
    return (
      <div>
        <div className="card mb-4">
          <h4 className="card-header">admin information</h4>
          <ul className="list-group">
            <li className="list-group-item">
              <span className="badge badge-success mr-2">Name:</span>
              {name}
            </li>{" "}
            <li className="list-group-item">
              <span className="badge badge-success mr-2">Email:</span>
              {email}
            </li>
            <li className="list-group-item">
              <span className="badge badge-danger">admin area</span>
            </li>
          </ul>
        </div>
      </div>
    );
  };

  return (
    <Base
      title="welcome  to admin area"
      description="manage all of your products here"
      className="container bg-success  p-4"
    >
      <div className="row">
        <div className="col-md-3">{adminLeftSide()}</div>
        <div className="col-md-9">{adminrightSide()}</div>
      </div>
    </Base>
  );
};

export default AdminDashboard;
