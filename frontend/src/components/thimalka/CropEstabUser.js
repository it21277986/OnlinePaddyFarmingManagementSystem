import React, { useState } from 'react';
import './CEO.css';
import { Link } from 'react-router-dom';
import AllPaddyvar from './Allpaddyvar';

function CEuser() {
  const [selectedButton, setSelectedButton] = useState(null);

  const handleButtonClick = (buttonNumber) => {
    setSelectedButton(buttonNumber);
  };

  const buttonStyle = {
    fontSize: '14px',
    padding: '10px 20px',
  };

  return (
    <div className='container'>
      <br /><br />
      <div className="ceo-container">
        <div class="row">
          <div className="bottom-container">
            <AllPaddyvar />
          </div>
        </div>
        <div className="col-sm "><br /><br />
          <div class="d-flex flex-column mb-3">
          </div>
        </div>
      </div>
      <Link to={'/req'} class="btn btn-success" style={buttonStyle}>Request Seed</Link><br /><br />
      <Link to={'/APC'} class="btn btn-success" style={buttonStyle}>About Paddy Cultivation</Link><br /><br />
    </div>
  );
}

export default CEuser;
