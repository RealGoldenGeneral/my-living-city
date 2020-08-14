import React, { Component } from 'react';
import '../stylesheets/conversations.css';
import Navbar from './navbar';
import ConvoCard from './convoCard.jsx';

const API_URL = require('../config.js');

class Category extends Component {

    constructor(props) {
        super(props);
        this.state = {
            ideas: [],
            loading: true
        };
        this.getIdeasByCategory = this.getIdeasByCategory.bind(this);
        this.sort = this.sort.bind(this);
      }
      
      componentDidMount(){
        this.getIdeasByCategory();
      }

      async getIdeasByCategory(){
        try{
          await fetch(API_URL + "/" + this.props.match.params.category + "/ideas/new/0", {
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
          await fetch(API_URL + "/" + this.props.match.params.category + "/ideas/" + type + "/0", {
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
                      if (value.idea.state === "idea" && value.idea.category === 'Nature') { 
                        return <ConvoCard key={index} model={value}/>
                      } else if(value.idea.state === "idea" && value.idea.category === 'Community'){
                        return <ConvoCard key={index} model={value}/>
                      } else if(value.idea.state === "idea" && value.idea.category === 'Arts') {
                        return <ConvoCard key={index} model={value}/>
                      } else if(value.idea.state === "idea" && value.idea.category === 'Energy'){
                        return <ConvoCard key={index} model={value}/>
                      } else if(value.idea.state === "idea" && value.idea.category === 'Manufacturing'){
                        return <ConvoCard key={index} model={value}/>
                      } else if(value.idea.state !== "idea" && value.idea.category === 'Nature' && index === this.state.ideas.length - 1){
                        return <div key={index}>
                        <br/>
                        <p className="lead">No Ideas</p>
                      </div>;
                      } else if(value.idea.state !== "idea" && value.idea.category === 'Community' && index === this.state.ideas.length - 1){
                        return <div key={index}>
                        <br/>
                        <p className="lead">No Ideas</p>
                      </div>;
                      } else if(value.idea.state !== "idea" && value.idea.category === 'Arts' && index === this.state.ideas.length - 1){
                        return <div key={index}>
                        <br/>
                        <p className="lead">No Ideas</p>
                      </div>;
                      } else if(value.idea.state !== "idea" && value.idea.category === 'Energy' && index === this.state.ideas.length - 1){
                        return <div key={index}>
                        <br/>
                        <p className="lead">No Ideas</p>
                      </div>;
                      } else if(value.idea.state !== "idea" && value.idea.category === 'Manufacturing' && index === this.state.ideas.length - 1){
                        return <div key={index}>
                        <br/>
                        <p className="lead">No Ideas</p>
                      </div>;
                      } else {
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
                      if (value.idea.state === "proposal" && value.idea.category === 'Nature') { 
                        return <ConvoCard key={index} model={value}/>
                      } else if(value.idea.state === "proposal" && value.idea.category === 'Community'){
                        return <ConvoCard key={index} model={value}/>
                      } else if(value.idea.state === "proposal" && value.idea.category === 'Arts') {
                        return <ConvoCard key={index} model={value}/>
                      } else if(value.idea.state === "proposal" && value.idea.category === 'Energy'){
                        return <ConvoCard key={index} model={value}/>
                      } else if(value.idea.state === "proposal" && value.idea.category === 'Manufacturing'){
                        return <ConvoCard key={index} model={value}/>
                      } else if(value.idea.state !== "proposal" && value.idea.category === 'Nature' && index === this.state.ideas.length - 1){
                        return <div key={index}>
                        <br/>
                        <p className="lead">No proposal Discussion</p>
                      </div>;
                      } else if(value.idea.state !== "proposal" && value.idea.category === 'Community' && index === this.state.ideas.length - 1){
                        return <div key={index}>
                        <br/>
                        <p className="lead">No proposal Discussion</p>
                      </div>;
                      } else if(value.idea.state !== "proposal" && value.idea.category === 'Arts' && index === this.state.ideas.length - 1){
                        return <div key={index}>
                        <br/>
                        <p className="lead">No proposal Discussion</p>
                      </div>;
                      } else if(value.idea.state !== "proposal" && value.idea.category === 'Energy' && index === this.state.ideas.length - 1){
                        return <div key={index}>
                        <br/>
                        <p className="lead">No proposal Discussion</p>
                      </div>;
                      } else if(value.idea.state !== "proposal" && value.idea.category === 'Manufacturing' && index === this.state.ideas.length - 1){
                        return <div key={index}>
                        <br/>
                        <p className="lead">No proposal Discussion</p>
                      </div>;
                      } else{
                      return null;
                    }
                    })}
                  </div>
                </div>
              </div>
      
              <div className="row ml-3 mr-3">
                <div className="col-12 text-center">
                  <br/>
                  <h2>Active Collaborations</h2>
                  <div className="convoRow">
                    {this.state.ideas.map((value, index) => {
                        if (value.idea.state === "collaboration" && value.idea.category === 'Nature') { 
                          return <ConvoCard key={index} model={value}/>
                        } else if(value.idea.state === "collaboration" && value.idea.category === 'Community'){
                          return <ConvoCard key={index} model={value}/>
                        } else if(value.idea.state === "collaboration" && value.idea.category === 'Arts') {
                          return <ConvoCard key={index} model={value}/>
                        } else if(value.idea.state === "collaboration" && value.idea.category === 'Energy'){
                          return <ConvoCard key={index} model={value}/>
                        } else if(value.idea.state === "collaboration" && value.idea.category === 'Manufacturing'){
                          return <ConvoCard key={index} model={value}/>
                        } else if(value.idea.state !== "collaboration" && value.idea.category === 'Nature' && index === this.state.ideas.length - 1){
                          return <div key={index}>
                          <br/>
                          <p className="lead">No Active Collaboration</p>
                        </div>;
                        } else if(value.idea.state !== "collaboration" && value.idea.category === 'Community' && index === this.state.ideas.length - 1){
                          return <div key={index}>
                          <br/>
                          <p className="lead">No Active Collaboration</p>
                        </div>;
                        } else if(value.idea.state !== "collaboration" && value.idea.category === 'Arts' && index === this.state.ideas.length - 1){
                          return <div key={index}>
                          <br/>
                          <p className="lead">No Active Collaboration</p>
                        </div>;
                        } else if(value.idea.state !== "collaboration" && value.idea.category === 'Energy' && index === this.state.ideas.length - 1){
                          return <div key={index}>
                          <br/>
                          <p className="lead">No Active Collaboration</p>
                        </div>;
                        } else if(value.idea.state !== "collaboration" && value.idea.category === 'Manufacturing' && index === this.state.ideas.length - 1){
                          return <div key={index}>
                          <br/>
                          <p className="lead">No Active Collaboration</p>
                        </div>;
                        } else{
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
                      if (value.idea.state === "project" && value.idea.category === 'Nature') { 
                        return <ConvoCard key={index} model={value}/>
                      } else if(value.idea.state === "project" && value.idea.category === 'Community'){
                        return <ConvoCard key={index} model={value}/>
                      } else if(value.idea.state === "project" && value.idea.category === 'Arts') {
                        return <ConvoCard key={index} model={value}/>
                      } else if(value.idea.state === "project" && value.idea.category === 'Energy'){
                        return <ConvoCard key={index} model={value}/>
                      } else if(value.idea.state === "project" && value.idea.category === 'Manufacturing'){
                        return <ConvoCard key={index} model={value}/>
                      } else if(value.idea.state !== "project" && value.idea.category === 'Nature' && index === this.state.ideas.length - 1){
                        return <div key={index}>
                        <br/>
                        <p className="lead">No Active Project</p>
                      </div>;
                      } else if(value.idea.state !== "project" && value.idea.category === 'Community' && index === this.state.ideas.length - 1){
                        return <div key={index}>
                        <br/>
                        <p className="lead">No Active Project</p>
                      </div>;
                      } else if(value.idea.state !== "project" && value.idea.category === 'Arts' && index === this.state.ideas.length - 1){
                        return <div key={index}>
                        <br/>
                        <p className="lead">No Active Project</p>
                      </div>;
                      } else if(value.idea.state !== "project" && value.idea.category === 'Energy' && index === this.state.ideas.length - 1){
                        return <div key={index}>
                        <br/>
                        <p className="lead">No Active Project</p>
                      </div>;
                      } else if(value.idea.state !== "project" && value.idea.category === 'Manufacturing' && index === this.state.ideas.length - 1){
                        return <div key={index}>
                        <br/>
                        <p className="lead">No Active Project</p>
                      </div>;
                      } else{
                        return null;
                      }
                    })}
                  </div>
                </div>
              </div>
            </div>
          );
        }
        else{
          return(
            <div>
              <Navbar/>
            </div>
          );
        }
      }

}

export default Category;