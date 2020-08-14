import React, { Component } from 'react';
import '../stylesheets/about.css';
import chelsea from '../media/chelsea.jpg'
import paul from '../media/paul.jpg'

import Navbar from './navbar';
import Footer from './footer.jsx';

class About extends Component {

  componentDidMount(){
    const path = window.location.pathname;
    const navLink = document.getElementById(path.slice(1, path.length) + "Nav")
    const links = document.getElementsByClassName('nav-link');
    for(let i = 0; i < links.length; i++){
      links[i].style = "font-weight: 400; color: rgba(0, 0, 0, 0.5);"
    }
    navLink.style = "font-weight: bold; color: #007bff;"
  }

  render() {
    return (
      <div className="About">
        <Navbar/>
        <h1 className="pt-3 pl-4 pb-4">About Us</h1>
        <div className="row">
          <div className="col-lg-3 col-md-3 col-sm-6 col-xs-12 text-center pt-3 pb-3">
            <img className="teamImg" src="https://avatars1.githubusercontent.com/u/27584221?s=460&v=4" alt="..."/>
            <h5>Chris Eddy</h5>
            <p>Full-stack Web Developer</p>
            <div className="row pr-5 pl-5">
              <div className="col-4">
                <a href="https://github.com/ChrisEddy">
                  <i className="fab fa-github fa-2x"></i>
                </a>
              </div>
              <div className="col-4">
                <a href="https://twitter.com/ChrisEddyDev">
                  <i className="fab fa-twitter fa-2x"></i>
                </a>
              </div>
              <div className="col-4">
                <a href="https://www.linkedin.com/in/chris-eddy-394784160/">
                  <i className="fab fa-linkedin-in fa-2x"></i>
                </a>
              </div>
            </div>
          </div>
          <div className="col-lg-3 col-md-3 col-sm-6 col-xs-12 text-center pt-3 pb-3">
            <img className="teamImg" src={paul} alt="..."/>
            <h5>Paul Sajna</h5>
            <p>Backend Developer / Dev-Ops</p>
            <div className="row pr-5 pl-5">
              <div className="col-4">
                <a href="https://github.com/sajattack">
                  <i className="fab fa-github fa-2x"></i>
                </a>
              </div>
              <div className="col-4">
                <a href="https://twitter.com/sajattack">
                  <i className="fab fa-twitter fa-2x"></i>
                </a>
              </div>
              <div className="col-4">
                <a href="https://www.linkedin.com/in/paulsajna/">
                  <i className="fab fa-linkedin-in fa-2x"></i>
                </a>
              </div>
            </div>
          </div>
          <div className="col-lg-3 col-md-3 col-sm-6 col-xs-12 text-center pt-3 pb-3">
            <img className="teamImg" src={chelsea} alt="..."/>
            <h5>Chelsea Birch</h5>
            <p>Business Analyst</p>
            <div className="row pr-5 pl-5">
              <div className="col-4">
                <a href="https://github.com/chelc99">
                  <i className="fab fa-github fa-2x"></i>
                </a>
              </div>
              <div className="col-4">
                <i className="fab fa-twitter fa-2x" style={{"color": "#a9a9a9c2"}}></i>
              </div>
              <div className="col-4">
                <i className="fab fa-linkedin-in fa-2x" style={{"color": "#a9a9a9c2"}}></i>
              </div>
            </div>
          </div>
          <div className="col-lg-3 col-md-3 col-sm-6 col-xs-12 text-center pt-3 pb-3">
            <img className="teamImg" src="https://via.placeholder.com/200" alt="..."/>
            <h5>Sonny Brar</h5>
            <p>Sponsor</p>
            <div className="row pr-5 pl-5">
              <div className="col-4">
                <i className="fab fa-github fa-2x" style={{"color": "#a9a9a9c2"}}></i>
              </div>
              <div className="col-4">
                <i className="fab fa-twitter fa-2x" style={{"color": "#a9a9a9c2"}}></i>
              </div>
              <div className="col-4">
                <i className="fab fa-linkedin-in fa-2x" style={{"color": "#a9a9a9c2"}}></i>
              </div>
            </div>
          </div>
        </div>

        <div className="row pt-4 pl-4 pr-4">
          <div className="col-lg-6 col-md-6 col-sm-12 col-xs-12">
            <h2>Our Story</h2>
            <p>
              My Living City is a federally and BC registered non-profit.  We are committed to causing the shift to a fully sustainable world by creating and providing platforms for citizens to work together in their communities, with their municipalities, to enable sustainable development and practices to be created and implemented on a local level.
            </p>
            <p>
              My Living City’s goal is to develop and implement a  Community Sustainable Development Discussion Platform to open the current community development process to those that have traditionally not  had the opportunity for involvement or have who have had barriers to access.  We are currently building a partnership with local municipalities of the Greater Victoria Area to offer our platform for use and testing.  We plan to involve their city planning staff in the requirements definition process in order to build a product that will truly impact the community.
            </p>
          </div>
          <div className="col-lg-6 col-md-6 col-sm-12 col-xs-12">
          <h2>Our Purpose</h2>
          <p>
            By creating an online space for collaboration and co-creation, we can initiate this conversation for change. In this online space citizens can offer ideas and visions to each other, allow them to be voted on, liked or shared with others. City planners can explore trending ideas to be selected for inclusion into their development plans and programs, as well as being informed on the priorities and visions of its residents to inform planning priorities.
          </p>
          <p>
            Increasing the knowledge in the community, contributing experts can post on the sites blogs with information helping residents and cities to deepen their sustainable mindset and be more adept at making choices and decisions that reduce the impact to the environment. As well as creating an invitation for citizens to group and be the source of meaningful development in their community.
          </p>
          </div>
        </div>
        <Footer />
      </div>
    );
  }
}

export default About;