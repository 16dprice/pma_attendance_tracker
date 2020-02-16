import React from 'react';
import { BrowserRouter as Router, Route} from "react-router-dom";
import "bootstrap/dist/css/bootstrap.min.css";
import "bootstrap/dist/js/bootstrap.min";

import Navbar from "./components/navbar.component";
import Login from "./components/login.component";

import MembersListComponent from "./components/members-list.component";
import EventsList from "./components/events-list.component";
import RoadiesList from "./components/roadies-list.component";
import RoadieSignup from "./components/roadie-signup.component";

import AttendanceList from "./components/attendance-list.component";
import CreateMember from "./components/create-member.component";
import CreateEvent from "./components/create-event.component";
import CreateRoadie from "./components/create-roadie.component";
import MemberAnalytics from "./components/member-analytics.component";

import PermChecker from "./perm_checker";

function getNavbar() {
    const permChecker = new PermChecker();

    if(permChecker.member) {
        return [ <Navbar/>, <br/> ];
    }
    return [ <Navbar/>, <br/> ];
}

function getAvailableViews() {

    const permChecker = new PermChecker();

    if(!permChecker.member) {
        return [ <Route path="/" exact component={Login} /> ];
    }

    if(permChecker.isDev()) {
        return [
            <Route path="/members" exact component={MembersListComponent}/>,
            <Route path="/events" exact component={EventsList}/>,
            <Route path="/roadies" exact component={RoadiesList}/>,

            <Route path="/event/attendance-record/:uuid" component={AttendanceList}/>,
            <Route path="/members/create" component={CreateMember}/>,
            <Route path="/roadies-signup/:uuid" component={RoadieSignup}/>,
            <Route path="/events/create" component={CreateEvent}/>,
            <Route path="/roadies/create" component={CreateRoadie}/>,
            <Route path="/analytics/:memberNumber" component={MemberAnalytics}/>
        ];
    }
    return [
        <Route path="/members" exact component={MembersListComponent}/>,
        <Route path="/events" exact component={EventsList}/>,
        <Route path="/roadies" exact component={RoadiesList}/>,

        <Route path="/event/attendance-record/:uuid" component={AttendanceList}/>,
        <Route path="/members/create" component={CreateMember}/>,
        <Route path="/roadies-signup/:uuid" component={RoadieSignup}/>,
        <Route path="/events/create" component={CreateEvent}/>,
        <Route path="/roadies/create" component={CreateRoadie}/>,
        <Route path="/analytics/:memberNumber" component={MemberAnalytics}/>
    ];

    // default views
    let availableViews = [
        <Route path="/members" exact component={MembersListComponent}/>,
        <Route path="/events" exact component={EventsList}/>,
        <Route path="/roadies" exact component={RoadiesList}/>,

        <Route path="/roadies-signup/:uuid" component={RoadieSignup}/>
    ];

    if(permChecker.isPres() || permChecker.isWarden()) {
        availableViews.push( <Route path="/event/attendance-record/:uuid" component={AttendanceList}/> );
        availableViews.push( <Route path="/analytics/:memberNumber" component={MemberAnalytics}/> );
        availableViews.push( <Route path="/events/create" component={CreateEvent}/> );
    }

    if(permChecker.isPres() || permChecker.isFEO()) {
        availableViews.push( <Route path="/members/create" component={CreateMember}/> );
    }

    if(permChecker.isVP()) {
        availableViews.push( <Route path="/roadies/create" component={CreateRoadie}/> );
    }

    return availableViews;

}

function App() {

    return (
        <Router>
            <div className="container-fullwidth">
                {getNavbar()}
            </div>
            <div className="container">
                {getAvailableViews()}
            </div>
        </Router>
    );
}

export default App;
