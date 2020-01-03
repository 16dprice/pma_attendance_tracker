import React from 'react';
import { BrowserRouter as Router, Route} from "react-router-dom";
import "bootstrap/dist/css/bootstrap.min.css";

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

  // TODO: want to do more checks here to determine if the member signed in is Pres, VP, Warden, etc to determine what he should see

  let navbar = null;
  let loggedIn = true;
  if(loggedIn) {
    navbar = <Navbar />;
  }

  return (
    <Router>
      <div className="container">
        {navbar}
        <br/>
        <Route path="/" exact component={Login} />
        <Route path="/members" exact component={MembersListComponent} />
        <Route path="/events" exact component={EventsList} />
        <Route path="/roadies" exact component={RoadiesList} />
        <Route path="/event/attendance-record/:uuid" component={AttendanceList} />
        <Route path="/members/create" component={CreateMember} />
        <Route path="/events/create" component={CreateEvent} />
        <Route path="/roadies/create" component={CreateRoadie} />
        <Route path="/analytics/:memberNumber" component={MemberAnalytics} />
      </div>
    </Router>
  );
}

export default App;
