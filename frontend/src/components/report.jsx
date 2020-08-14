import React, { Component } from 'react';
const API_URL = require('../config.js')


class ReportModal extends Component {

    constructor(props) {
        super(props);
        this.state = {
            email: '',
            reason: ''
        };
        this.handleChange = this.handleChange.bind(this);
        this.report = this.report.bind(this);
    }

    handleChange(event) {
        this.setState({[event.target.name]: event.target.value});
    }

   async report(e) {
        e.preventDefault();
        try{
        let data = JSON.stringify({
            email: this.state.email,
            reason: this.state.reason
        });
        let response = await fetch(API_URL + '/report', {
            method: 'POST',
            headers: {'content-type': 'application/json'},
            body: data
        });
        if(response.ok){
            console.log("The form successfully reported.")
        }
        else{
            console.log("The report submitted failed.")
        }
    }catch(e){
        console.log(e.stack)
    }
    console.log(this.state);
    window.location.reload();
    }

    render() {
        return (
            <div className="ReportModal">
                <div className="modal fade" id="reportModal" role="dialog" aria-labelledby="reportModal" aria-hidden="true">
                    <div className="modal-dialog" role="document">
                        <div className="modal-content">
                            <div className="modal-header">
                                <h5 className="modal-title" id="reportModalLabel">Report Inapproproate Comments</h5>
                                <button type="button" className="close" data-dismiss="modal" aria-label="Close">
                                    <span aria-hidden="true">&times;</span>
                                </button>
                            </div>
                            <div className="modal-body text-center">
                                <form onSubmit={(e) => this.report(e)}>
                                    <div className="form-group">
                                        Email:
                                        <input onChange={this.handleChange} type="text" name="email" className="form-control text-center" id="descriptionInput" placeholder="e.g. Your email..." required/>
                                    </div>
                                    <div className="form-group">
                                        Reason:
                                        <textarea onChange={this.handleChange} type="text" name="reason" className="form-control text-left" id="reasonsInput" placeholder="e.g. What is inappropriate content?" required/>
                                    </div>
                                    <div id="statusContainer">
                                        <button id="submitBtn" type="submit" className="btn btn-primary">Submit Report</button>
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

export default ReportModal;