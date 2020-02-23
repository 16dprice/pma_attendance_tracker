import React, { Component } from "react";
import { Link } from 'react-router-dom';
import axios from 'axios';

import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faUserPlus } from '@fortawesome/free-solid-svg-icons'

import PermChecker from "../perm_checker";

class Member extends Component {

    constructor(props) {
        super(props);

        this.state = {
            member: props.member
        };
    }

    getMemberNumber() {

        const permChecker = new PermChecker();

        if(permChecker.isPres() || permChecker.isWarden()) {
            return <Link to={`/analytics/${this.state.member.member_number}`}>{this.state.member.member_number}</Link>;
        }
        return this.state.member.member_number;

    }

    render() {
        return (
            <tr>
                <td>{this.getMemberNumber()}</td>
                <td>{this.state.member.first_name}</td>
                <td>{this.state.member.last_name}</td>
                <td>{this.state.member.status}</td>
                <td className="member-role">{this.state.member.role}</td>
            </tr>
        );
    }

}

export default class MembersListComponent extends Component {

    constructor(props) {
        super(props);
        this.state = { members: [] };
    }

    componentDidMount() {
        axios.get('https://pmaiotamuattendance.neat-url.com:5000/api/members')
            .then(res => {
                this.setState({
                    members: res.data
                });
            })
            .catch(err => console.log('Error: ' + err));
    }

    getHeader() {

        const permChecker = new PermChecker();

        if(permChecker.isPres() || permChecker.isFEO()) {
            return <h3>Members | <Link to={"/members/create"}><FontAwesomeIcon icon={faUserPlus}/></Link></h3>;
        }
        return <h3>Members</h3>
    }

    memberList() {
        return this.state.members.map(member => {
            return <Member member={member} key={member.member_number} />
        });
    }

    render() {
        return (
            <div>
                {this.getHeader()}
                <table className="table table-bordered text-center">
                    <thead className="thead-light">
                        <tr>
                            <th>Member Number</th>
                            <th>First Name</th>
                            <th>Last Name</th>
                            <th>Status</th>
                            <th className="member-role">Role</th>
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
