import React from "react";
import Header from "./CropProtectionHeader";
import "./assetsUI/css/cropProtection.css"
import { useEffect, useState } from 'react';




function CropProtection() {
//Count
const [counts, setCounts] = useState({
  state1: 0,
  state2: 0,
  state3: 0,
});

useEffect(() => {
  const targets = {
    state1: 30,
    state2: 70,
    state3: 20,
  };

  const duration = 3000; // 3 seconds

  const intervalId = setInterval(() => {
    let updatedCounts = { ...counts };
    let allCountsReached = true;

    for (const key in counts) {
      if (counts[key] < targets[key]) {
        updatedCounts[key]++;
        allCountsReached = false;
      }
    }

    setCounts(updatedCounts);

    if (allCountsReached) {
      clearInterval(intervalId);
    }
  }, duration / Math.max(...Object.values(targets)));

  return () => clearInterval(intervalId);
}, [counts]);





  return (
    <>
    <Header/>
    <header className="header-2 ">
<div className="page-header min-vh-75 relative bgimage" >
<span className="mask bg-gradient bgclr opacity-4"></span>
<div className="container">
  <div className="row">
    <div className="col-lg-7 text-center mx-auto">
      <h1 className="text-white pt-3 mt-n5">Crop Protection</h1>
      <p className="lead text-white mt-3"><b>The Crop Protection Division represents world-renowned research and development companies and markets a diverse range of high efficacy crop protection solutions with a minimal footprint on the environment.   <br/>"Our aim is to guide farmers towards profitability in a sustainable manner." </b></p>
    </div>
  </div>
</div>
</div>
</header>

<div className="card card-body blur shadow-blur mx-3 mx-md-4 mt-n6">

<section className="pt-3 pb-4" style={{background:"linearGradient(45deg, #9BFF9B, #FFFF00, #FFA500);"}} id="count-stats">
  <div className="container">
    <div className="row">
      <div className="col-lg-9 mx-auto py-3">
        <div className="row">
        {Object.entries(counts).map(([key, value]) => (
                    <div className="col-md-4 position-relative" key={key}>
                      <div className="p-3 text-center">
                        <h1 className="text-gradient text-success">
                          <span id={key}>{value}</span>+
                        </h1>
                        <h3 style={{color:"blue"}} className="mt-3">
                          {key === 'state1' ? 'Products' : key === 'state2' ? 'Sales' : key === 'state3' ? 'Service' : ''}
                        </h3>
                        <p className="font-weight-normal" style={{fontSize:"16px"}}>
                          {key === 'state1'
                            ? 'At present, our product range includes Herbicides, Insecticides, Herbicides, Fungicides, Plant Growth Hormones, Speciality Liquid Fertilizers and Compound Granular Fertilizers.'
                            : key === 'state2'
                            ? 'We market plant protection chemicals through a strong and well-knit network of distributors covering the entire island. We take pride in high quality products we import from reliable sources as well as our long standing relationship with our customers'
                            : key === 'state3'
                            ? 'Management of pesticides by minimizing associated health and environmental risks while assuring required proficiency & necessary awareness for achieving the highest efficacy of chemical pest control as the last option. '
                            : ''}
                        </p>
                      </div>
                      <hr className="vertical dark" />
                    </div>
                  ))}
                </div>
              </div>
            </div>
          </div>
        </section>
  <div class="row mt-6">
  <div class="col-lg-4 col-md-8 "  style={{borderRadius:"10px"}}>
        <div class="card " style={{borderRadius:"10px"}}>
        <img style={{maxWidth:"500px",borderRadius:"5px"}} className="bgcardimg" src={require("./assetsUI/img/pesticides3.jpeg")}/>
        </div>
      </div>
      <div class="col-lg-4 col-md-8 "  style={{borderRadius:"10px"}}>
        <div class="card " style={{borderRadius:"10px"}}>
        <img style={{maxWidth:"650px",borderRadius:"5px"}} className="bgcardimg" src={require("./assetsUI/img/Pesticides1.jpeg")}/>
        </div>
      </div>
      <div class="col-lg-4 col-md-8 "  style={{borderRadius:"10px"}}>
        <div class="card " style={{borderRadius:"10px"}}>
        <img style={{maxWidth:"900px",borderRadius:"5px"}} className="bgcardimg" src={require("./assetsUI/img/pesticides4.jpeg")}/>
        </div>
      </div>

    </div>

       <section style={{backgroundColor:"lightgrey"}} class="my-5 py-5">
  <div class="container">
    <div class="row">
      <div class="row justify-content-center text-center my-sm-5">
        <div class="col-lg-6">
          <p class="lead"><b>" We provide solutions to protect agricultural crops from Weeds, diseases and insect pests by marketing a wide range of Herbicides, Fungicides and Insecticides. We are continuously in search of more effective and eco-friendly products which are more compatible with the environment, while enhancing control of pests in crops. "</b> </p>
        </div>
      </div>
    </div>
  </div>
  </section>
  

       
  <div className="container sectionimage">
    <div className="row align-items-center">
      <div className="col-lg-4 ms-auto me-auto p-lg-4 mt-lg-0 mt-4">
        <div className="rotating-card-container">
          <div className="card card-rotate card-background card-background-mask-primary shadow-primary mt-md-0 mt-5">
            <div className="front front-background" style={{backgroundSize: "cover"}}>
              <div className="card-body py-7 text-center cardbg" style={{width:"400px"}} >
                <i className="material-icons text-white text-4xl my-3">touch_app</i>
                <h3 className="text-white"><br />Pesticides</h3>
                <p  style= {{ fontSize: "18px"}} className="text-white opacity-8">If you are advised to buy pesticides be prepared and buy with care.</p>
              </div>
            </div>
            <div className="back back-background" style= {{ backgroundSize: "cover"}}>
              <div className="card-body pt-7 text-center cardbg2" style={{width:"400px"}}>
                <a href="/pesticides"  className="btn btn-white btn-sm w-50 mx-auto mt-3" style={{backgroundColor:"white"}}>Start with pesticide Products</a>
              </div>
            </div>
          </div>
        </div>
      </div>
      <div className="col-lg-6 ms-auto">
        <div className="row justify-content-start">
          <div className="col-md-6">
            <div className="info">
              <h4 className="font-weight-bolder mt-3">Insecticides</h4>
              <p  style= {{ fontSize: "18px" , color:"black"}}className="pe-5"><b>Formulated to kill, harm, repel or mitigate one or more species of insect.hey include ovicides and larvicides used against insect eggs and larvae, respectively.</b></p>
            </div>
          </div>
          <div className="col-md-6">
            <div className="info">
              <h4 className="font-weight-bolder mt-3">Fungicides</h4>
              <p  style= {{ fontSize: "18px"}} className="pe-3"><b>Kill parasitic fungi or their spores. They are most commonly chemical compounds, but may include biocontrols and fungistatics.</b></p>
            </div>
          </div> 
        </div>
        <div className="row justify-content-start mt-5">
          <div className="col-md-6 mt-3">
            <h4 className="font-weight-bolder mt-3">Herbicides</h4>
            <p   style= {{ fontSize: "18px"}}className="pe-5"><b>Herbicides, also commonly known as weed killers, are substances used to control undesired plants.</b></p>
          </div>
          <div className="col-md-6 mt-3">
            <div className="info">
              <h4 className="font-weight-bolder mt-3">Weedicides</h4>
              <p  style= {{ fontSize: "18px"}} className="pe-3"><b>Chemical used to kill the weed and is generally used in agriculture to keep weed growth under control.</b></p>
            </div>
          </div>
        </div>
      </div>
    </div>
  </div>
  <div class="row mt-6">
  <div class="col-lg-4 col-md-8 "  style={{borderRadius:"10px"}}>
        <div class="card " style={{borderRadius:"10px"}}>
          <img style={{maxWidth:"500px",borderRadius:"5px"}} className="bgcardimg" src={require("./assetsUI/img/wallpaper3.jpeg")}/>
        </div>
      </div>
      <div class="col-lg-4 col-md-8 "  style={{borderRadius:"10px"}}>
        <div class="card " style={{borderRadius:"10px"}}>
          <img style={{maxWidth:"500px",borderRadius:"5px"}} className="bgcardimg" src={require("./assetsUI/img/wallpaper.jpg")}/>
        </div>
      </div>
      <div class="col-lg-4 col-md-8 "  style={{borderRadius:"10px"}}>
        <div class="card " style={{borderRadius:"10px"}}>
          <img style={{maxWidth:"500px",borderRadius:"5px"}} className="bgcardimg" src={require("./assetsUI/img/wallpaper1.jpeg")}/>
        </div>
      </div>

    </div>
    <hr class="horizontal dark my-5"/>
  








      </div>
      


      
    </>
  );
}


export default CropProtection;
