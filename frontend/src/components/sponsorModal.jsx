import React, { Component } from 'react';

const API_URL = require('../config.js');

class SponsorModal extends Component {

    constructor(props) {
        super(props);
        this.state = {
            description: '',
            reasons: '',
            expertise: '',
            requirements: ''
        };

        this.handleChange = this.handleChange.bind(this);
        this.sponsor = this.sponsor.bind(this);
    }

    handleChange(event) {
        this.setState({[event.target.name]: event.target.value});
    }

    sponsor(e) {
        console.log(this.state);
    }

    render() {
        return (
            <div className="SponsorModal">
                <div className="modal fade" id="sponsorModal" role="dialog" aria-labelledby="sponsorModal" aria-hidden="true">
                    <div className="modal-dialog" role="document">
                        <div className="modal-content">
                            <div className="modal-header">
                                <h5 className="modal-title" id="sponsorModalLabel">Sponsor Details</h5>
                                <button type="button" className="close" data-dismiss="modal" aria-label="Close">
                                    <span aria-hidden="true">&times;</span>
                                </button>
                            </div>
                            <div className="modal-body text-center">
                                <form onSubmit={this.sponsor}>
                                    <div className="form-group">
                                        <input onChange={this.handleChange} type="text" name="description" className="form-control text-center" id="descriptionInput" placeholder="e.g. My name is..." required/>
                                    </div>
                                    <div className="form-group">
                                        <input onChange={this.handleChange} type="text" name="reasons" className="form-control text-center" id="reasonsInput" placeholder="e.g. I love my community" required/>
                                    </div>
                                    <div className="form-group">
                                        <input onChange={this.handleChange} type="text" name="expertise" className="form-control text-center" id="expertiseInput" placeholder="e.g. I have experience in..." required/>
                                    </div>
                                    <div className="form-group">
                                        <input onChange={this.handleChange} type="text" name="requirements" className="form-control text-center" id="requirementsInput" placeholder="e.g. Permits, equipment, etc..." required/>
                                    </div>
                                    <div id="statusContainer">
                                        <button id="submitBtn" type="submit" className="btn btn-primary">Submit Sponsorship</button>
                                        <div>
                                            <i id="confirmIcon" hidden className="fas fa-check fa-2x"></i>
                                            <i id="denyIcon" hidden className="far fa-times-circle fa-2x"></i>
                                        </div>
                                    </div>
                                </form>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        );
    }
}

export default SponsorModal;