import React, { Component } from "react";
import { Link } from 'react-router-dom';
import axios from 'axios';
import moment from "moment";

import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faCalendarPlus } from '@fortawesome/free-solid-svg-icons'; // TODO: change this to something better

import PermChecker from "../perm_checker";
import {confirmAlert} from "react-confirm-alert";
import {config} from "../constants";

class Roadie extends Component {

    constructor(props) {
        super(props);

        this.deleteRoadie = this.deleteRoadie.bind(this);

        this.state = {
            roadie: props.roadie
        };

    }

    getReadableDate() {
        return moment(this.state.roadie.date).format('dddd, MMMM Do');
    }

    getReadableTime() {
        return moment(this.state.roadie.date + ' ' + this.state.roadie.call_time).format('h:mm a');
    }

    deleteRoadie(e) {

        e.preventDefault();

        confirmAlert({
            title: 'Deleting this roadie is permanent.',
            message: `Are you sure you want to delete the roadie at '${this.state.roadie.location}' that occurred on ${this.state.roadie.date}?`,
            buttons: [
                {
                    label: 'Yes',
                    onClick: () => {
                        axios.delete(`${config.url.API_URL}/api/roadies/${this.state.roadie.uuid}`)
                            .then(res => {
                                console.log(res.data);
                                window.location = '/roadies';
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

    render() {
        const permChecker = new PermChecker();
        let roadieDelete = null;
        if(permChecker.isVP()) {
            roadieDelete = <td onClick={(e) => e.stopPropagation()}><a onClick={this.deleteRoadie} href='#'>Delete</a></td>;
        }

        return (
            <tr onClick={() => window.location = `/roadies-signup/${this.state.roadie.uuid}`}>
                <td>{this.state.roadie.location}</td>
                <td className="members-needed">{this.state.roadie.members_needed}</td>
                <td>{this.getReadableDate()}</td>
                <td>{this.getReadableTime()}</td>
                {roadieDelete}
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
        axios.get(`${config.url.API_URL}/api/roadies`)
            .then(res => {
                this.setState({
                    roadies: res.data
                });
            })
            .catch(err => console.log('Error: ' + err));
    }

    getHeader() {

        const permChecker = new PermChecker();

        if(permChecker.isVP()) {
            return <h3>Roadies | <Link to={"/roadies/create"}><FontAwesomeIcon icon={faCalendarPlus}/></Link></h3>;
        }
        return <h3>Roadies</h3>;

    }

    roadieList() {
        const sortedRoadies = this.state.roadies
            .sort((a, b) => new Date(`${b.date} ${b.call_time}`) - new Date(`${a.date} ${a.call_time}`));
        return sortedRoadies.map(roadie => {
            return <Roadie roadie={roadie} key={roadie.uuid} />
        });
    }

    render() {
        const permChecker = new PermChecker();
        const roadieDelete = permChecker.isVP() ? <th></th> : null;
        return (
            <div>
                {this.getHeader()}
                <table className="table table-bordered text-center">
                    <thead className="thead-light">
                    <tr>
                        <th>Location</th>
                        <th className="members-needed">Members Needed</th>
                        <th>Date</th>
                        <th>Call Time</th>
                        {roadieDelete}
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
