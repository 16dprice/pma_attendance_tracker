import React, { Component } from "react";
import { Link } from 'react-router-dom';
import axios from 'axios';

import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faUserPlus } from '@fortawesome/free-solid-svg-icons'

const Member = props => (
    <tr>
        <td><Link to={`/analytics/${props.member.member_number}`}>{props.member.member_number}</Link></td>
        <td>{props.member.first_name}</td>
        <td>{props.member.middle_name}</td>
        <td>{props.member.last_name}</td>
        <td>{props.member.status}</td>
        <td>{props.member.role}</td>
    </tr>
);

export default class MembersListComponent extends Component {

    constructor(props) {
        super(props);
        this.state = { members: [] };
    }

    componentDidMount() {
        axios.get('http://localhost:5000/api/members')
            .then(res => {
                this.setState({
                    members: res.data
                });
            })
            .catch(err => console.log('Error: ' + err));
    }

    memberList() {
        return this.state.members.map(member => {
            return <Member member={member} key={member.member_number} />
        });
    }

    render() {
        return (
            <div>
                <h3>Members | <Link to={"/members/create"}><FontAwesomeIcon icon={faUserPlus}/></Link></h3>
                <table className="table table-bordered text-center">
                    <thead className="thead-light">
                        <tr>
                            <th>Member Number</th>
                            <th>First Name</th>
                            <th>Middle Name</th>
                            <th>Last Name</th>
                            <th>Status</th>
                            <th>Role</th>
                        </tr>
                    </thead>
                    <tbody>
                        { this.memberList() }
                    </tbody>
                </table>
            </div>
        );
    }

}