import React, { Component } from 'react';
import { Link } from "react-router-dom";
import '../stylesheets/navbar.css';

import SignInModal from './loginModal.jsx';
import SignUpModal from './registerModal.jsx';

const API_URL = require('../config.js')

class Navbar extends Component {
  constructor (props) {
    super(props);
    this.state = {
      user: ''
    };
    this.logout = this.logout.bind(this);
  }

  componentDidMount(){
    const loginButtons = document.getElementById('loginButtons');
    const loggedIn = document.getElementById('loggedIn');
    const adminLink = document.getElementById('adminLink');
    let userLoggedIn = sessionStorage.getItem('loggedin');
    let user = sessionStorage.getItem('user');
    let userRole = sessionStorage.getItem('userRole');
    this.setState({user: user});
    if(userLoggedIn){
      loginButtons.hidden = true;
      loggedIn.hidden = false;
      //(role_id == admin) => 15.... can't foind other solution for now.
      if(userRole === "Administrator") {
        adminLink.hidden = false;
      } 
      else {
        adminLink.hidden = true;
      }
    }
    else{
      loginButtons.hidden = false;
      loggedIn.hidden = true;
      adminLink.hidden = true;
    }
  }

  logout(){
    try{
        fetch(API_URL+"/user/logout", {
          method: "POST",
          credentials: 'include'
      }).then((response) => {
        if(response.ok){
            console.log('Logged Out User');
            sessionStorage.setItem('loggedIn', false);
            sessionStorage.clear();
          //sessionStorage.setItem('loggedIn', false);
          //sessionStorage.setItem('user', null);
            window.location.reload();
        }
      });
    }
    catch(e){
        console.log(e.stack);
    }
  }

  render() {
    return (
      <div className="Navbar">
        <nav className="navbar navbar-expand-lg navbar-light bg-light">
          <Link to="/" className="navbar-brand">My Living City</Link>
          <button className="navbar-toggler" type="button" data-toggle="collapse" data-target="#navbarNavAltMarkup" aria-controls="navbarNavAltMarkup" aria-expanded="false" aria-label="Toggle navigation">
            <span className="navbar-toggler-icon"></span>
          </button>
          <div className="collapse navbar-collapse" id="navbarNavAltMarkup">
            <div className="navbar-nav">
              <Link to="/conversations" className="nav-item nav-link" id="conversationsNav">Conversations</Link>
              <Link to="/blogs" className="nav-item nav-link" id="blogsNav">Blogs</Link>
              <Link to="/about" className="nav-item nav-link" id="aboutNav">About Us</Link>
              <Link to="/submit" className="nav-item nav-link" id="submitNav">Submit Idea</Link>
            </div>
          </div>
          <div id="loginButtons">
            <button type="button" className="btn btn-primary mr-2" data-toggle="modal" data-target="#loginModal">Login</button>
            <button type="button" className="btn btn-secondary" data-toggle="modal" data-target="#registerModal">Register</button>
          </div>
          <div id="loggedIn">
            <div className="btn-group" role="group">
              <a className="btn btn-primary mr-2" id="adminLink" href="/admin" role="button">Admin</a>
              <button id="btnGroupDrop1" type="button" className="btn btn-secondary dropdown-toggle" data-toggle="dropdown" aria-haspopup="true" aria-expanded="false">
                {this.state.user}
              </button>
              <div className="dropdown-menu" aria-labelledby="btnGroupDrop1">
                <a className="dropdown-item" id="profileLink" href="/user/me" role="button">Profile</a>
                <div style={{"cursor": "pointer"}}className="dropdown-item" onClick={() => this.logout()}>Logout</div>
              </div>
            </div>
          </div>
        </nav>
        <SignInModal/>
        <SignUpModal/>
      </div>
    );
  }
}

export default Navbar;
