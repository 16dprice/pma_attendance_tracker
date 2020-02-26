import React, { Component } from "react";
import axios from 'axios';
import Cookies from "js-cookie";

import { confirmAlert } from 'react-confirm-alert';
import 'react-confirm-alert/src/react-confirm-alert.css';
import moment from "moment";

export default class RoadieSignup extends Component {

    constructor(props) {
        super(props);

        this.signUp = this.signUp.bind(this);
        this.drop = this.drop.bind(this);

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

        const member_number = this.state.currentMember.member_number;
        const roadieUuid = this.state.roadieUuid;

        axios.post('https://pmaiotamuattendance.neat-url.com:5000/api/roadie-signup/add', {
            member_number,
            roadieUuid
        })
            .then(res => {
                window.location.reload();
                console.log(res);
            })
            .catch(err => console.log(err));
    }

    drop(e) {
        e.preventDefault();

        const queryString = `?memberMemberNumber=${this.state.currentMember.member_number}&roadyUuid=${this.state.roadieUuid}`;

        confirmAlert({
            title: 'You are about to drop your roadie.',
            message: 'Are you sure you want to drop this?',
            buttons: [
                {
                    label: 'Yes',
                    onClick: () => {
                        axios.delete(`https://pmaiotamuattendance.neat-url.com:5000/api/roadie-signup/${queryString}`)
                            .then(() => window.location.reload())
                            .catch(err => console.log(err));
                    }
                },
                {
                    label: 'No'
                }
            ]
        });
    }

    getRoadie() {
        return axios.get(`https://pmaiotamuattendance.neat-url.com:5000/api/roadies/${this.state.roadieUuid}`)
            .then(res => this.setState({ roadie: res.data }))
            .catch(err => console.log(err));
    }

    getSignUps() {
        return axios.get(`https://pmaiotamuattendance.neat-url.com:5000/api/roadie-signup/members/${this.state.roadieUuid}`)
            .then(res => this.setState({ signUps: res.data }))
            .catch(err => console.log(err));
    }

    componentDidMount() {
        Promise.all([this.getRoadie(), this.getSignUps()]);
    }

    signUpList() {
        return this.state.signUps.map(signUp => {

            let displayName = `${signUp.first_name} ${signUp.last_name}`;

            if(signUp.member_number === this.state.currentMember.member_number) {
                displayName = <b>{displayName}</b>;
            }

            return (
                <li className="list-group-item">
                    {displayName}
                </li>
            )
        });
    }

    getReadableDate() {
        return moment(this.state.roadie.date).format('dddd, MMMM Do');
    }

    getReadableTime() {
        return moment(this.state.roadie.date + ' ' + this.state.roadie.call_time).format('h:mm a');
    }

    getSignUpButton() {
        if(
            this.state.roadie.members_needed - this.state.signUps.length <= 0 ||
            this.state.signUps.map(signUp => signUp.member_number).includes(this.state.currentMember.member_number)
        ) return;

        return (
            <button className="btn btn-primary" onClick={this.signUp}>
                Sign Up
            </button>
        );
    }

    getDropButton() {
        if(this.state.signUps.map(signUp => signUp.member_number).includes(this.state.currentMember.member_number)) {
            return (
                <button className="btn btn-danger" onClick={this.drop}>
                    Drop
                </button>
            );
        }
    }

    render() {
        return (
            <div>
                <ul className="list-group list-group-flush">
                    <li className="list-group-item">
                        <p>Location: {this.state.roadie.location}</p>
                    </li>
                    <li className="list-group-item">
                        <p>Date: {this.getReadableDate()}</p>
                    </li>
                    <li className="list-group-item">
                        <p>Call Time: {this.getReadableTime()}</p>
                    </li>
                    <li className="list-group-item">
                        <p>Spots Available: {this.state.roadie.members_needed - this.state.signUps.length}</p>
                    </li>
                    <li className="list-group-item">
                        <ul className="list-group list-group-flush">
                            {this.signUpList()}
                        </ul>
                    </li>
                    {this.getSignUpButton()}
                    {this.getDropButton()}
                </ul>
            </div>
        );
    }

}
