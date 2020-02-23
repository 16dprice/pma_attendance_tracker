import React, { Component } from 'react';
import { Link } from 'react-router-dom';
import axios from 'axios';
import Cookies from 'js-cookie';

export default class Navbar extends Component {

    constructor(props) {
        super(props);

        this.onLogout = this.onLogout.bind(this);
    }

    onLogout(e) {
        e.preventDefault();

        axios.get('https://pmaiotamuattendance.neat-url.com:5000/api/members/logout')
            .then(res => {
                Cookies.remove('member');
                if(res.data.location) window.location = res.data.location;
            })
            .catch(err => console.log(err));
    }

    render() {
        return(
            <nav className="navbar navbar-dark bg-dark navbar-expand-md">
                <Link to="/members" className="navbar-brand">&Phi;&Mu;&Alpha;</Link>
                <button className="navbar-toggler" type="button" data-toggle="collapse" data-target="#menu">
                    <span className="navbar-toggler-icon"></span>
                </button>
                <div id="menu" className="collapse navbar-collapse">
                    <ul className="navbar-nav mr-auto">
                        <li className="navbar-item">
                            <Link to="/members" className="nav-link">Members</Link>
                        </li>
                        <li className="navbar-item">
                            <Link to="/events" className="nav-link">Events</Link>
                        </li>
                        <li className="navbar-item">
                            <Link to="/roadies" className="nav-link">Roadies</Link>
                        </li>
                    </ul>
                    <ul className="navbar-right navbar-nav">
                        <li className="navbar-item">
                            <button className="btn btn-secondary" onClick={this.onLogout}>Logout</button>
                        </li>
                    </ul>
                </div>
            </nav>
        );
    }

}
