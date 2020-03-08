import React, { Component } from "react";
import axios from "axios";
import {config} from "../constants";
import DatePicker from "react-datepicker";
import moment from "moment";

export default class EditRoadie extends Component {

    constructor(props) {
        super(props);

        this.onChangeLocation = this.onChangeLocation.bind(this);
        this.onChangeMembersNeeded = this.onChangeMembersNeeded.bind(this);
        this.onChangeDate = this.onChangeDate.bind(this);
        this.onChangeCallTime = this.onChangeCallTime.bind(this);
        this.onSubmit = this.onSubmit.bind(this);

        this.state = {
            roadieUuid: props.match.params.uuid,
            location: '',
            members_needed: '',
            date: '',
            call_time: ''
        };
    }

    onChangeLocation(e) {
        this.setState({
            location: e.target.value
        });
    }

    onChangeMembersNeeded(e) {
        this.setState({
            members_needed: e.target.value
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

    onSubmit(e) {
        e.preventDefault();

        const roadie = {
            uuid: this.state.roadieUuid,
            location: this.state.location,
            members_needed: this.state.members_needed,
            date: new Date(this.state.date),
            call_time: this.state.call_time
        };

        // use axios library to post something to the API endpoint
        axios.post(`${config.url.API_URL}/api/roadies/update/`, roadie)
            .then(res => {
                console.log(res.data);
                window.location.reload();
            })
            .catch(err => console.log('Error: ' + err));

    }

    componentDidMount() {

        axios.get(`${config.url.API_URL}/api/roadies/?uuid=${this.state.roadieUuid}`)
            .then(res => {
                const roadie = res.data[0];

                this.setState({
                    location: roadie.location,
                    members_needed: roadie.members_needed,
                    date: new Date(moment(roadie.date).format('MM/DD/YYYY')),
                    call_time: roadie.call_time.split(':').slice(0, 2).join(':')
                });

            })
            .catch(err => console.log(err));

    }

    render() {
        return (
            <div>
                <h3>Create New Roadie</h3>
                <form onSubmit={this.onSubmit}>
                    <div className="form-group">
                        <label>Location: </label>
                        <input type="text"
                               required
                               className="form-control"
                               value={this.state.location}
                               onChange={this.onChangeLocation}
                        />
                    </div>
                    <div className="form-group">
                        <label>Members Needed: </label>
                        <input type="text"
                               required
                               className="form-control"
                               value={this.state.members_needed}
                               onChange={this.onChangeMembersNeeded}
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
                        <input type="submit" value="Save Changes" className="btn btn-primary"/>
                    </div>
                </form>
            </div>
        );
    }

}
