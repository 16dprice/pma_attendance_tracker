import React from 'react';
import { BrowserRouter as Router, Route} from "react-router-dom";
import "bootstrap/dist/css/bootstrap.min.css";
import Cookies from 'js-cookie';

import Navbar from "./components/navbar.component";
import Login from "./components/login.component";
import MembersListComponent from "./components/members-list.component";
import EventsList from "./components/events-list.component";
import RoadiesList from "./components/roadies-list.component";
import AttendanceList from "./components/attendance-list.component";
import CreateMember from "./components/create-member.component";
import CreateEvent from "./components/create-event.component";
import CreateRoadie from "./components/create-roadie.component";
import MemberAnalytics from "./components/member-analytics.component";

function App() {

  const member = JSON.parse(Cookies.get('member') === undefined ? null : Cookies.get('member'));

  // everyone can see login page
    // everyone can see members page
    // everyone can see events page
    // everyone can see roadies page
    // only Warden and President can see attendance list
    // only FEO and President can create members
    // only VP can create roadies
    // only Warden and President can see members analytics

  if(!member) {
    return (
      <Router>
        <div className="container">
          <Route path="/" exact component={Login} />
        </div>
      </Router>
    );
  } else {
    return (
        <Router>
          <div className="container">
            <Navbar />
            <br/>
            <Route path="/members" exact component={MembersListComponent}/>
            <Route path="/events" exact component={EventsList}/>
            <Route path="/roadies" exact component={RoadiesList}/>
            <Route path="/event/attendance-record/:uuid" component={AttendanceList}/>
            <Route path="/members/create" component={CreateMember}/>
            <Route path="/events/create" component={CreateEvent}/>
            <Route path="/roadies/create" component={CreateRoadie}/>
            <Route path="/analytics/:memberNumber" component={MemberAnalytics}/>
          </div>
        </Router>
    );
  }
}

export default App;
