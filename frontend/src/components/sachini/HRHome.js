import React from 'react';
import { Link } from 'react-router-dom';
import './styles/CustomerList.css';
import HeaderMain from "./HeaderAllCus";

function HRHome() {
  return (
    <div>
     <HeaderMain/>
     <br></br><br></br><br/><br/><br/>
    <div>
        <h1>Welcome, HR Manager!</h1>
        <Link to="/customer-list">
            <button className="custom-button-sachini">Get Customer List from here</button>
        </Link>
        <Link to="/deleted-customer-list">
        <button className="custom-button-sachini">Get Deleted Customer List from here</button>
      </Link>
    </div>
    </div>
  );
}

export default HRHome;
