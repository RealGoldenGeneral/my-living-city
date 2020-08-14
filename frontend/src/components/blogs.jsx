import React, { Component } from 'react';
import '../stylesheets/blogs.css';

import Navbar from './navbar';
import BlogCard from './blogCard';

const API_URL = require('../config.js')

class Blogs extends Component {
  constructor (props) {
    super(props);
    this.state = {
      blogs: []
    };
}
  componentDidMount(){
    const path = window.location.pathname;
    const navLink = document.getElementById(path.slice(1, path.length) + "Nav")
    const links = document.getElementsByClassName('nav-link');
    for(let i = 0; i < links.length; i++){
      links[i].style = "font-weight: 400; color: rgba(0, 0, 0, 0.5);"
    }
    navLink.style = "font-weight: bold; color: #007bff;"
    
    fetch(API_URL + "/blogs/", {
      credentials: 'include'
    })
      .then(res => {
        return res.json();
      })
      .then(json => {
        this.setState({blogs: json});
      })
      .catch(error => {
        console.log("Error: " + error);
      });
  }

  render() {
    return (
      <div className="Blogs">
        <Navbar/>
        <h1 className="pt-3 pl-4">Blogs</h1>
        <div className="row pt-3 pl-4 pr-4">
          <div className="col-12">
          {this.state.blogs.map((value, index) => {
            return <BlogCard model={value} key={index}/>
          })}
          </div>
        </div>
      </div>
    );
  }
}

export default Blogs;
