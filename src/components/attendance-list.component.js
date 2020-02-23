import React, { Component } from "react";
import axios from 'axios';

class AttendanceRecord extends Component {

    constructor(props) {
        super(props);

        this.onChangeAttendanceStatus = this.onChangeAttendanceStatus.bind(this);
        this.updateRecord = this.updateRecord.bind(this);

        this.state = {
            record_id: this.props.record.id,
            eventUuid: this.props.record.eventUuid,
            first_name: this.props.record.first_name,
            last_name: this.props.record.last_name,
            attendance_status: this.props.record.attendance
        };

    }

    onChangeAttendanceStatus(e) {
        this.setState({
            attendance_status: e.target.value
        });
    }

    updateRecord(e) {
        e.preventDefault(e);

        console.log(this.state);
        const attendanceUpdateInfo = {
            attendance: this.state.attendance_status
        };

        axios.post('https://pmaiotamuattendance.neat-url.com:5000/api/attendance/update/' + this.state.record_id, attendanceUpdateInfo)
            .then(res => {
                console.log(res.data);
                window.location = '/event/attendance-record/' + this.state.eventUuid;
            })
            .catch(err => console.log('Error: ' + err));
    }

    render() {
        return (
            <tr>
                <td>{this.state.first_name} {this.state.last_name}</td>
                <td>
                    <select value={this.state.attendance_status}
                            onChange={this.onChangeAttendanceStatus}
                    >
                        <option value='P'>Present</option>
                        <option value='E'>Excused</option>
                        <option value='U'>Unexcused</option>
                        <option value='T'>Tardy</option>
                    </select>
                </td>
                <td><a href="#" onClick={this.updateRecord}>Update Status</a></td>
            </tr>
        );
    }

}

export default class AttendanceList extends Component {

    constructor(props) {
        super(props);
        this.state = {
            eventName: '',
            eventDate: '',
            attendanceRecords: []
        };
    }

    componentDidMount() {
        axios.get('https://pmaiotamuattendance.neat-url.com:5000/api/attendance/attendance-list/?eventUuid=' + this.props.match.params.uuid)
            .then(res => {
                this.setState({
                    attendanceRecords: res.data
                });
            })
            .catch(err => console.log('Error: ' + err));
        axios.get('https://pmaiotamuattendance.neat-url.com:5000/api/events/?uuid=' + this.props.match.params.uuid)
            .then(res => {
                console.log(res.data[0]);
                this.setState({
                    eventName: res.data[0].description,
                    eventDate: res.data[0].date
                });
            })
            .catch(err => console.log('Error: ' + err));
    }

    attendanceList() {
        return this.state.attendanceRecords.map(record => {
            return <AttendanceRecord record={record} key={record.id}/>
        })
    }

    render() {
        return (
            <div>
                <h3>Attendance Record for <u>{this.state.eventName}</u> on <u>{this.state.eventDate}</u></h3>
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
