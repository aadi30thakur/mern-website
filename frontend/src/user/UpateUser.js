import { isAuthenticated } from "../auth/helper";
import React, { useEffect, useState } from 'react'
import Base from '../core/Base'
import { updateUser, getUser } from "./helper/userapicalls";
import { Link } from "react-router-dom";
const UpdateUser = () => {

    const { user, token } = isAuthenticated();
    const backBtn = () => (
        <div className="mt-5">
            <Link className="btn btn-sm btn-warning mb-3 mt-2" to="/user/dashboard">
                <span className="fa fa-chevron-left" aria-hidden="true"></span> back to
                admin dashbard
            </Link>
        </div>

    )

    const [values, setValues] = useState({
        id: "",
        name: "",
        email: "",
        password: "",
        error: "",
        success: false,
    });
    const { name, email, password, error, success } = values;
    const preload = () => {
        getUser(user, token)
            .then((data) => {
                // console.log(data);
                if (data.error) {
                    setValues({ ...values, error: data.error });
                } else {
                    setValues({ ...values, id: data._id, name: data.name, email: data.email })

                }
            })
            .catch(e => console.log(e))
    }

    useEffect(() => {
        preload();

    }, [])
    const handleChange = (name) => (event) => {
        setValues({ ...values, error: false, [name]: event.target.value });
    };
    const onSubmit = (event) => {
        event.preventDefault();
        setValues({ ...values, error: false });
        updateUser(values, token)
            .then((data) => {
                // console.log(data);
                if (data.error) {
                    setValues({ ...values, error: data.error, success: false });
                } else {
                    setValues({ ...values, success: true })
                }
            })
            .catch(console.log("error in update"));
    };

    const SuccessMessage = () => {
        return (
            <div className="row">
                <div className="col-md-8 offset-sm-2 text-left">
                    <div
                        className="alert alert-success"
                        style={{ display: success ? "" : "none" }}
                    >
                        {console.log(success)}
                Credentials  Updated successfully
                <Link to="/user/dashboard">GO to Dashboard</Link>
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

    const updateForm = () => {
        return (
            <div className="row d-flex align-content-center">
                <div className="col-md-10 offset-1 text-center">
                    <form className="bg-white p-5 mb-5" action="">
                        <div className="form-group">
                            <div className="row">
                                <label className="text-dark col-md-3 offset-md-2 mt-auto">
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
                                <label className="text-dark col-md-3 offset-md-2 mt-auto">
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
                                <label className="text-dark col-md-3 offset-md-2 mt-auto">
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
                        <div className="col-10 offset-md-2">
                            <button onClick={onSubmit} className="btn btn-success form-control col-11">
                                submit
                  </button>
                        </div>
                    </form>
                </div>
            </div>
        );
    };




    return (
        <Base title="Update Profile" description="" className="container bg-success">
            {errorMessage()}
            {SuccessMessage()}
            {backBtn()}
            {updateForm()}
        </Base>
    )
}

export default UpdateUser;
