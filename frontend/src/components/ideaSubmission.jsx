import React, { Component } from 'react';
import Navbar from './navbar.jsx';
import Footer from './footer.jsx';

const API_URL = require('../config.js');

class IdeaSubmission extends Component {
    constructor(props) {
        super(props);
        this.state = {
            title: '',
            category: '',
            community_impact: '',
            nature_impact: '',
            arts_impact: '',
            energy_impact: '',
            manufacturing_impact: '',
            image: '',
            ideaLink: ''
        };

        this.handleChange = this.handleChange.bind(this);
        this.postIdea = this.postIdea.bind(this);
    }

    componentDidMount(){
        const path = window.location.pathname;
        const navLink = document.getElementById(path.slice(1, path.length) + "Nav")
        const links = document.getElementsByClassName('nav-link');
        for(let i = 0; i < links.length; i++){
          links[i].style = "font-weight: 400; color: rgba(0, 0, 0, 0.5);"
        }
        navLink.style = "font-weight: bold; color: #007bff;"
        
        const images = document.getElementById('pictureUpload');
        images.addEventListener('input', function (evt) {
            console.log(evt.target.files);
            document.getElementById('fileText').innerText = evt.target.files[0].name;
        });

        const userLoggedIn = sessionStorage.getItem('loggedin');
        const signInWarning = document.getElementById('signInWarning');
        const submitIdeaBtn = document.getElementById('submitIdeaBtn');
        if(userLoggedIn){
            signInWarning.hidden = true;
            submitIdeaBtn.hidden = false;
        }
        else{
            signInWarning.hidden = false;
            submitIdeaBtn.hidden = true;
        }
    }
    
    handleChange(event) {
        this.setState({[event.target.name]: event.target.value});
    }

    async postIdea(e){
        e.preventDefault();
        try{
        let data = JSON.stringify({
            title: this.state.title,
            category: this.state.category,
            description: this.state.description,
            community_impact: this.state.community_impact,
            nature_impact: this.state.nature_impact,
            arts_impact: this.state.arts_impact,
            energy_impact: this.state.energy_impact,
            manufacturing_impact: this.state.manufacturing_impact
        });

        let response = await fetch(API_URL+"/idea", {
            method: "POST",
            headers: {"Content-Type": "application/json"},
            credentials: 'include',
            body: data
        });
        if (response.ok){
            console.log('Idea posted successfully')
            const images = document.getElementById('pictureUpload');
            let formData  = new FormData();
            formData.append('file', images.files[0]);
            response.json().then(async (data) => {
                this.setState({ideaLink:  'http://dev.mylivingcity.org/idea/'+ data.id})
                document.getElementById('seeIdea').hidden = false;
                document.getElementById('signInWarning').hidden = true;
                document.getElementById('submitIdeaBtn').hidden = true;
                let imageResponse = await fetch(API_URL+"/idea/" + data.id + "/images", {
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
        else{
            console.log('Idea post failed', response)
        }
        }
        catch(e){
            console.log(e.stack);
        }
    }


render() {
    return (
    <div className="IdeaSubmission">
        <Navbar/>
        <h1 className="pt-3 pl-4 pb-4">Submit Idea</h1>
        <div className="row mt-2 mr-0 ml-0">
            <div className="col-2">
            </div>
            <div className="col-8">
            <form onSubmit={this.postIdea}>
                <div className="form-group">
                    <p>Select Category: </p>
                    <select onChange={this.handleChange} name="category" className="form-control text-center" id="ideaCategoryInput" required>
                      <option value="Community">Community</option>
                      <option value="Nature">Nature</option>
                      <option value="Arts">Arts</option>
                      <option value="Energy">Energy</option>
                      <option value="Manufacturing">Manufacturing</option>
                    </select>
                </div>
                <div className="form-group">
                    <p>Whats Your Idea?</p>
                    <input onChange={this.handleChange} name="title" type="text" className="form-control" id="ideaTitleInput" aria-describedby="ideaTitle" placeholder="Enter the title for your Idea." required/>
                </div>
                <div className="form-group">
                    <p>Describe your Idea.</p>
                    <textarea onChange={this.handleChange} name="description" className="form-control" id="ideaDescriptionInput" rows="3" required></textarea>
                </div>
                <div className="form-group">
                    <p>How does your idea affect the community positively? (7 Petals)</p>
                    <input onChange={this.handleChange} name="community_impact" type="text" className="form-control" id="communityImpactInput" aria-describedby="communityImpact" placeholder="Community and Place" required/>
                </div>
                <div className="form-group">
                    <input onChange={this.handleChange} name="nature_impact" type="text" className="form-control" id="natureImpactInput" aria-describedby="natureImpact" placeholder="Nature and Food Security" required/>
                </div>
                <div className="form-group">
                    <input onChange={this.handleChange} name="arts_impact" type="text" className="form-control" id="artsImpactInput" aria-describedby="artsImpact" placeholder="Arts, Culture and Education" required/>
                </div>
                <div className="form-group">
                    <input onChange={this.handleChange} name="energy_impact" type="text" className="form-control" id="energyImpactInput" aria-describedby="energyImpact" placeholder="Water and Energy" required/>
                </div>
                <div className="form-group">
                    <input onChange={this.handleChange} name="manufacturing_impact" type="text" className="form-control" id="manufacturingImpactInput" aria-describedby="manufacturingImpact" placeholder="Manufacturing and Waste" required/>
                </div>
                {/*
                <div className="form-group">
                    <input onChange={this.handleChange} name="equity_petal" type="text" className="form-control" id="equityPetalInput" aria-describedby="equityPetal" placeholder="Equity" required/>
                </div>
                <div className="form-group">
                    <input onChange={this.handleChange} name="beauty_petal" type="text" className="form-control" id="beautyPetalInput" aria-describedby="beautyPetal" placeholder="Beauty" required />
                </div>
                */}
                <div className="input-group mb-3">
                    <div className="input-group-prepend">
                        <span className="input-group-text" id="inputGroupFileAddon01">Upload Picture</span>
                    </div>
                    <div className="custom-file">
                        <input type="file" className="custom-file-input" id="pictureUpload"/>
                        <label className="custom-file-label" id="fileText">Choose file</label>
                    </div>
                </div>           
                <div className="text-center">
                    <p id="seeIdea" hidden className="lead">Thanks for Posting!<br/><a href={this.state.ideaLink}>See your Idea</a></p>
                    <button id="submitIdeaBtn" type="submit" className="btn btn-primary">Submit your Idea!</button>
                    <button id="signInWarning" className="btn btn-primary" data-toggle="modal" data-target="#loginModal">Sign In To Post</button>
                    <br /><br />
                </div>
                </form>
            </div>
            <div className="col-2">
            </div>
        </div>
        <Footer />
    </div>
    );
}
}

export default IdeaSubmission;
