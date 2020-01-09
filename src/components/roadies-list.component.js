import React, { Component } from "react";
import { Link } from 'react-router-dom';
import axios from 'axios';

import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faCalendarPlus } from '@fortawesome/free-solid-svg-icons'; // TODO: change this to something better

class Roadie extends Component {

    constructor(props) {
        super(props);

        // TODO: add deletion of roadie
        // this.deleteRoadie = this.deleteRoadie.bind(this);

        this.state = {
            roadie: props.roadie
        };

    }

    getReadableDate() {
        const date = new Date(this.state.roadie.date);

        const weekday = date.toLocaleString('en-us', { weekday: 'long' });
        const month = date.toLocaleString('en-us', { month: 'long' });
        const day = date.getDate();

        return `${weekday}, ${month} ${day}`;
    }

    getReadableTime() {
        let time = this.state.roadie.call_time;

        if(time !== undefined) {

            let isAM = true;

            time = time.split(':');

            let hour = Number(time[0]);
            if(hour > 12) {
                hour -= 12;
                isAM = false;
            }

            return `${hour}:${time[1]} ${isAM ? "AM" : "PM"}`;

        }
    }

    render() {
        return (
            <tr onClick={() => window.location = `/roadies-signup/${this.state.roadie.uuid}`}>
                <td>{this.state.roadie.location}</td>
                <td>{this.state.roadie.members_needed}</td>
                <td>{this.getReadableDate()}</td>
                <td>{this.getReadableTime()}</td>
                <td onClick={(e) => e.stopPropagation()}>
                    <a onClick={() => console.log('TODO: delete roadie')} href='#'>
                        Delete
                    </a>
                </td>
            </tr>
        );
    }

}


export default class RoadiesList extends Component {

    constructor(props) {
        super(props);
        this.state = { roadies: [] };
    }

    componentDidMount() {
        axios.get('http://localhost:5000/api/roadies')
            .then(res => {
                this.setState({
                    roadies: res.data
                });
            })
            .catch(err => console.log('Error: ' + err));
    }

    roadieList() {
        const sortedRoadies = this.state.roadies
            .sort((a, b) => new Date(`${b.date} ${b.call_time}`) - new Date(`${a.date} ${a.call_time}`));
        return sortedRoadies.map(roadie => {
            return <Roadie roadie={roadie} key={roadie.uuid} />
        });
    }

    render() {
        return (
            <div>
                <h3>Roadies | <Link to={"/roadies/create"}><FontAwesomeIcon icon={faCalendarPlus}/></Link></h3>
                <table className="table table-bordered text-center">
                    <thead className="thead-light">
                    <tr>
                        <th>Location</th>
                        <th>Members Needed</th>
                        <th>Date</th>
                        <th>Call Time</th>
                        <th> </th>
                    </tr>
                    </thead>
                    <tbody>
                    { this.roadieList() }
                    </tbody>
                </table>
            </div>
        );
    }

}
