import React, { Component } from "react";
import axios from 'axios';

export default class Login extends Component {

    constructor(props) {
        super(props);

        this.onChangeMemberNumber = this.onChangeMemberNumber.bind(this);
        this.onChangePassword = this.onChangePassword.bind(this);
        this.onSubmit = this.onSubmit.bind(this);

        this.state = {
            member_number: '',
            password: ''
        };
    }

    onChangeMemberNumber(e) {
        this.setState({
            member_number: e.target.value
        });
    }

    onChangePassword(e) {
        this.setState({
            password: e.target.value
        });
    }

    onSubmit(e) {
        e.preventDefault();

        const payload = {
            member_number: this.state.member_number,
            password: this.state.password
        };

        axios.post('http://localhost:5000/api/members/login', payload)
            .then(res => {
                const { location, errors } = res.data;
                if(location) {
                    window.location = location;
                } else if(errors) {
                    // TODO: do a bit more than just logging this to the console
                    console.log(errors);
                }
            })
            .catch(err => console.log(err));

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
                                <form onSubmit={this.onSubmit}>
                                    <div className="form-group">
                                        <input type="text"
                                               id="inputMemberNumber"
                                               className="form-control"
                                               placeholder="Member Number"
                                               onChange={this.onChangeMemberNumber}
                                               required
                                               autoFocus
                                        />
                                    </div>
                                    <div className="form-group">
                                        <input type="password"
                                               id="inputPassword"
                                               className="form-control"
                                               placeholder="Password"
                                               onChange={this.onChangePassword}
                                               required
                                        />
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