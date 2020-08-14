import React, { Component } from 'react';
import ReactDOM from 'react-dom';

const API_URL = require('../config.js');

class PasswordModal extends Component {
    constructor(props) {
        super(props);
        this.state = {
            currentPassword: '',
            newPassword: '',
            confirmPassword: ''
        };
        this.handleChange = this.handleChange.bind(this);
        this.submit = this.submit.bind(this);
    }

    handleChange(event) {
        this.setState({[event.target.name]: event.target.value});
    }

    async submit(e) {
        e.preventDefault();
        console.log(this.state);
        var errorMessage;
        if (!this.state.newPassword.match(this.state.confirmPassword)) {
            errorMessage = <p>Confirmation doesn't match new password</p>;
            ReactDOM.render(errorMessage, document.getElementById('passwordError'));
            return false;
        }
        try {
            let data = JSON.stringify({
                currentPassword: this.state.currentPassword,
                newPassword: this.state.newPassword
            });
            await fetch(API_URL + "/user/password", {
                method: "PUT",
                headers: {"Content-Type": "application/json"},
                body: data,
                credentials: 'include'
            }).then((response) => {
                if (response.ok) {
                    errorMessage = <p></p>;
                    ReactDOM.render(errorMessage, document.getElementById('passwordError'));
                    this.acceptSubmit();
                } else {
                    response.json()
                    .then((json) => {
                        errorMessage = <p>{json.error}</p>;
                        ReactDOM.render(errorMessage, document.getElementById('passwordError'));
                        this.rejectSubmit();
                    })
                }
            }).catch((err) => {
                throw err;
            });
        } catch(e) {
            console.log(e.stack);
        }
    }

    rejectSubmit(){
        document.getElementById('passSubmitBtn').hidden = false;
        document.getElementById('passConfirmIcon').hidden = true;
        document.getElementById('passDenyIcon').hidden = false;
      }
    
    acceptSubmit(){
        document.getElementById('passSubmitBtn').hidden = true;
        document.getElementById('passConfirmIcon').hidden = false;
        document.getElementById('passDenyIcon').hidden = true;
        setTimeout(function(){
          window.location.reload();
          }, 1500);
    }

    render() {
        return (
            <div className="passwordModal">
                <div className="modal fade" id="passwordModal" role="dialog" aria-labelledby="passwordModal" aria-hidden="true">
                    <div className="modal-dialog" role="document">
                        <div className="modal-content">
                            <div className="modal-header">
                                <h5 className="modal-title" id="loginModalLabel">Change Password</h5>
                                <button type="button" className="close" data-dismiss="modal" aria-label="Close">
                                <span aria-hidden="true">&times;</span>
                                </button>
                            </div>
                            <div className="modal-body text-center">
                                <div id="passwordError" style={{color: "red"}}></div>
                                <form onSubmit={this.submit}>
                                    <div className="form-group">
                                        <input onChange={this.handleChange} type="password" name="currentPassword" className="form-control text-center" id="currentPasswordInput" aria-describedby="currentPassword" placeholder="Old password" required/>
                                    </div>
                                    <div className="form-group">
                                        <input onChange={this.handleChange} type="password" name="newPassword" className="form-control text-center" id="newPasswordInput" aria-describedby="newPassword" placeholder="New password" required/>
                                    </div>
                                    <div className="form-group">
                                        <input onChange={this.handleChange} type="password" name="confirmPassword" className="form-control text-center" id="confirmPasswordInput" aria-describedby="confirmPassword" placeholder="Confirm new password" required/>
                                    </div>
                                    <div id="statusContainer">
                                        <button id="passSubmitBtn" type="submit" className="btn btn-primary">Submit</button>
                                        <div>
                                            <i id="passConfirmIcon" hidden className="fas fa-check fa-2x"></i>
                                            <i id="passDenyIcon" hidden className="far fa-times-circle fa-2x"></i>
                                        </div>
                                    </div>
                                </form>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        );
    }
}

export default PasswordModal;