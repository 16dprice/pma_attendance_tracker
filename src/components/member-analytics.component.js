import React, { Component } from "react";
import axios from 'axios';

import { Chart } from "react-google-charts";

export default class MemberAnalytics extends Component {

    constructor(props) {
        super(props);

        this.state = {
            memberNumber: '',
        };
    }

    componentDidMount() {
        axios.get('http://localhost:5000/api/members/')
            .then(res => {
                this.setState({
                    memberNumber: res.data[0].member_number // init to first member received
                });
            })
            .catch(err => console.log('Err: ' + err));
    }

    render() {
        return (
            <div>
                <h3>Member Analysis</h3>

            </div>
        );
    }

}