import React, { Component } from 'react';
import '../stylesheets/blogs.css';
import Navbar from './navbar';

const API_URL = require('../config.js');

class BlogAdmin extends Component {

  constructor(props) {
    super(props);
    this.state = {
        blogs: []
    };
    this.deleteBlog = this.deleteBlog.bind(this);
    this.editBlog = this.editBlog.bind(this);
  }

  componentDidMount(){
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

  deleteBlog(id){
    fetch(API_URL + "/blog/" + id, {
      method: "DELETE",
      credentials: 'include'
    })
    .then(res => {
      return res;
    })
    .catch(error => {
      console.log("Error: " + error);
    });
  }

  editBlog(){
      console.log('editblog')
  }

  render() {
      return (
        <div className="BlogAdmin">
            <Navbar/>
            <div className="row">
                <div className="col-12">
                    <h1 className="pl-3">Blog Admin Panel</h1>
                </div>
                <div className="col-6">
                    <hr/>
                    <h3 className="pl-3">Active Blogs</h3>
                    <ul className="list-group">
                    {this.state.blogs.map((value, index) => {
                        return <li className="list-group-item" key={index}>{value.title}
                                    <div className="float-right">
                                        <span onClick={() => this.editBlog(value.id)} className="badge badge-primary badge-pill mr-2">Edit</span>
                                        <span onClick={() => this.deleteBlog(value.id)} className="badge badge-danger badge-pill">Delete</span>
                                    </div> 
                                </li>
                    })}
                    </ul>
                </div>
                <div className="col-6">
                    <a href="/editBlog"><button type="button" className="btn btn-primary">Post New Blog</button></a>
                </div>
            </div>
        </div>
      );
  }
}

export default BlogAdmin;
