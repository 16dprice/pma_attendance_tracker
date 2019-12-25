import React, { Component } from 'react';
import { Link } from 'react-router-dom';

export default class Navbar extends Component {

    render() {
        return(
            <nav className="navbar navbar-dark bg-dark navbar-expand-lg">
                <Link to="/members" className="navbar-brand">&Phi;&Mu;&Alpha;</Link>
                <div className="collapse navbar-collapse">
                    <ul className="navbar-nav mr-auto">
                        <li className="navbar-item">
                            <Link to="/members" className="nav-link">Members</Link>
                        </li>
                        <li className="navbar-item">
                            <Link to="/events" className="nav-link">Events</Link>
                        </li>
                    </ul>
                </div>
            </nav>
        );
    }

}