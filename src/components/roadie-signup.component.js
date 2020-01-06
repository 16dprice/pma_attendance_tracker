import React, { Component } from "react";
import axios from 'axios';
import Cookies from "js-cookie";

export default class RoadieSignup extends Component {

    constructor(props) {
        super(props);

        this.signUp = this.signUp.bind(this);

        const member = JSON.parse(Cookies.get('member') === undefined ? null : Cookies.get('member'));

        this.state = {
            roadieUuid: props.match.params.uuid,
            roadie: '',
            signUps: [],
            currentMember: member
        };
    }

    signUp(e) {
        e.preventDefault();

        console.log('signing up');
        const member_number = this.state.currentMember.member_number;
        const roadieUuid = this.state.roadieUuid;

        axios.post('http://localhost:5000/api/roadie-signup/add', {
            member_number,
            roadieUuid
        })
            .then(res => {
                window.location.reload();
                console.log(res);
            })
            .catch(err => console.log(err));
    }

    componentDidMount() {
        axios.get(`http://localhost:5000/api/roadie-signup/roadie/${this.state.roadieUuid}`)
            .then(res => {
                this.setState({
                    roadie: res.data.roadie,
                    signUps: res.data.signUps
                });
                console.log(this.state);
            })
            .catch(err => console.log(err));
    }

    render() {
        return (
            <div>
                <ul className="list-group list-group-flush">
                    <li className="list-group-item">
                        <p>Location: {this.state.roadie.location}</p>
                    </li>
                    <li className="list-group-item">
                        <p>Date: {this.state.roadie.date}</p>
                    </li>
                    <li className="list-group-item">
                        <p>Call Time: {this.state.roadie.call_time}</p>
                    </li>
                    <li className="list-group-item">
                        <p>Spots Available: {this.state.roadie.members_needed - this.state.signUps.length}</p>
                    </li>
                    <li className="list-group-item">
                        <p>You are: {this.state.currentMember.first_name} {this.state.currentMember.last_name}</p>
                    </li>
                    <button className="btn btn-primary" onClick={this.signUp}>
                        Sign Up
                    </button>
                </ul>
            </div>
        );
    }

}