import React, { Component } from 'react';
import '../stylesheets/home.css';
import logo from '../media/MyLivingCityLogo.png';
import Navbar from './navbar.jsx';
import Footer from './footer.jsx';
import Moment from 'react-moment';
import Nature from '../media/nature-friendly.jpg';
import Energy from '../media/energy.jpg';
import Community from '../media/community.jpg';
import Arts from '../media/arts.jpg';
import Manufacturing from '../media/manufacturing.jpg';
import Ratings from 'react-ratings-declarative';

const API_URL = require('../config.js')


class Home extends Component {

  constructor(props) {
    super(props);
    this.state = {
        ideas: []
    };
    this.getIdeas = this.getIdeas.bind(this);
  }

  componentDidMount(){
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
        });
      });
    }
    catch(e){
        console.log(e.stack);
    }
  }

  render() {
    return (
      <div className="Home">
        <Navbar/>
        <div className="jumbotron jumbotron-fluid" id="banner">
            <div className="container">
                <img src={logo} alt="logo" width="600"/>
                <p className="lead">
                    In order to transform our cities into living cities that exist in complete integrity with the natural world, we need to empower every citizen to engage in a conversation for change and a call to take action in their community.
                </p>
            </div>
        </div>
        <div className="row">
          <div className="col-12 text-center">
            <br/>
            <h1 className="display-4">New and Trending</h1>
            <br/>
            <br/>
            <div className="row">
              {this.state.ideas.map((value, index) => {
                if(index < 3){
                  return <div className="col-4" key={index}>
                  <div className="card newTrendingCard">
                    <a href={"/idea/" + value.idea.id}>
                      <div className="card-body">
                      <h6 className="card-subtitle">Category: {value.idea.category} </h6>
                        <h5 className="card-title">{value.idea.title}</h5>
                        <h6 className="card-subtitle mb-2 text-muted">Posted by: {value.idea.User.fname} {value.idea.User.lname}</h6>
                        <p className="card-text">{value.idea.description.length < 30 ? value.idea.description: value.idea.description.slice(0, 30) + '...'}</p>
                        <div className="rcard-text">
                          {/* <div className="col-6">
                              <p className="likeText">{value.idea.upvotes} Likes</p>
                          </div>
                          <div className="col-6">
                              <p className="dislikeText">{value.idea.downvotes} Dislikes</p>
                          </div> */}
                            Average Rating:
                            <br/>
                            <Ratings
                              rating={Math.abs(value.rating != null ? parseFloat(value.rating.totalAverage) - 5 : 0)}
                              widgetRatedColors={(value.averageRating != null ? parseFloat(value.rating.totalAverage) : 0) > 2.5 ? "lightgreen" : "red"}
                              widgetEmptyColors="grey"
                              widgetDimensions="30px"
                                  >
                              <Ratings.Widget />
                              <Ratings.Widget />
                              <Ratings.Widget />
                              <Ratings.Widget />
                              <Ratings.Widget />
                            </Ratings>
                          <div className="col-12">
                            <Moment format="MMM Do YYYY">{value.idea.createdAt}</Moment>
                          </div>
                        </div>
                      </div>
                    </a>
                  </div>
                </div>
                }
                else{
                  return null
                  }
              })}
              <div className="col-12">
                <br/>
                <br/>
                <h5><a href="/conversations">View all ideas and conversations</a></h5>
                <br/>
                <br/>
              </div>
            </div>

            <div className="container-fluid"> <h1 className='display-4'>Project Category</h1><br/>

              <div className="row">
                <div className="col-md-4">
                  <div className="card category">
                    <a href={"/Nature/idea/"}>
                      <div className="card-image">
                        <img src={Nature} className='img-thumbnail'alt='nature img'/>
                        <h4><span className="card-title">Nature</span></h4>
                      </div>
                      <div className="card-content">
                        <p>I am a very simple card. I am good at containing small bits of information. I am convenient because I require little markup to use effectively.</p>
                      </div>
                    </a>
                  </div>
                </div>

                <div className="col-md-4">
                  <div className="card category">
                    <a href={"/Community/idea/"}>
                      <div className="card-image">
                        <img src={Community} className='img-thumbnail' alt='community img'/>
                        <h4><span className="card-title">Community</span></h4>
                      </div>
                      <div className="card-content">
                        <p>I am a very simple card. I am good at containing small bits of information. I am convenient because I require little markup to use effectively.</p>
                      </div>
                    </a>
                  </div>
                </div>
                
                <div className="col-md-4">
                  <div className="card category">
                    <a href={"/Arts/idea/"}>
                      <div className="card-image">
                        <img src={Arts} className='img-thumbnail' alt='arts img'/>
                        <h4><span className="card-title">Arts</span></h4>
                      </div>
                      <div className="card-content">
                        <p>I am a very simple card. I am good at containing small bits of information. I am convenient because I require little markup to use effectively.</p>
                      </div>
                    </a>
                  </div>
                </div>
              </div>    
              <br/>

              <div className="row">
                <div className='col-md-2'></div>
                <div className="col-md-4">
                  <div className="card category">
                    <a href={"/Energy/idea/"}>
                      <div className="card-image">
                        <img src={Energy} className='img-thumbnail' alt='energy img'/>
                        <h4><span className="card-title">Energy</span></h4>
                      </div>
                      <div className="card-content">
                        <p>I am a very simple card. I am good at containing small bits of information. I am convenient because I require little markup to use effectively.</p>
                      </div>
                    </a>
                  </div>
                </div>

                <div className="col-md-4">
                  <div className="card category">
                    <a href={"/Manufacturing/idea/"}>
                      <div className="card-image">
                        <img src={Manufacturing} className='img-thumbnail' alt='manufacturing img'/>
                        <h4><span className="card-title">Manufacturing</span></h4>
                      </div>
                      <div className="card-content">
                        <p>I am a very simple card. I am good at containing small bits of information. I am convenient because I require little markup to use effectively.</p>
                      </div>
                    </a>
                  </div>
                </div>
              </div>

              <br/>
            </div>

            <div className="row" style={{"backgroundColor": "#e9ecef", "height": "500px"}}>
              <div className="col-12">
                <br/>
                <br/>
                <h1 className="display-4">Share your Ideas</h1>
                <br/>
                <br/>
                <br/>
                <div className="row">
                  <div className="col-4 text-center">
                    <i className="far fa-user-circle fa-6x"></i>
                    <br/>
                    <br/>
                    <p className="lead">Create your Account</p>
                  </div>
                  <div className="col-4 text-center">
                    <i className="fas fa-clipboard-list fa-6x"></i>
                    <br/>
                    <br/>
                    <p className="lead">Post your Idea</p>
                  </div>
                  <div className="col-4 text-center">
                    <i className="far fa-comments fa-6x"></i>
                    <br/>
                    <br/>
                    <p className="lead">Take part in Discussion</p>
                  </div>
                  <div className="col-12 text-center">
                    <br/>
                    <br/>
                    <h5>MyLivingCity provides the platform for your community to discuss ideas.</h5>
                  </div>
                </div>
              </div>
            </div>
            <Footer/>
          </div>
        </div>
      </div>
    );
  }
}

export default Home;
