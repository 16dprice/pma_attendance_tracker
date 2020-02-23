import React, { Component } from "react";
import { Link } from 'react-router-dom';
import axios from 'axios';

import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faCalendarPlus } from '@fortawesome/free-solid-svg-icons';

import { confirmAlert } from 'react-confirm-alert';
import 'react-confirm-alert/src/react-confirm-alert.css';

import PermChecker from "../perm_checker";

class Event extends Component {

    constructor(props) {
        super(props);

        this.deleteEvent = this.deleteEvent.bind(this);

        this.state = {
            event: props.event
        };

    }

    deleteEvent(e) {

        e.preventDefault();

        confirmAlert({
            // title: `You are about to delete event '${this.state.event.description}' on ${this.state.event.date}`,
            title: 'Deleting this event is permanent.',
            message: `Are you sure you want to delete the event '${this.state.event.description}' that occurred on ${this.state.event.date}?`,
            buttons: [
                {
                    label: 'Yes',
                    onClick: () => {
                        axios.delete('https://pmaiotamuattendance.neat-url.com:5000/api/events/' + this.state.event.uuid)
                            .then(res => {
                                console.log(res.data);
                                window.location = '/events';
                            })
                            .catch(err => console.log(err));
                    }
                },
                {
                    label: 'No'
                }
            ]
        });

    }

    getEventDescription() {

        const permChecker = new PermChecker();

        if(permChecker.isPres() || permChecker.isWarden()) {
            return <Link to={"/event/attendance-record/" + this.state.event.uuid} >{this.state.event.description}</Link>;
        }
        return this.state.event.description;

    }

    render() {
        return (
            <tr>
                <td>{this.getEventDescription()}</td>
                <td>{this.state.event.date}</td>
                <td>{this.state.event.call_time}</td>
                <td><a onClick={this.deleteEvent} href='#'>Delete</a></td>
            </tr>
        );
    }

}

export default class EventsList extends Component {

    constructor(props) {
        super(props);
        this.state = { events: [] };
    }

    componentDidMount() {
        axios.get('https://pmaiotamuattendance.neat-url.com:5000/api/events')
            .then(res => {
                this.setState({
                    events: res.data
                });
            })
            .catch(err => console.log('Error: ' + err));
    }

    getHeader() {

        const permChecker = new PermChecker();

        if(permChecker.isPres() || permChecker.isWarden()) {
            return <h3>Events | <Link to={"/events/create"}><FontAwesomeIcon icon={faCalendarPlus}/></Link></h3>;
        }
        return <h3>Events</h3>;

    }

    eventList() {
        const sortedEvents = this.state.events
            .sort((a, b) => new Date(`${b.date} ${b.call_time}`) - new Date(`${a.date} ${a.call_time}`));
        return sortedEvents.map(event => {
            return <Event event={event} key={event.uuid} />
        });
    }

    render() {
        return (
            <div>
                {this.getHeader()}
                <table className="table table-bordered text-center">
                    <thead className="thead-light">
                    <tr>
                        <th>Description</th>
                        <th>Date</th>
                        <th>Call Time</th>
                        <th> </th>
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
