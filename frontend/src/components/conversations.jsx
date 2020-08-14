import React, { Component } from 'react';
import '../stylesheets/conversations.css';

import Navbar from './navbar';
import ConvoCard from './convoCard.jsx';
import Footer from './footer.jsx';

const API_URL = require('../config.js');

class Conversations extends Component {

  constructor(props) {
    super(props);
    this.state = {
        ideas: [],
        loading: true
    };
    this.getIdeas = this.getIdeas.bind(this);
    this.sort = this.sort.bind(this);
  }

  componentDidMount(){
    const path = window.location.pathname;
    const navLink = document.getElementById(path.slice(1, path.length) + "Nav")
    const links = document.getElementsByClassName('nav-link');
    for(let i = 0; i < links.length; i++){
      links[i].style = "font-weight: 400; color: rgba(0, 0, 0, 0.5);"
    }
    navLink.style = "font-weight: bold; color: #007bff;"
    this.getIdeas();
  }

  async getIdeas(){
    try{
      await fetch(API_URL + "/ideas/new/0", {
          method: "GET",
          headers: {"Content-Type": "application/json"},
          credentials: 'include'
      }).then((response) => {
          response.json().then((data) => {
            console.log('Fetched Ideas: ', data);
            data.forEach(element => {
              element.idea.downvotes = element.downvoteCount;
              element.idea.upvotes = element.upvoteCount;
            });
            this.setState({ideas: data})
            this.setState({loading: false})
        });
      });
    }
    catch(e){
        console.log(e.stack);
    }
  }

   async sort(e, type){
    e.preventDefault();
    try{
      await fetch(API_URL + "/ideas/" + type + "/0", {
          method: "GET",
          headers: {"Content-Type": "application/json"},
          credentials: 'include'
      }).then((response) => {
          response.json().then((data) => {
            console.log('Fetched Ideas: ', data);
            data.forEach(element => {
              element.idea.downvotes = element.downvoteCount;
              element.idea.upvotes = element.upvoteCount;
            });
            this.setState({ideas: data})
            this.setState({loading: false})
        });
      });
    }
    catch(e){
        console.log(e.stack);
    }
  }

  render() {
    if(!this.state.loading){
      return (
        <div className="Conversations">
          <Navbar/>
          <div className="row ml-3 mr-3">
            <div className="col-12 mt-4">
              <div className="btn-group" role="group">
                <button id="btnGroupDrop1" type="button" className="btn btn-primary dropdown-toggle" data-toggle="dropdown" aria-haspopup="true" aria-expanded="false">
                  Sort
                </button>
                <div className="dropdown-menu" aria-labelledby="Sorting">
                  <div style={{"cursor": "pointer"}} className="dropdown-item" onClick={(e) => this.sort(e, "new")}>Newest</div>
                  <div style={{"cursor": "pointer"}} className="dropdown-item" onClick={(e) => this.sort(e, "trending")}>Trending</div>
                </div>
              </div>
            </div>
            <div className="col-12 text-center">
              <h2>Ideas Discussions</h2>
              <div className="convoRow">
                {this.state.ideas.map((value, index) => {
                  if (value.idea.state === "idea") { 
                    return <ConvoCard key={index} model={value}/>
                  } else if(value.idea.state !== "idea" && index === this.state.ideas.length - 1){
                    return <div key={index}>
                        <br/>
                        <p className="lead">No Ideas</p>
                      </div>;
                  }
                  else{
                    return null;
                  }
                })}
              </div>
            </div>
          </div>
  
          <div className="row ml-3 mr-3">
            <div className="col-12 text-center">
              <br/>
              <h2>Proposals Discussions</h2>
              <div className="convoRow">
                {this.state.ideas.map((value, index) => {
                if (value.idea.state === "proposal") { 
                  return <ConvoCard key={index} model={value}/>
                } else if(value.idea.state !== "proposal" && index === this.state.ideas.length - 1){
                  return <div key={index}>
                      <br/>
                      <p className="lead">No Proposals Discussions</p>
                    </div>;
                }
                else{
                  return null;
                }
                })}
              </div>
            </div>
          </div>

          <div className="row ml-3 mr-3">
            <div className="col-12 text-center">
              <br/>
              <h2>Project</h2>
              <div className="convoRow">
                {this.state.ideas.map((value, index) => {
                  if (value.idea.state === "project") { 
                    return <ConvoCard key={index} model={value}/>
                  } 
                  else if(value.idea.state !== "project" && index === this.state.ideas.length - 1){
                    return <div key={index}>
                        <br/>
                        <p className="lead">No Active Project</p>
                      </div>;
                  }
                  else{
                    return null;
                  }
                })}
              </div>
            </div>
          </div>
          <Footer />
        </div>
      );
    }
    else{
      return(
        <div>
          <Navbar/>
          <Footer />
        </div>
      );
    }
  }
}

export default Conversations;
