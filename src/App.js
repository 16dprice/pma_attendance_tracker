import React from 'react';
import { BrowserRouter as Router, Route} from "react-router-dom";
import "bootstrap/dist/css/bootstrap.min.css";

import Navbar from "./components/navbar.component";
import MembersList from "./components/members-list";
import EventsList from "./components/events-list.component";
import RoadiesList from "./components/roadies-list.component";
import AttendanceList from "./components/attendance-list.component";
import CreateMember from "./components/create-member.component";
import CreateEvent from "./components/create-event.component";
import MemberAnalytics from "./components/member-analytics.component";

function App() {
  return (
    <Router>
      <div className="container">
        <Navbar />
        <br/>
        <Route path="/members" exact component={MembersList} />
        <Route path="/events" exact component={EventsList} />
        <Route path="/roadies" exact component={RoadiesList} />
        <Route path="/event/attendance-record/:uuid" component={AttendanceList} />
        <Route path="/members/create" component={CreateMember} />
        <Route path="/events/create" component={CreateEvent} />
        <Route path="/analytics/:memberNumber" component={MemberAnalytics} />
      </div>
    </Router>
  );
}

export default App;
