import React from "react";
import Menu from "./menu";

const Base = ({
  title = "my title",
  description = "my description",
  className = "bg-dark text-white p-4",
  children,
}) => (
  <div>
    <Menu />
    <div className="container-fluid">
      <div className="jumbotron bg-dark text-white text-center">
        <h2 className="display-2">{title}</h2>
        <p className="lead">{description}</p>
      </div>
      <div className={className}>{children}</div>
    </div>
    <footer className="footer bg-dark mt-auto py-3 ">
      <div className="container-fluid text-center bg-success text-white">
        <h1>if you got ant questions feel free to ask </h1>
        <button className="btn btn-warning btn-lg">contact us</button>
      </div>
      <div className="container">
        <span className="text-muted">anamaxing mern bootacmp</span>
      </div>
    </footer>
  </div>
);

export default Base;
