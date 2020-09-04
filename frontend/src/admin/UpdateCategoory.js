import React, { useState } from "react";
import Base from "../core/Base";
import { isAuthenticated } from "../auth/helper";
import { Link } from "react-router-dom";
import { UpdateCategory, getCategory } from "./helper/adminapicall";
import { useEffect } from "react";

const UpdateCategoory = ({ match }) => {
  const [name, setName] = useState("");

  const [error, setError] = useState(false);
  const [success, setSuccess] = useState(false);

  const preload = (categoryId) => {
    getCategory(categoryId).then((data) => {
      if (data.error) {
        setError(data.error);
      } else {
        setName(data.name);
      }
    });
  };

  useEffect(() => {
    preload(match.params.categoryId);
  }, []);

  const { user, token } = isAuthenticated();
  const goBack = () => (
    <div className="mt-5">
      <Link className="btn btn-sm btn-warning mb-3" to="/admin/dashboard">
        <span className="fa fa-chevron-left" aria-hidden="true"></span> back to
        admin dashbard
      </Link>
    </div>
  );

  const handleChange = (event) => {
    setError("");
    setName(event.target.value);
  };
  const onSubmit = (event) => {
    event.preventDefault();
    setError("");
    setSuccess(false);
    // backend req fired

    UpdateCategory(match.params.categoryId, user._id, token, { name })
      .then((data) => {
        if (data.error) {
          setError(data.error);
        } else {
          setError("");
          setSuccess(true);
          setName("");
        }
      })
      .catch((err) => {
        console.log(err);
      });
  };

  const successMessage = () => {
    if (success) {
      return <h4 className="text-success">category created successfully</h4>;
    }
  };

  const warningMessage = () => {
    if (error) {
      return <h4 className="text-danger">{error}</h4>;
    }
  };

  const myCategoryForm = () => (
    <form action="">
      <div className="form-group">
        <p className="lead">enter the category</p>
        <input
          type="text"
          className="form-control my-3"
          autoFocus
          required
          value={name}
          onChange={handleChange}
          placeholder="ex. summer"
        />
        <button onClick={onSubmit} className="btn btn-outline-info">
          Update Cxxxxxxxategory
        </button>
      </div>
    </form>
  );

  return (
    <Base
      title="create a category herre"
      description="add a new category  for new tshirts"
      className="container bg-info p-4"
    >
      <div className="rw bg-white rounded">
        <div className="col-md-8 offset-md-2">
          {goBack()}
          {successMessage()}
          {warningMessage()}
          {myCategoryForm()}
        </div>
      </div>
    </Base>
  );
};

export default UpdateCategoory;
