import React from 'react';
import { BrowserRouter as Router, Route} from "react-router-dom";
import "bootstrap/dist/css/bootstrap.min.css";

import Navbar from "./components/navbar.component";
import MembersList from "./components/members-list";
import EventsList from "./components/events-list.component";
import AttendanceList from "./components/attendance-list.component";
import CreateMember from "./components/create-member.component";
import CreateEvent from "./components/create-event.component";

function App() {
  return (
    <Router>
      <div className="container">
        <Navbar />
        <br/>
        <Route path="/members" exact component={MembersList} />
        <Route path="/events" exact component={EventsList} />
        <Route path="/events/:uuid" exact component={AttendanceList} />
        <Route path="/members/create" component={CreateMember} />
        <Route path="/events/create" component={CreateEvent} />
      </div>
    </Router>
  );
}

export default App;
