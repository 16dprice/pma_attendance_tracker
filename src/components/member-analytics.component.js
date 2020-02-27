import React, { Component } from "react";
import axios from 'axios';

import { Chart } from "react-google-charts";
import {config} from "../constants";

export default class MemberAnalytics extends Component {

    constructor(props) {
        super(props);

        this.state = {
            memberAbsenceInfo: {},
        };
    }

    componentDidMount() {
        axios.get(`${config.url.API_URL}/api/members/absences/${this.props.match.params.memberNumber}`)
            .then(res => this.setState({
                memberAbsenceInfo: res.data
            }))
            .catch(err => console.log('Err: ' + err))
    }


    absencesTable() {
        return (
            <tr>
                <td>{this.state.memberAbsenceInfo.E}</td>
                <td>{this.state.memberAbsenceInfo.U}</td>
                <td>{this.state.memberAbsenceInfo.T}</td>
            </tr>
        );
    }

    render() {
        return (
            <div>
                <h3>Member Analysis for {this.state.memberAbsenceInfo.name}</h3>
                <table className="table table-bordered text-center">
                    <thead className="thead-light">
                    <tr>
                        <th>Excused</th>
                        <th>Unexcused</th>
                        <th>Tardy</th>
                    </tr>
                    </thead>
                    <tbody>
                    { this.absencesTable() }
                    </tbody>
                </table>
            </div>
        );
    }

}
