import React from "react";
import "./assetsUI/css/headerUI.css"


function CropProtectionHeader(){
  

    return(
        <div className="container position-sticky z-index-sticky top-0"><div className="row"><div className="col-12">
        <nav className="navbar navbar-expand-lg  blur border-radius-xl top-0 z-index-fixed shadow position-absolute my-3 py-2 start-0 end-0 mx-4">
          <div className="container-fluid px-0">
            <a className="navbar-brand font-weight-bolder ms-sm-3"href="/crop-Protection" style={{fontSize:"20px"}}>
            CROP PROTECTION
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
            
                <li  className="nav-item dropdown dropdown-hover mx-2">
                  <a   href="/crop-Protection"  className="nav-link ps-2 d-flex cursor-pointer align-items-center" id="dropdownMenuPages" data-bs-toggle="dropdown" aria-expanded="false "style={{fontSize:"18px"}}>
                    <i className="material-icons opacity-6 me-2 text-md">home</i>
                   Home
                  </a> 
                </li>
                
                <li className="nav-item dropdown dropdown-hover mx-2">
                  <a  href="/pesticides"  className="nav-link ps-2 d-flex cursor-pointer align-items-center" style={{fontSize:"18px"}} >
                    <i className="material-icons opacity-6 me-2 text-md">sanitizer</i>
                  Products
                  </a>
                </li>
                <li className="nav-item dropdown dropdown-hover mx-2">
                  <a  href="/payment-Details"  className="nav-link ps-2 d-flex cursor-pointer align-items-center"style={{fontSize:"18px"}} >
                    <i className="material-icons opacity-6 me-2 text-md">money</i>
                 Payment Details
                  </a>
                    <div className="d-none d-lg-block">
                  </div>    
                </li>
                <li className="nav-item dropdown dropdown-hover mx-2">
                  <a  href="/productrequests"  className="nav-link ps-2 d-flex cursor-pointer align-items-center" id="dropdownMenuDocs" data-bs-toggle="dropdown" aria-expanded="false" style={{fontSize:"18px"}}>
                    <i className="material-icons opacity-6 me-2 text-md">article</i>
                Contact Us
                  </a>
              
                </li>
               
              </ul>
            </div>
          </div>
        </nav>
        
        </div></div></div>
    )
} export default  CropProtectionHeader;