import React, { Component } from 'react';

const API_URL = require('../config.js');

class LoginModal extends Component {

  constructor(props) {
    super(props);
    this.state = {
        email: '',
        password: ''
    };
    this.handleChange = this.handleChange.bind(this);
    this.login = this.login.bind(this);
    this.rejectLogin = this.rejectLogin.bind(this);
    this.acceptLogin = this.acceptLogin.bind(this);
  }

  handleChange(event) {
    this.setState({[event.target.name]: event.target.value});
  }

async login(e){
  e.preventDefault();
  try{
      let data = JSON.stringify({
        user: {
          email: this.state.email,
          password: this.state.password,
        }
      });
      await fetch(API_URL+"/user/login", {
        method: "POST",
        headers: {"Content-Type": "application/json"},
        body: data,
        credentials: 'include'
    }).then((response) => {
      if(response.ok){
        response.json().then((data) => {
          console.log('Got User: ', data);
          sessionStorage.setItem('loggedin', true);
          sessionStorage.setItem('user', data.user.email);
          sessionStorage.setItem('userId', data.user.id);
          sessionStorage.setItem('userRole', data.user.Role.role_name);
          this.acceptLogin();
        }).catch(e => {
          console.log(e.stack);
          sessionStorage.setItem('loggedin', false);
          sessionStorage.setItem('user', data.user.email);
          sessionStorage.setItem('userId', data.user.id);
          sessionStorage.setItem('userRole', data.user.Role.role_name);
          this.rejectLogin();
        });
      }
    });
  }
  catch(e){
      console.log(e.stack);
      this.rejectLogin();
  }
}

  rejectLogin(){
    document.getElementById('submitBtn').hidden = false;
    document.getElementById('confirmIcon').hidden = true;
    document.getElementById('denyIcon').hidden = false;
  }

  acceptLogin(){
    document.getElementById('submitBtn').hidden = true;
    document.getElementById('confirmIcon').hidden = false;
    document.getElementById('denyIcon').hidden = true;
    setTimeout(function(){
      window.location.reload();
      }, 1500);
  }


  render() {
    return (
      <div className="LoginModal">
        <div className="modal fade" id="loginModal" role="dialog" aria-labelledby="loginModal" aria-hidden="true">
          <div className="modal-dialog" role="document">
            <div className="modal-content">
              <div className="modal-header">
                  <h5 className="modal-title" id="loginModalLabel">Login</h5>
                  <button type="button" className="close" data-dismiss="modal" aria-label="Close">
                  <span aria-hidden="true">&times;</span>
                  </button>
              </div>
              <div className="modal-body text-center">
                <form onSubmit={this.login}>
                  <div className="form-group">
                    <input onChange={this.handleChange} type="email" name="email" className="form-control text-center" id="emailLoginInput" aria-describedby="emailLogin" placeholder="Enter email" required/>
                  </div>
                  <div className="form-group">
                    <input onChange={this.handleChange} type="password" name="password" className="form-control text-center" id="passwordLoginInput" placeholder="Password" required/>
                  </div>
                  <div id="statusContainer">
                    <button id="submitBtn" type="submit" className="btn btn-primary">Login</button>
                    <div>
                      <i id="confirmIcon" hidden className="fas fa-check fa-2x"></i>
                      <i id="denyIcon" hidden className="far fa-times-circle fa-2x">Wrong password.</i>
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

export default LoginModal;
