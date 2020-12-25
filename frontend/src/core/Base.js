import React from "react";
import Menu from "./menu";

const Base = ({
  title = "my title",
  description = "my description",
  className = "  p-4",
  children,
}) => (
  <div>
    <Menu />
    <div className="container-fluid">
      <div className="   text-center">
        <h2 className="display-2">{title}</h2>
        <p className="lead">{description}</p>
      </div>
      <div className={className}>{children}</div>
    </div>

  </div>
);

export default Base;
