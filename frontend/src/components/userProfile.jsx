import React, { Component } from 'react';
import Navbar from './navbar';
import PasswordModal from './passwordModal';

const API_URL = require('../config.js')

class UserProfile extends Component {
    constructor(props) {
      super(props);
      this.state = {
          user: {},
          role: ''
      };
    }

    async componentDidMount() {
        try {
            await fetch(API_URL + "/user/me", {
                credentials: 'include'
            }).then(response => {
                if (response.ok) {
                    response.json()
                    .then(json => {
                        console.log(json)
                        this.setState({ user: json.user })
                        this.setState({ role: json.user.Role.role_name })
                    }).catch(err => {
                        throw err
                    })
                }
            })
        } catch(e) {
            console.log(e);
        }
    }

    render() {
        return (
            <div className="UserProfile">
                <Navbar />
                <div className="row ml-3 mr-3 mt-3">
                    <div className="table-responsive">Current User
                        <table className="table table-striped table-bordered table-hover mt-3">
                            <thead>
                                <tr>
                                    <th>Id</th>
                                    <th>Email</th>
                                    <th>First Name</th>
                                    <th>Last Name</th>
                                    <th>Street Name</th>
                                    <th>Postal Code</th>
                                    <th>Role</th>
                                </tr>
                            </thead>
                            <tbody>
                                <tr>
                                    <td>{this.state.user.id || "Unknown"}</td>
                                    <td>{this.state.user.email || "Unknown"}</td>
                                    <td>{this.state.user.fname || "Unknown"}</td>
                                    <td>{this.state.user.lname || "Unknown"}</td>
                                    <td>{this.state.user.Street_Name || "Unknown"}</td>
                                    <td>{this.state.user.Postal_Code || "Unknown"}</td>
                                    <td>{this.state.role || "Unknown"}</td>
                                </tr>
                            </tbody>
                        </table>
                    </div>
                    <button type="button" className="btn btn-primary mr-2" data-toggle="modal" data-target="#passwordModal">Change Password</button>
                </div>
                <PasswordModal />
            </div>
        );
    }
}

export default UserProfile;