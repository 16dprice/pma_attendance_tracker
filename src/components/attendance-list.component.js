import React, { Component } from "react";
import axios from 'axios';

import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faSave } from '@fortawesome/free-solid-svg-icons'

function attendanceEnumToCleanText(letter) {
    switch(letter) {
        case 'P':
            return 'Present';
        case 'E':
            return 'Excused';
        case 'U':
            return 'Unexcused';
        case 'T':
            return 'Tardy';
        default:
            return 'Present';
    }
}

const AttendanceRecord = props => (
    <tr>
        <td>{props.record.first_name} {props.record.last_name}</td>
        <td>{attendanceEnumToCleanText(props.record.attendance)}</td>
        <td><FontAwesomeIcon icon={faSave} size='2x' /></td>
    </tr>
);

export default class AttendanceList extends Component {

    constructor(props) {
        super(props);
        this.state = {
            eventName: '',
            attendanceRecords: []
        };
    }

    componentDidMount() {
        axios.get('http://localhost:5000/api/attendance/attendance-list/?eventUuid=' + this.props.match.params.uuid)
            .then(res => {
                this.setState({
                    attendanceRecords: res.data
                });
            })
            .catch(err => console.log('Error: ' + err));
        axios.get('http://localhost:5000/api/events/?uuid=' + this.props.match.params.uuid)
            .then(res => {
                this.setState({
                    eventName: res.data[0].description
                });
            })
            .catch(err => console.log('Error: ' + err));
    }

    attendanceList() {
        return this.state.attendanceRecords.map(record => {
            return <AttendanceRecord record={record} key={record.id} />
        })
    }

    render() {
        console.log(this.props.match.params.uuid);
        return (
            <div>
                <h3>Attendance Record for <u>{this.state.eventName}</u></h3>
                <table className="table table-bordered text-center">
                    <thead className="thead-light">
                    <tr>
                        <th>Name</th>
                        <th>Attendance Status</th>
                        <th> </th>
                    </tr>
                    </thead>
                    <tbody>
                    { this.attendanceList() }
                    </tbody>
                </table>
            </div>
        );
    }

}