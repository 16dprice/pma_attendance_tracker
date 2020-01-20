import React, { Component } from "react";
import axios from 'axios'
import DatePicker from 'react-datepicker';
import "react-datepicker/dist/react-datepicker.css";

export default class CreateEvent extends Component {

    constructor(props) {
        super(props);

        this.onChangeDescription = this.onChangeDescription.bind(this);
        this.onChangeDate = this.onChangeDate.bind(this);
        this.onChangeCallTime = this.onChangeCallTime.bind(this);
        this.onSubmit = this.onSubmit.bind(this);

        this.state = {
            description: '',
            date: '',
            call_time: ''
        };
    }

    onChangeDescription(e) {
        this.setState({
            description: e.target.value
        });
    }

    onChangeDate(date) {
        this.setState({
            date: date
        });
    }

    onChangeCallTime(e) {
        this.setState({
            call_time: e.target.value
        });
    }

    generateMemberAttendanceRecords(eventUuid) {
        return new Promise((resolve, reject) => {
            // get all user records then generate attendance records from all of them
            axios.get('http://pmaiotamuattendance.neat-url.com:5000/api/members/?status=active')
                .then(res => {
                    const memberNumbers = res.data.map(member => member.member_number);
                    const postData = {
                        eventUuid,
                        memberNumbers
                    };
                    axios.post('http://pmaiotamuattendance.neat-url.com:5000/api/attendance/add_records', postData)
                        .then(res => resolve(res))
                        .catch(err => console.log(err));
                });
        });
    }

    onSubmit(e) {
        e.preventDefault();

        const event = {
            description: this.state.description,
            date: new Date(this.state.date),
            call_time: this.state.call_time
        };

        // use axios library to post something to the API endpoint
        axios.post('http://pmaiotamuattendance.neat-url.com:5000/api/events/add', event)
            .then(res => {
                // an event is returned in res.data
                this.generateMemberAttendanceRecords(res.data.uuid)
                    .then(res => { window.location = '/events' });
            })
            .catch(err => console.log('Error: ' + err));

    }

    render() {
        return (
            <div>
                <h3>Create New Event</h3>
                <form onSubmit={this.onSubmit}>
                    <div className="form-group">
                        <label>Description: </label>
                        <input type="text"
                               required
                               className="form-control"
                               value={this.state.description}
                               onChange={this.onChangeDescription}
                        />
                    </div>
                    <div className="form-group">
                        <label>Date: </label>
                        <div>
                            <DatePicker // custom component
                                selected={this.state.date}
                                onChange={this.onChangeDate}
                            />
                        </div>
                    </div>
                    <div className="form-group">
                        <label>Call Time: </label>
                        <input type="time"
                               required
                               className="form-control"
                               value={this.state.call_time}
                               onChange={this.onChangeCallTime}
                        />
                    </div>
                    <div className="form-group">
                        <input type="submit" value="Create Event" className="btn btn-primary"/>
                    </div>
                </form>
            </div>
        );
    }

}