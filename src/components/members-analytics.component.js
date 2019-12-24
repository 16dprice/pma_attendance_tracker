import React, { Component } from "react";
import axios from 'axios';



export default class MembersAnalytics extends Component {

    constructor(props) {
        super(props);

        this.onChangeMember = this.onChangeMember.bind(this);

        this.state = {
            memberNumber: '',
            allMembers: []
        };
    }

    componentDidMount() {
        axios.get('http://localhost:5000/api/members/')
            .then(res => {
                this.setState({
                    allMembers: res.data,
                    memberNumber: res.data[0].member_number // init to first member received
                });
            })
            .catch(err => console.log('Err: ' + err));
    }

    onChangeMember(e) {
        this.setState({
            memberNumber: e.target.value
        });
        console.log(this.state);
    }

    memberOptionList() {
        return this.state.allMembers.map(member => {
            return <option value={member.member_number} key={member.member_number}>{member.first_name} {member.last_name}</option>
        })
    }

    memberAnalysis() {
        if (this.state.memberNumber === '') return '';


    }


    render() {
        return (
            <div>
                <h3>Member Analysis</h3>
                <select value={undefined}
                        onChange={this.onChangeMember}
                        >
                    {this.memberOptionList()}
                </select>
                <div>
                    {this.memberAnalysis()}
                </div>
            </div>
        );
    }

}