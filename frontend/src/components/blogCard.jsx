import React, { Component } from 'react';
import '../stylesheets/blogs.css';
const API_URL = require('../config.js')


class BlogCard extends Component {

  constructor (props) {
    super(props);
    this.state = {
      picture: ''
    };
}

  async componentDidMount(){
    await fetch(API_URL + "/blog/" + this.props.model.id + "/images", {
      credentials: 'include'
    })
    .then(res => {
      return res.json();
    })
    .then(json => {
      console.log(json)
      this.setState({picture: json[0]});
    })
    .catch(error => {
      console.log("Error: " + error);
    });
  }
  render() {
    return (
      <div className="BlogCard">
        <div className="card">
            <img src={this.state.picture ? this.state.picture : 'https://c-lj.gnst.jp/public/img/common/noimage.jpg?20181011050048'} className="card-img-top" alt="..."/>
            <div className="card-body">
            <h5 className="card-title">{this.props.model.title}</h5>
            <p className="card-text">{this.props.model.short_desc}</p>
            <a href={"/blog/" + this.props.model.id} className="btn btn-primary">Read Blog</a>
            </div>
        </div>
      </div>
    );
  }
}

export default BlogCard;