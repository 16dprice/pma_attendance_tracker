import React, { Component } from "react";
import axios from 'axios'

export default class CreateMember extends Component {

    constructor(props) {
        super(props);

        this.onChangeMemberNumber = this.onChangeMemberNumber.bind(this);
        this.onChangeFirstName = this.onChangeFirstName.bind(this);
        this.onChangeLastName = this.onChangeLastName.bind(this);
        this.onChangeMiddleName = this.onChangeMiddleName.bind(this);
        this.onChangeStatus = this.onChangeStatus.bind(this);
        this.onSubmit = this.onSubmit.bind(this);

        this.state = {
            member_number: '',
            first_name: '',
            last_name: '',
            middle_name: '',
            status: 'active'
        };
    }

    onChangeMemberNumber(e) {
        this.setState({
            member_number: e.target.value
        });
    }

    onChangeFirstName(e) {
        this.setState({
            first_name: e.target.value
        });
    }

    onChangeLastName(e) {
        this.setState({
            last_name: e.target.value
        });
    }

    onChangeMiddleName(e) {
        this.setState({
            middle_name: e.target.value
        });
    }

    onChangeStatus(e) {
        this.setState({
            status: e.target.value
        });
    }

    onSubmit(e) {
        e.preventDefault();

        const member = {
            member_number: this.state.member_number,
            first_name: this.state.first_name,
            last_name: this.state.last_name,
            middle_name: this.state.middle_name,
            status: this.state.status
        };

        // use axios library to post something to the API endpoint
        axios.post('http://localhost:5000/api/members/add', member)
            .then(res => {
                console.log(res.data);
                window.location = '/members';
            })
            .catch(err => console.log('Error: ' + err));

    }

    render() {
        return (
            <div>
                <h3>Create New Member</h3>
                <form onSubmit={this.onSubmit}>
                    <div className="form-group">
                        <label>Member Number: </label>
                        <input type="text"
                               required
                               className="form-control"
                               value={this.state.member_number}
                               onChange={this.onChangeMemberNumber}
                        />
                    </div>
                    <div className="form-group">
                        <label>First Name: </label>
                        <input type="text"
                               required
                               className="form-control"
                               value={this.state.first_name}
                               onChange={this.onChangeFirstName}
                        />
                    </div>
                    <div className="form-group">
                        <label>Last Name: </label>
                        <input type="text"
                               required
                               className="form-control"
                               value={this.state.last_name}
                               onChange={this.onChangeLastName}
                        />
                    </div>
                    <div className="form-group">
                        <label>Middle Name: </label>
                        <input type="text"
                               className="form-control"
                               value={this.state.middle_name}
                               onChange={this.onChangeMiddleName}
                        />
                    </div>
                    <div className="form-group">
                        <label>Status: </label>
                        <select value={this.state.status}
                                onChange={this.onChangeStatus}
                        >
                            <option value='active'>Active</option>
                            <option value='inactive'>Inactive</option>
                        </select>
                    </div>
                    <div className="form-group">
                        <input type="submit" value="Create Member" className="btn btn-primary"/>
                    </div>
                </form>
            </div>
        );
    }

}