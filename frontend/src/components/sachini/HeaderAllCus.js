import React from "react";
import "../sammani/assetsUI/css/headerUI.css"
import { Link } from "react-router-dom";



function HeaderMain(){
    const myImage = require('../NavBar/GreenfieldPro Logo.png');

    return(
        <div className="container position-sticky z-index-sticky top-0"><div className="row"><div className="col-12">
        <nav style={{height:"100px"}} className="navbar navbar-expand-lg  blur border-radius-xl top-0 z-index-fixed shadow position-absolute my-3 py-2 start-0 end-0 mx-4">
          <div className="container-fluid px-0">
             <Link to={'#'}>
                                <img src={myImage}  style={{width:"80px",height:"80px",marginLeft:"20px"}} />
                            </Link>
            <a className="navbar-brand font-weight-bolder ms-sm-3"href="/#" style={{fontSize:"30px"}}>
           Green Field Pro
            </a>
            <button className="navbar-toggler shadow-none ms-2" type="button" data-bs-toggle="collapse" data-bs-target="#navigation" aria-controls="navigation" aria-expanded="false" aria-label="Toggle navigation">
              <span className="navbar-toggler-icon mt-2">
                <span className="navbar-toggler-bar bar1"></span>
                <span className="navbar-toggler-bar bar2"></span>
                <span className="navbar-toggler-bar bar3"></span>
              </span>
            </button>
            <div className="collapse navbar-collapse pt-3 pb-2 py-lg-0 w-100" id="navigation">
              <ul className="navbar-nav navbar-nav-hover ms-auto">
            
                <li className="nav-item dropdown dropdown-hover mx-2">
                  <a  href="#"  className="nav-link ps-2 d-flex cursor-pointer align-items-center" id="dropdownMenuPages" data-bs-toggle="dropdown" aria-expanded="false "style={{fontSize:"18px"}}>
                    <i  className="material-icons opacity-6 me-2 text-md">home</i>
                   Home
                  </a> 
                </li>
                <li className="nav-item dropdown dropdown-hover mx-2">
                  <a  href="#"  className="nav-link ps-2 d-flex cursor-pointer align-items-center"style={{fontSize:"18px"}} >
                    <i className="material-icons opacity-6 me-2 text-md">money</i>
                About Us
                  </a>
                    <div className="d-none d-lg-block">
                  </div>    
                </li>
                <li className="nav-item dropdown dropdown-hover mx-2">
                  <a  href="#"  className="nav-link ps-2 d-flex cursor-pointer align-items-center" id="dropdownMenuDocs" data-bs-toggle="dropdown" aria-expanded="false" style={{fontSize:"18px"}}>
                    <i className="material-icons opacity-6 me-2 text-md">article</i>
                   Contact Us
                  </a>
              
                </li>
                <div className="row">
                                
                                <div className="col-sm" style={{marginRight:"10px"}}>
                                    <Link to={`../`} style={{backgroundColor:"#246d1c"}}  className="btn btn-outline-success"><span className="button-text">Sign Out</span></Link>
                                </div>
                 </div>
               
               
              </ul>
            </div>
          </div>
        </nav>
        
        </div></div></div>
    )
} export default HeaderMain;