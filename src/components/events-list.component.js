import React, { Component } from "react";
import { Link } from 'react-router-dom';
import axios from 'axios';

import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faCalendarPlus } from '@fortawesome/free-solid-svg-icons'

const Event = props => (
    <tr>
        <td><Link to={"/event/attendance-record/" + props.event.uuid} >{props.event.description}</Link></td>
        <td>{props.event.date}</td>
        <td>{props.event.call_time}</td>
    </tr>
);

export default class EventsList extends Component {

    constructor(props) {
        super(props);
        this.state = { events: [] };
    }

    componentDidMount() {
        axios.get('http://localhost:5000/api/events')
            .then(res => {
                this.setState({
                    events: res.data
                });
            })
            .catch(err => console.log('Error: ' + err));
    }

    eventList() {
        return this.state.events.map(event => {
            return <Event event={event} key={event.uuid} />
        });
    }

    render() {
        return (
            <div>
                <h3>Events | <Link to={"/events/create"}><FontAwesomeIcon icon={faCalendarPlus}/></Link></h3>
                <table className="table table-bordered text-center">
                    <thead className="thead-light">
                    <tr>
                        <th>Description</th>
                        <th>Date</th>
                        <th>Call Time</th>
                    </tr>
                    </thead>
                    <tbody>
                    { this.eventList() }
                    </tbody>
                </table>
            </div>
        );
    }

}