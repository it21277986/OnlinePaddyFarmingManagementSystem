import React from "react";
import Header from "./CropProtectionHeader";
import Footer from "./Footer";
import "./assetsUI/css/bankPayment.css"
import {IoMdCloudUpload} from "react-icons/io"
import { useState ,useEffect } from "react";
import{ Button } from "reactstrap"
import axios from "axios"


function PaymentUI(){

  const [selectedImage, setSelectedImage] = useState(null);
  const [selectedImageName, setSelectedImageName] = useState(null);
  const [isUploadIconVisible, setIsUploadIconVisible] = useState(true);

//checking requestId
const [existingRequestIds, setExistingRequestIds] = useState([]);
useEffect(() => {
    // Fetch existing request IDs from the backend when the component mounts
    axios.get("http://localhost:8070/requestPesticide/").then((response) => {
      const requestIds = response.data.map((item) => item.requestId);
      setExistingRequestIds(requestIds);
    });
  }, []);




  //ADD function
     const [requestId, setrequestId] = useState("");
     const [AccountHolder, setAccountHolder] = useState("");
     const [AccountNo, setAccountNo] = useState("");
     const [Bank, setBank] = useState("");
     const [Branch, setBranch] = useState("");
     const [Amount, setAmount] = useState("");
     const [DepositedDate, setDepositedDate] = useState("");
     const [slip, setslip] = useState("");
 
     function onChangeFile(e) {
      const selectedFile = e.target.files[0];
  
      if (selectedFile) {
        const reader = new FileReader();
  
        reader.onload = (event) => {
          // Set the selected image data as a Data URL
          setSelectedImage(event.target.result);
          // Set the selected image name
          setSelectedImageName(selectedFile.name);
          //make the icon invisible
          setIsUploadIconVisible(false);
        };
  
        reader.readAsDataURL(selectedFile);
      }
  
      setslip(selectedFile);
    }
  
 
    function changeOnClick(e){
       e.preventDefault();
       if (existingRequestIds.includes(requestId)) {
       const formData = new FormData();
       formData.append("requestId", requestId);
       formData.append("AccountHolder", AccountHolder);
       formData.append("AccountNo", AccountNo);
       formData.append("Bank", Bank);
       formData.append("Branch", Branch);
       formData.append("Amount", Amount);
       formData.append("DepositedDate", DepositedDate);
       formData.append("slip", slip);
  
 
       const newTransaction = {
        requestId,
        AccountHolder,
        AccountNo,
        Bank,
        Branch,
        Amount,
        DepositedDate,
        slip,
       
       }
        console.log(newTransaction);
       
 
       axios.post("http://localhost:8070/bankPayment/add",formData,{
          headers: {"Content-Type": "multipart/form-data"},}).then(()=>{
           alert("Deposit Slip uploaded Successfully");
 
           setrequestId("");
           setAccountHolder("");
           setAccountNo("");
           setBank("");
           setBranch("");
           setAmount("");
           setDepositedDate("");
           setslip("");
       
          // Reload the page after adding the product
           window.location.reload();
 
 
       }).catch((err)=>{
           alert(err)
       })
 
       }else {
        // Show an error message because the requestId doesn't exist
        alert("Invalid Request ID. Please enter a valid Request ID.");
      }
    }







    return(
<div>
<Header/>
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
<div className="container position-sticky z-index-sticky top-0" >


<div style={{ display: "flex" }}>
    <div className="payment-form" style={{display:"block"}} >
        
    <form className="row g-3" onSubmit={changeOnClick} encType="multipart/form-data">
    <div className="col-md-2" style={{width:"325px"}}>
    <label for="requestId" className="form-label" style={{fontSize:"15px",color:"black",width:"100px"}} ><b>Request ID :</b></label>
    <input style={{width:"200px"}} type="text" className="form-control" value={requestId}  required onChange={(e)=>{setrequestId(e.target.value);}}/>
  </div>
  <div className="col-md-6" style={{width:"325px"}}></div>
  <div className="col-md-6" style={{width:"325px"}}>
    <label for="AccountHolder" className="form-label" style={{fontSize:"15px",color:"black"}}><b>Account Holder :</b></label>
    <input type="text" className="form-control" value={AccountHolder} required onChange={(e)=>{setAccountHolder(e.target.value);}}/>
  </div>
  <div className="col-md-6" style={{width:"325px"}}>
    <label for="AccountNo" className="form-label" style={{fontSize:"15px",color:"black"}}><b>Account NO :</b> </label>
    <input type="text" className="form-control" id={AccountNo} required onChange={(e)=>{setAccountNo(e.target.value);}}/>
  </div>
  <div className="col-md-6" style={{width:"325px"}}>
    <label for="Bank" className="form-label" style={{fontSize:"15px",color:"black"}}><b>Bank</b></label>
    <select   id="inputState" value={Bank} className="form-select" required onChange={(e)=>{setBank(e.target.value);}}>
      <option selected>Choose...</option>
      <option>HNB</option>
      <option>BOC</option>
      <option>Sampth</option>
    </select>
  </div>
  <div className="col-md-6"  style={{width:"325px"}}>
    <label for="Branch" className="form-label" style={{fontSize:"15px",color:"black"}}><b>Branch : </b></label>
    <input type="text" className="form-control" value={Branch} required onChange={(e)=>{setBranch(e.target.value);}}/>
  </div>
  <div className="col-md-6"  style={{width:"325px"}}>
    <label for="Amount" className="form-label" style={{fontSize:"15px",color:"black"}}><b>Amount Deposited :</b> </label>
    <input type="text" className="form-control" value={Amount} required onChange={(e)=>{setAmount(e.target.value);}}/>
  </div>
  <div className="col-md-6"  style={{width:"325px"}}>
    <label for="DepositedDate" className="form-label" style={{fontSize:"15px",color:"black"}}><b>Deposited Date: </b> </label>
    <input type="date" className="form-control" value={DepositedDate} required onChange={(e)=>{setDepositedDate(e.target.value);}}/>
  </div>
  <br></br>
 
 <div className="divbox" >
                   
                    
                    
 {selectedImage && (
                      <img
                        src={selectedImage}
                        alt="Selected Image"
                        style={{
                          width: "250px",
                          height:"150px",
                          
                          marginTop: "10px",
                          marginRight: "80px",
                         
                          display: "block",
                        }}
                      />
                      )}
                    {isUploadIconVisible && (
                      <label htmlFor="slip" style={{ textAlign: "center" }}>
                        <IoMdCloudUpload
                          style={{ width: "40px", maxHeight: "40px" }}
                        />
                        <br />
                        Upload Slip
                      </label>
                    )}
                  </div>{" "} <div><b>{selectedImageName}</b></div>  <input style={{width:"110px", marginLeft:"10px" }}
                          id="slip"
                          className="form-control"
                          type="file"
                          filename="image/*"
                          onChange={(e) => {
                            onChangeFile(e);
                          }}
                        />
    <div class="col-12">
    <br></br><br></br>
    <Button type="submit" color="success"  >Submit</Button>
    </div>
  </form>

   </div>

   <div className="bank-details" >
  
 <div style={{ display: "flex" }}>
  <div><img style={{width:"250px", height:"150px"}} alt="BOC" src={require("./assetsUI/img/boc.png")}></img></div>
<div style={{marginLeft:"20px",fontSize:"18px"}}>Bank of Ceylon <br></br>Account No: 1630552</div>
 </div>
 <br></br>
 <div style={{ display: "flex" }}>
  <div><img style={{width:"250px", height:"170px"}} alt="Sampath" src={require("./assetsUI/img/sampath.jpg")}></img></div>
  <br></br> <br></br>
<div style={{marginLeft:"20px",fontSize:"18px"}}>Sampath Bank <br></br>Account No: 00 399 0000033</div>
 </div>
 <div style={{ display: "flex" }}>
  <div><img style={{width:"250px", height:"140px"}} alt="HNB" src={require("./assetsUI/img/hnblogo.png")}></img></div>
<div style={{marginLeft:"20px",fontSize:"18px"}}>Hatton National Bank <br></br>Account No: 156010007350</div>
 </div>

   </div>
   </div>

<br></br><br></br><br></br>
<br></br><br></br><br></br>


    </div>
</div>
</div>
</section>


</div>
    )
} export default PaymentUI;