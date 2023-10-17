import React, { useState } from "react";
import { Link } from "react-router-dom";
import "./styles/Header.css";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faSearch } from "@fortawesome/free-solid-svg-icons";
import logo from "./images/logo.jpg"; 

const searchRoutes = {
  login: '/loginCus',
  registration: '/register',
  register: '/register',
  fertilizer: '/fertilizer', 
  pesticides: '/pesticides', 
  ticket: '/ticket', 
  selling: '/selling', 
  crops: '/crops', 
};


function Cus() {
  const [searchQuery, setSearchQuery] = useState("");

  const handleSearch = () => {
    const lowercaseQuery = searchQuery.toLowerCase(); // Make the query case-insensitive
    if (searchRoutes[lowercaseQuery]) {
      // If there's a matching route, navigate to it
      window.location.href = searchRoutes[lowercaseQuery];
    } else {
      // If no matching route, display an "Invalid search" message
      alert("Invalid search");
    }
  };
  

  const handleKeyPress = (event) => {
    if (event.key === "Enter") {
      handleSearch();
    }
  };

  return (
    <header>
      <div className="header-top">
        <nav className="navbar navbar-expand-lg navbar-light">
          <div className="header-container">
            <center>
            <div className="header-brand">
                <div className="image"><img src={logo} alt="Green Field Pro Logo" className="logo" /></div>
              <Link
                className="navbar-brand"
                to="/"
                style={{
                  color: "black",
                  fontFamily: "Bowlby One",
                  fontSize: "60px",
                  fontWeight: "bold",
                }}
              >
                Green Field Pro
              </Link>
            </div>
            </center>
            <div className="header-buttons">
              <Link className="btn btn-success" to="/register">
                Register
              </Link>
              <Link className="btn btn-success" to="/loginCus">
                Login
              </Link>
            </div>
          </div>
        </nav>
      </div>
      <div className="header-bottom">
        <div className="nav-header-bottom">
          <ul>
            <li className="nav-item active">
              <Link
                className="nav-link"
                to="/"
                style={{ color: "black", fontSize: "20px" }}
              >
                Home
              </Link>
            </li>
            <li className="nav-item">
              <Link
                className="nav-link"
                to="/about"
                style={{ color: "black", fontSize: "20px" }}
              >
                Fertilizer
              </Link>
            </li>
            <li className="nav-item">
              <Link
                className="nav-link"
                to="/downloads"
                style={{ color: "black", fontSize: "20px" }}
              >
                Pesticides
              </Link>
            </li>
            <li className="nav-item">
              <Link
                className="nav-link"
                to="/news"
                style={{ color: "black", fontSize: "20px" }}
              >
                Machines
              </Link>
            </li>
            <li className="nav-item">
              <Link
                className="nav-link"
                to="/news"
                style={{ color: "black", fontSize: "20px" }}
              >
                Crops
              </Link>
            </li>
            <li>
              <div className="rounded-search-bar">
                <input
                  type="text"
                  placeholder="Search"
                  value={searchQuery}
                  onChange={(e) => setSearchQuery(e.target.value)}
                  onKeyPress={handleKeyPress}
                />
                <button className="search-button" onClick={handleSearch}>
                  <FontAwesomeIcon icon={faSearch} />
                </button>
              </div>
            </li>
          </ul>
        </div>
      </div>
    </header>
  );
}

export default Cus;
