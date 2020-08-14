import React, { Component } from 'react';
import '../stylesheets/blogs.css';
import ReactMde from "react-mde";
import * as Showdown from "showdown";
import "react-mde/lib/styles/css/react-mde-all.css";
import Navbar from './navbar';
const API_URL = require('../config.js')


class EditBlog extends Component {
    constructor (props) {
        super(props);
        this.state = {
          value: "",
          tab: "write" | "preview",
          title: '',
          short_desc: ''
        };
        this.converter = new Showdown.Converter({
          tables: true,
          simplifiedAutoLink: true,
          strikethrough: true,
          tasklists: true
        });
        this.addBlog = this.addBlog.bind(this);
    }

    componentDidMount(){
      const images = document.getElementById('pictureUpload');
      images.addEventListener('input', function (evt) {
          document.getElementById('fileText').innerText = evt.target.files[0].name;
          console.log(evt.target.files);
      });
    }

    handleValueChange = (value) => {
        this.setState({value});
    };

    handleTitleChange = (event) => {
      this.setState({title: event.target.value});
    };

    handleDescText = (event) => {
      this.setState({short_desc: event.target.value});
    };

    handleTabChange = (tab) => {
      this.setState({tab})
    };

    async addBlog(){
      const data = JSON.stringify({
        title: this.state.title,
        short_desc: this.state.short_desc,
        markdown: this.state.value
      })
      let response = await fetch(API_URL + "/blog", {
        method: "POST",
        headers: {"Content-Type": "application/json"},
        credentials: 'include',
        body: data
      })
      if(response.ok){
        const images = document.getElementById('pictureUpload');
        let formData  = new FormData();
        formData.append('file', images.files[0]);
        response.json().then(async (data) => {
        let imageResponse = await fetch(API_URL+"/blog/" + data.id + "/images", {
            method: "POST",
            body: formData,
            credentials: 'include'
        });
        if(imageResponse.ok){
            console.log('Image Uploaded')
        }
        else{
            console.log('image failed')
        }
      });
      }
    }
    
  render() {
    return (
      <div className="EditBlog">
        <Navbar/>
        <div className="row">
          <div className="col-6">
            <h1 className="pt-3 pl-4">Edit Blog</h1>
            <div className="input-group mb-3 ml-2">
              <input onChange={this.handleTitleChange} value={this.state.title} type="text" className="form-control" placeholder="Title"/>
            </div>
            <div className="input-group mb-3 ml-2">
              <input onChange={this.handleDescText} value={this.state.short_desc} type="text" className="form-control" placeholder="Short Description"/>
            </div>
            <div className="input-group mb-3 mt-3 ml-2">
              <div className="custom-file">
                  <input type="file" className="custom-file-input" id="pictureUpload"/>
                  <label className="custom-file-label" id="fileText">Choose Cover Image</label>
              </div>
            </div> 
          </div>
          <div className="col-6">
            <button onClick={this.addBlog} type="button" className="btn btn-warning float-right mt-3 mr-4">Save Blog</button>
          </div>
        </div>
        <ReactMde
          onChange={this.handleValueChange}
          onTabChange={this.handleTabChange}
          value={this.state.value}
          selectedTab={this.state.tab}
          generateMarkdownPreview={markdown =>
            Promise.resolve(this.converter.makeHtml(markdown))
          }
        />
      </div>
    );
  }
}

export default EditBlog;
