import React, { Component } from 'react';
import { Link } from 'react-router-dom';

export default class Navbar extends Component {

    render() {
        return(
            <nav className="navbar navbar-dark bg-dark navbar-expand-lg">
                <Link to="/" className="navbar-brand">&Phi;&Mu;&Alpha;</Link>
                <div className="collapse navbar-collapse">
                    <ul className="navbar-nav mr-auto">
                        <li className="navbar-item">
                            <Link to="/" className="nav-link">Home</Link>
                        </li>
                        <li className="navbar-item">
                            <Link to="/members" className="nav-link">Members</Link>
                        </li>
                        <li className="navbar-item">
                            <Link to="/events" className="nav-link">Events</Link>
                        </li>
                        <li className="navbar-item">
                            <Link to="/attendance" className="nav-link">Attendance</Link>
                        </li>
                        {/*<li className="navbar-item">*/}
                        {/*    <Link to="/events/4307577b-6143-4768-9ede-abfef64ce2c1" className="nav-link">Test</Link>*/}
                        {/*</li>*/}
                    </ul>
                </div>
            </nav>
        );
    }

}