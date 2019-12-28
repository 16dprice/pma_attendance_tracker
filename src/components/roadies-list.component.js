import React, { Component } from "react";
import { Link } from 'react-router-dom';
import axios from 'axios';

import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faCalendarPlus } from '@fortawesome/free-solid-svg-icons'; // TODO: change this to something better

class Roadie extends Component {

    constructor(props) {
        super(props);

        // this.deleteEvent = this.deleteEvent.bind(this);

        this.state = {
            roadie: props.roadie
        };

    }

    render() {
        return (
            // <tr>
            //     <td><Link to={"/event/attendance-record/" + this.state.event.uuid} >{this.state.event.description}</Link></td>
            //     <td>{this.state.event.date}</td>
            //     <td>{this.state.event.call_time}</td>
            //     <td><a onClick={this.deleteEvent} href='#'>Delete</a></td>
            // </tr>
            <tr>
                <td>{this.state.roadie.location}</td>
                <td>{this.state.roadie.members_needed}</td>
                <td>{this.state.roadie.date}</td>
                <td>{this.state.roadie.call_time}</td>
                <td><a onClick={console.log('TODO: delete roadie')} href='#'>Delete</a></td>
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
        console.log(sortedRoadies);
        return sortedRoadies.map(roadie => {
            return <Roadie roadie={roadie} key={roadie.uuid} />
        });
    }

    render() {
        return (
            <div>
                {/*<h3>Events | <Link to={"/events/create"}><FontAwesomeIcon icon={faCalendarPlus}/></Link></h3>*/}
                <h3>Roadies</h3>
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