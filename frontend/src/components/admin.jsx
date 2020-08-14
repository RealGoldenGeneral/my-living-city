import React, { Component } from 'react';
import Navbar from './navbar';
import Footer from './footer.jsx';

const API_URL = require('../config.js')

class Admin extends Component {
    constructor(props) {
        super(props);
        this.state = {
            users: [],
            ideas: [],
            reports: [],
            ratios: {}
        };
        this.getUsers = this.getUsers.bind(this);
        this.getIdeas = this.getIdeas.bind(this);
        this.getReport = this.getReport.bind(this);
        this.changeHandler = this.changeHandler.bind(this);
    }

    componentDidMount() {
        this.getUsers();
        this.getIdeas();
        this.getReport();
    }

    async getUsers() {
        try {
            await fetch(API_URL + "/users", {
                method: "GET",
                headers: {"Content-Type": "application/json"},
                credentials: 'include'
            }).then((response) => {
                response.json()
                .then((json) => {
                    console.log(json);
                    this.setState({users: json});
                })
            }).catch((error) => {
                throw error
            })
        }
        catch(e) {
            console.log(e.stack);
        }
    }

    async getIdeas() {
        try {
            await fetch(API_URL + "/ideas/new/0", {
                method: "GET",
                headers: {"Content-Type": "application/json"},
                credentials: 'include'
            }).then((response) => {
                response.json()
                .then((json) => {
                    json.forEach(element => {
                        element.idea.downvotes = element.downvoteCount;
                        element.idea.upvotes = element.upvoteCount;
                      });
                    console.log(json);
                    this.setState({ideas: json});
                })
            }).catch((error) => {
                throw error
            })
        }
        catch(e) {
            console.log(e.stack);
        }
    }

    async getReport(){
        try{
            await fetch(API_URL + '/reports', {
                method: "GET",
                headers: {"Content-Type": "application/json"},
                credentials: 'include'
            }).then((response) => {
                response.json()
                .then((json) => {
                    console.log(json);
                    this.setState({reports: json});
                })
            }).catch((error) => {
                throw error
            })
        } catch(e){
            console.log(e.stack);
        }
    }

    changeHandler(event, key) {
        this.state.ratios[key] = event.target.value;
        console.log(this.state.ratios);
    }

    async handleSubmit(e, id, key) {
        e.preventDefault();
        try{
            let data = JSON.stringify({
                ratio: this.state.ratios[key],
            });
            console.log(this.state.ratios[key]);
            console.log("stringified");
            await fetch(API_URL+"/idea/ratio/" + id, {
                method: "PUT",
                headers: {"Content-Type": "application/json"},
                body: data,
                credentials: 'include'
            }).then(response => {
                if (response.ok) {
                    window.location.reload();
                }
            }).catch(error => {
                throw error
            });
        } catch(e) {
            console.log(e.stack)
        }
    }

    render() {
        return (
            <div className="Admin">
                <Navbar />
                <div className="row ml-3 mr-3 mt-3">
                    <div className="table-responsive">Users
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
                                {this.state.users.map((value, index) => {
                                    return <tr key={index}>
                                        <td>{value.user.id}</td>
                                        <td>{value.user.email}</td>
                                        <td>{value.user.fname}</td>
                                        <td>{value.user.lname}</td>
                                        <td>{value.user.Street_Name || "unknown"}</td>
                                        <td>{value.user.Postal_Code || "unknown"}</td>
                                        <td>{value.user.Role.role_name}</td>
                                    </tr>
                                })}
                            </tbody>
                        </table>
                    </div>
                    <div className="table-responsive">Ideas
                        <table className="table table-striped table-bordered table-hover mt-3">
                            <thead>
                                <tr>
                                    <th>Id</th>
                                    <th>State</th>
                                    <th>Category</th>
                                    <th>Title</th>
                                    <th>Average Rating</th>
                                    <th>Approval Ratio</th>
                                    <th>Required Approval Ratio</th>
                                    <th>User</th>
                                </tr>
                            </thead>
                            <tbody>
                                {this.state.ideas.map((value, index) => {
                                    var key = "ratio" + index.toString();
                                    this.state.ratios[key] = parseFloat(value.idea.ratio).toFixed(2);
                                    return <tr key={index}>
                                        <td>{value.idea.id}</td>
                                        <td>{value.idea.state}</td>
                                        <td>{value.idea.category || 'No Category'}</td>
                                        <td>{value.idea.title}</td>
                                        <td>{parseFloat(value.rating.totalAverage).toFixed(2)}</td>
                                        <td>{parseFloat(value.rating.ratio).toFixed(2)}</td>
                                        <td>
                                            <form onSubmit={(e) => this.handleSubmit(e, value.idea.id, key)}>
                                                <input type="numberic" name={key} defaultValue={parseFloat(value.idea.ratio).toFixed(2)} onChange={(e) => this.changeHandler(e, key)} /> &nbsp;
                                                <input type="submit" value="Edit" />
                                            </form>
                                        </td>
                                        <td>{value.idea.User.fname} {value.idea.User.lname}</td>
                                    </tr>
                                })}
                            </tbody>
                        </table>
                    </div>
                    <div className="table-responsive">Reports
                        <table className="table table-striped table-bordered table-hover mt-3">
                            <thead>
                                <tr>
                                    <th>Id</th>
                                    <th>Email</th>
                                    <th>Reason</th>
                                </tr>
                            </thead>
                            <tbody>
                                {this.state.reports.map((value, index) => {
                                    return <tr key={index}>
                                        <td>{value.report.id}</td>
                                        <td>{value.report.email}</td>
                                        <td>{value.report.reason}</td>
                                    </tr>
                                },)}
                            </tbody>
                        </table>
                    </div>
                </div>
                <Footer />
            </div>
        );
    }
}

export default Admin;