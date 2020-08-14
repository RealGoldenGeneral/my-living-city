import React, { Component } from 'react';
import '../stylesheets/footer.css';

class Footer extends Component {

  render() {
    return (
      <div className="Footer">
        <div className="row" style={{"borderTop": "solid black 1px"}}>
            <div className="col-12 text-center mt-3">
                <p>My Living City &#9400; 2020</p>
            </div>
        </div>
      </div>
    );
  }
}

export default Footer;