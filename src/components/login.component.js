import React, { Component } from "react";

export default class Login extends Component {

    constructor(props) {
        super(props);
    }

    render() {
        // TODO: consider adding more stuff to tell about the website on the login page
        return (
            <div className="container-sm align-middle h-100">
                <div className="row">
                    <div className="col-sm-9 col-md-7 col-lg-5 mx-auto">
                        <div className="card my-5">
                            <div className="card-body">
                                <h5 className="card-title text-center">Sign In</h5>
                                <form>
                                    <div className="form-group">
                                        <input type="email" id="inputEmail" className="form-control" placeholder="Email address" required autoFocus />
                                    </div>
                                    <div className="form-group">
                                        <input type="password" id="inputPassword" className="form-control" placeholder="Password" required />
                                    </div>
                                    <div className="form-group custom-control custom-checkbox mb-3">
                                        <input type="checkbox" className="custom-control-input" id="customCheck1" />
                                        <label className="custom-control-label" htmlFor="customCheck1">
                                            Remember password
                                        </label>
                                    </div>
                                    <button className="btn btn-lg btn-primary btn-block text-uppercase" type="submit">
                                        Sign in
                                    </button>
                                </form>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        )

    }

}