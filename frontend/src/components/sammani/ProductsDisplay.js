import React from "react"
import "./assetsUI/css/pesticides.css"
import  { useEffect, useState } from "react";
import  axios from "axios";
import "./assetsUI/css/headerUI.css"
import Footer from "./Footer.js";


function ProductDisplay(){

  const [searchInput, setSearchInput] = useState('');

     //Display
   const [data,setData]= useState([]);
   useEffect(() => {
    axios
      .get("http://localhost:8070/pesticides/")
      .then((res) => {
        setData(res.data);
        console.log("Data from the server:", res.data); 
      })
      .catch((err) => console.log(err, 'There is an Error'));
  }, []);

  //search
  const filteredData = data.filter((singleData) =>
  singleData.productName.toLowerCase().includes(searchInput.toLowerCase())
);


  return (
    <div>
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
              <li className=" search-box">
            
  <input class="s-box" type="text" name="search"  placeholder="Search for products" value={searchInput}
                    onChange={(e) => setSearchInput(e.target.value)}/>
  <a class="s-btn" href="/search-Product">
  <i class="fab fa-searchengin" ></i>
  </a>

                </li>
            
                  <a  href="/crop-Protection"  className="nav-link ps-2 d-flex cursor-pointer align-items-center" id="dropdownMenuPages" data-bs-toggle="dropdown" aria-expanded="false "style={{fontSize:"18px"}}>
                    <i  className="material-icons opacity-6 me-2 text-md">home</i>
                   Home
                  </a> 
                
                
                  <a  href="/pesticides"  className="nav-link ps-2 d-flex cursor-pointer align-items-center" style={{fontSize:"18px"}} >
                    <i className="material-icons opacity-6 me-2 text-md">sanitizer</i>
                  Products
                  </a>
               
               
                  <a  href="/payment-Details"  className="nav-link ps-2 d-flex cursor-pointer align-items-center"style={{fontSize:"18px"}} >
                    <i className="material-icons opacity-6 me-2 text-md">money</i>
                 Payment Details
                  </a>
                    <div className="d-none d-lg-block">
                  </div>    
                
               
                  <a  href="#pablo"  className="nav-link ps-2 d-flex cursor-pointer align-items-center" id="dropdownMenuDocs" data-bs-toggle="dropdown" aria-expanded="false" style={{fontSize:"18px"}}>
                    <i className="material-icons opacity-6 me-2 text-md">article</i>
                   Contact Us
                  </a>
              
               
               
              </ul>
            </div>
          </div>
        </nav>
        
        </div></div></div>
      <header className="header-2 ">
<div className="page-header min-vh-75 relative pesticidebg" >
<span className="mask bg-gradient bgclr opacity-4"></span>
<div className="container">
  <div className="row">
    <div className="col-lg-7 text-center mx-auto">
      <h1 className="text-white pt-3 mt-n5"></h1>
      <p className="lead text-white mt-3"><b> <br/> </b></p>
    </div>
  </div>
</div>
</div>
</header>
<section className="pt-3 pb-4" id="count-stats">
<div className="card card-body blur shadow-blur mx-3 mx-md-4 mt-n6">
      <div className="container position-sticky z-index-sticky top-0">
      < div id="pricing-tables" className="home-section nav row">
        <div className="container">
        {filteredData.map((singleData, index) => {
            const base64String = btoa(
              String.fromCharCode(...new Uint8Array(singleData.image.data.data))
            );
            return(
              <div className="col-md-3 col-sm-6 col-xs-12 color-1" style={{ display: "inline-block" , width: "fit-content"}} key={index}>
                <div className="single-table text-center">
                    <div className="">
                    <img src={`data:image/png;base64,${base64String}`} alt="pesticide" />
                       
                    </div>

                    <ul className="text-center">
                    <li style={{ fontSize: "18px", color:"black" }}>{singleData.productName}</li>
                        
                    </ul>
                    <a  href={`/pesticide/${singleData.productName}/${singleData.pesticideId}`} className="plan-submit hvr-bubble-float-right" >View</a>
                </div>
            </div>
          
          );
        })}
        </div>
    </div>
    </div>
    </div>
    <div>
<br></br>  <br></br><br></br>  <br></br>  <br></br>  <br></br>
  
  </div>
    </section>

    </div>
    
  );
}

export default ProductDisplay;





