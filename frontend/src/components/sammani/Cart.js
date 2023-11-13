import React from "react";
import axios from "axios";
import CropProtectionHeader from "./CropProtectionHeader.js";

 function Cart(){
    

    return(
        <>
        <CropProtectionHeader/>
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
<section className="pt-3 pb-4" id="count-stats" >
<div className="card card-body blur shadow-blur mx-3 mx-md-4 mt-n6">
<div className="page-header min-vh-75 relative" >
<div className="container position-sticky z-index-sticky top-0" ></div>

</div>
</div>
</section>

        </>
    )
 } export default Cart;
