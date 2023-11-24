import React from "react";
import './pmhome.css';
import backgroundImage from "./newbg.jpg";
import { Link } from 'react-router-dom';

function PMHome() {
  const containerStyle = {
    backgroundImage: `linear-gradient(rgba(0, 0, 0, 0.5), rgba(0, 0, 0, 0.5)), url(${backgroundImage})`, // Set the image as the background
    backgroundPosition: "center",
    backgroundSize: "cover",
    width: "100%",
    height: "100vh",
    position: "relative",
    display: "flex", // Use flex to create a two-column layout
    alignItems: "center", // Vertically center the content
    justifyContent: "center", // Horizontally center the content
  };

  const contentStyle = {
    flex: 1, // Take up all available horizontal space
    padding: "20px",
    color: "#fff",
    textAlign: "center",
  };

  const cardContainerStyle = {
    flex: 1, // Take up all available horizontal space
    display: "flex",
    justifyContent: "space-around", // Space the cards evenly
    alignItems: "center", //vertically center cards
  };

  return (
    <div style={containerStyle}>
      <div className="container">
        <br /><br /><br /><br/><br/><br/><br/><br/><br/>
        <br/><br/><br/>
        <div className="row">
          <div className="col-sm">
            <div>
              <h4 className="h1bh">Paddymill Management</h4>
              <p className="pbh">Register! Enjoy the benefits</p>
              <button type="buttonbh">Explore</button>
            </div>
          </div>
          <div className="col-sm">
            <div className="row">
              <div className="col-sm">
                <div className="card0bh card1bh">
                  <Link to={'/addpm'} className="textbh">Registration</Link>
                  <p className="pbh" >Register the paddymill</p>
                </div>
                <div className="card0bh card2bh ">
                  <Link to={'/addtender'} className="textbh">Tender</Link>
                  <p className="pbh">Tender for take harvest</p>
                </div>
                <div className="card0bh card3bh ">
                <Link to={'/vehicleTracking'} className="textbh">Distribution</Link>
                  <p className="pbh">Track the distribution</p>
                </div>
                <div className="card0bh card4bh">
                  <h5 className="pbh">Information</h5>
                  <p className="pbh">To knwo information</p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}

export default PMHome;
