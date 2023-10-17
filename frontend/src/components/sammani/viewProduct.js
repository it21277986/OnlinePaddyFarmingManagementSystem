import CropProtectionHeader from "./CropProtectionHeader";
import Footer from "./Footer.js"
import "./assetsUI/css/pesticides.css"
import "./assetsUI/css/viewProduct.css"
import React, { useEffect, useState} from "react";
import { useParams } from "react-router-dom";
import axios from "axios";
import {GrClose} from "react-icons/gr"

import {
    Button,
    Card,
    CardImg,
    Row,Col,Modal,Form, FormGroup ,Label,Input
  } from "reactstrap";
  
function ViewProduct(){

//Nic Validations
const [nicValid, setNicValid] = useState(true);



//modal
const [exampleModal,setExampleModal]=useState(false);
const [notification,setNotification]=useState(false);
const [productName, setProductName] = useState("");
const [requestId, setRequestId] = useState("");
  const [price, setPrice] = useState(0);



const [currentProduct, setCurrentProduct] = useState(null);
const [currentProductImage, setCurrentProductImage] = useState("");
const { productId } = useParams();



useEffect(() => {
    // Fetch product details using the productId from the URL
    axios
      .get(`http://localhost:8070/pesticides/get/${productId}`)
      .then((res) => {
        setCurrentProduct(res.data);
        // Set the current product's image
        const base64String = btoa(
          String.fromCharCode(...new Uint8Array(res.data.image.data.data))
        );
        setCurrentProductImage(`data:image/png;base64,${base64String}`);
        setProductName(res.data.productName);
        setPrice(res.data.price);
        setRequestId(res.data.requestId);
        
      })
      .catch((err) => {
        console.error(err);
      });
  }, [productId]);



  const [relatedProducts, setRelatedProducts] = useState([]);
  useEffect(() => {
    // Fetch related products based on the current product's ID
    axios
      .get(`http://localhost:8070/pesticides/related/${productId}`)
      .then((res) => {
        setRelatedProducts(res.data);
      })
      .catch((err) => {
        console.error(err);
      });
  }, [productId]);




// State variables to track form input values and validation
const [formValues, setFormValues] = useState({
  requestId: "",
  landOwnerName: "",
  nic: "",
  phone: "",
  proposedApplicationDate: "",
  quantity: "",
  enquiry :"",
  requestedDate:""
  
});
const [isFormValid, setIsFormValid] = useState(false);
// Function to handle form input changes and validate the form
const handleFormChange = (e) => {
  const { name, value } = e.target;
  setFormValues({ ...formValues, [name]: value });

  // NIC validation regex pattern
  const nicPattern = /^(?:\d{9}|\d{12}|\d{9}v)$/;

  // Check if the NIC number is valid
  const isNicValid = nicPattern.test(value);

  // Update the state with the NIC validation result
  setNicValid(isNicValid);
};

useEffect(() => {
  // Check if all required fields are filled
  const { landOwnerName, nic, phone, proposedApplicationDate,quantity } = formValues;
  const isValid =
    landOwnerName.trim() !== "" &&
    nic.trim() !== "" &&
    phone.trim() !== "" &&
    proposedApplicationDate.trim() !== "" &&
    quantity.trim() !=="";


  setIsFormValid(isValid);
}, [formValues]);

//notification popup
const handleFormSubmit = (e) => {
  e.preventDefault();
  if (isFormValid && nicValid) {
    axios
    .get(`http://localhost:8070/pesticides/get/${productId}`)
    .then((res) => {
      const availableQuantity = res.data.quantity;
      
      if (availableQuantity < formValues.quantity) {
        alert("Not enough stock available for the requested quantity.");
      } else {
        // Calculate the total price
        const calculatedTotalPrice = parseFloat(formValues.quantity) * price;
        setTotalPrice(calculatedTotalPrice);

        // Calculate the new available quantity
        const newAvailableQuantity = availableQuantity - parseFloat(formValues.quantity);

        // Update the pesticide stock with the new quantity
        axios
          .put(`http://localhost:8070/pesticides/update/${productId}`, {
            quantity: newAvailableQuantity,
            availability: newAvailableQuantity > 0 ? "Available" : "Out of Stock",
          })
          .then(() => {
            // Open the notification modal here
            setNotification(true);
          })
          .catch((error) => {
            console.error("Error updating pesticide stock:", error);
            alert("Error updating pesticide stock.");
          });
      }
    })
    .catch((error) => {
      console.error("Error fetching available quantity:", error);
      alert("Error fetching available quantity.");
    });
}
};
//Price calculation part and the request submit part
const [totalPrice, setTotalPrice] = useState(0); // Initialize with 0

//create funtion 
const handleNotificationClose = () => {
  setNotification(false);
  console.log("Current requestId:", requestId);

  // Send the request form data to the backend
  const requestData = {
    requestId: "",
    nic: formValues.nic,
    landOwnerName: formValues.landOwnerName,
    phone: formValues.phone,
    productName: productName, // Use the productName from state
    proposedApplicationDate: formValues.proposedApplicationDate,
    quantity: parseFloat(formValues.quantity),
    totalPrice: parseFloat(totalPrice), // Use the totalPrice from state
    enquiry: formValues.enquiry,
    requestedDate: new Date(), 
  };

  axios
  .post("http://localhost:8070/requestPesticide/add", requestData)
  .then((res) => {
    alert("Request sent successfully");
    // Optionally, you can reset the form values here if needed
    setFormValues({
      landOwnerName: "",
      nic: "",
      phone: "",
      proposedApplicationDate: "",
      quantity: "",
      enquiry: "",
    });
     // Reload the page after successful request
     window.location.reload();
  })
  .catch((err) => {
    alert("Error sending request", err);
  });
};




    return(
        <>
        <CropProtectionHeader/>
        <div className="page-header min-vh-75 relative" >
        <div className="container position-sticky z-index-sticky top-0">
            <div className="modal-body position">
             <Row>

<Col>
<br/>
<br/>

<Card className="cardbackground">
<CardImg  style={{ height: "500px", maxWidth:"500px"}} src={currentProductImage}>

</CardImg>
</Card>
</Col>
<Col style={{marginLeft:"50px"}}>

{currentProduct ? ( // Add conditional rendering
                <>

<Row>
<h3 style={{ marginLeft:"10px",fontSize: "22px",color:"black"  }} > {currentProduct.productName}</h3>
</Row>
<Row>
<h3 style={{ marginLeft:"10px",fontSize: "22px",color:"black"  }} > {currentProduct.pesticideType}</h3>
</Row>
<Row>
<p style={{ marginLeft:"10px",fontSize: "19px",color:"black"  }} > {currentProduct.description}</p>
</Row>

<table style={{borderCollapse: "collapse"}}>
<tr>
 <th style={{ fontSize: "18px",color:"black" , border: "1px solid #dddddd", textAlign: "left", padding: "8px" }}>Chemical Name </th>
 <td style={{  fontSize: "18px",color:"black" , border: "1px solid #dddddd", textAlign: "left", padding: "8px"  }}> {currentProduct.chemicalName}</td>
</tr>
<tr>
 <th style={{ fontSize: "18px",color:"black" , border: "1px solid #dddddd", textAlign: "left", padding: "8px" }}>Manufacturer </th>
 <td style={{  fontSize: "18px",color:"black" , border: "1px solid #dddddd", textAlign: "left", padding: "8px"  }}> {currentProduct.manufacturer}</td>
</tr>
<tr>
 <th style={{ fontSize: "18px",color:"black" , border: "1px solid #dddddd", textAlign: "left", padding: "8px" }}>Classification </th>
 <td style={{  fontSize: "18px",color:"black" , border: "1px solid #dddddd", textAlign: "left", padding: "8px"  }}> {currentProduct.classification}</td>
</tr>
<tr>
 <th style={{ fontSize: "18px",color:"black" , border: "1px solid #dddddd", textAlign: "left", padding: "8px" }}>Control/Prevent </th>
 <td style={{  fontSize: "18px",color:"black" , border: "1px solid #dddddd", textAlign: "left", padding: "8px"  }}> {currentProduct.pests}</td>
</tr>
<tr>
 <th style={{ fontSize: "18px",color:"black" , border: "1px solid #dddddd", textAlign: "left", padding: "8px" }}>Packing</th>
 <td style={{  fontSize: "18px",color:"black" , border: "1px solid #dddddd", textAlign: "left", padding: "8px"  }}> {currentProduct.packs}</td>
</tr>
<tr>
 <th style={{ fontSize: "18px",color:"black" , border: "1px solid #dddddd", textAlign: "left", padding: "8px" }}>Unit Price</th>
 <td style={{  fontSize: "18px",color:"black" , border: "1px solid #dddddd", textAlign: "left", padding: "8px"  }}> {currentProduct.price}</td>
</tr>
<br></br>
<p style={{fontSize:"16px"}}> {currentProduct.availability}</p>

</table>
<div style={{display:"inline-block"}}>

<p style={{fontSize:"16px"}}><b>Quantity {currentProduct.quantity}</b>{" "} </p>
</div>
<br/>
<Button
          color="success"
          style={{ fontSize: "15px" }}
          onClick={() => {
            setExampleModal(true);
            setProductName(currentProduct ? currentProduct.productName : "");
            setPrice(currentProduct ? currentProduct.price : 0);
          }}
        >
Send Enquiry
</Button>
{/*model*/}
<Modal
          className=" modal-dialog-centered "
          isOpen={exampleModal}
        toggle={() => setExampleModal(!exampleModal)}
        >
          <div className="modal-header">
            <h5 className="modal-title" id="exampleModalLabel">
            Product : {productName}
            </h5>
            <GrClose
              data-dismiss="modal"
              type="button"
              onClick={() => setExampleModal(!exampleModal)}
            >
              <span aria-hidden={true}>×</span>
            </GrClose>
          </div>
          <div className="modal-body">
            <Form  encType="multipart/form-data">
             
              <FormGroup className="boxmargin" >
              <Label for="landOwnerName"style={{fontSize:"18px"}}><b>Land Owner Name:</b></Label>
                <Input  style={{border:" 1px solid green", padding:"10px 10px",fontSize:"16px"}}
               name="landOwnerName"
               value={formValues.landOwnerName}
               onChange={handleFormChange}
                  type="text"
               required />
              </FormGroup>
                   
                  <FormGroup className="boxmargin">
                 <Label for="nic"style={{fontSize:"18px"}}><b>NIC No :</b></Label>
                 <Input
    style={{
      border: nicValid ? "1px solid green" : "1px solid red",
      padding: "10px 10px",
      fontSize: "16px",
    }}
    name="nic"
    value={formValues.nic}
    onChange={handleFormChange}
    placeholder=""
    type="text"
    required
  />
  {!nicValid && (
    <p style={{ color: "red", fontSize: "14px" }}>
      NIC should have 12 digits or 9 digits followed by 'v'.
    </p>
  )}
                </FormGroup>
                  <FormGroup className="boxmargin">
                 <Label for="phone"style={{fontSize:"18px"}}><b>Contact No :</b></Label>
                 <Input  style={{border:" 1px solid green", padding:"10px 10px",fontSize:"16px"}}
                name="phone"
                value={formValues.phone}
                onChange={handleFormChange}
                  placeholder="07########"
                  type="text"
                  required /> </FormGroup>
                 <FormGroup className="boxmargin">
                <Label for="proposedApplicationDate"style={{fontSize:"18px"}}><b>Proposed Application Date :</b></Label>
                 <Input  style={{border:" 1px solid green", padding:"10px 10px",fontSize:"16px"}}
                name="proposedApplicationDate"
                value={formValues.proposedApplicationDate}
                onChange={handleFormChange}
                  placeholder=""
                  type="date"
                  required />
                </FormGroup>
                 <FormGroup className="boxmargin">
                 <Label for="quantity" style={{fontSize:"18px"}}><b>Quantity Required :</b></Label>
                 <Input  style={{border:" 1px solid green", padding:"10px 10px",fontSize:"16px"}}
                name="quantity"
                value={formValues.quantity}
                onChange={handleFormChange}
                  placeholder=""
                  type="text"
                 required/></FormGroup>
                 <FormGroup className="boxmargin">
                <Label for="enquiry" style={{fontSize:"18px"}}><b>Enquiry :</b></Label>
                 <Input  style={{border:" 1px solid green", padding:"10px 10px",fontSize:"16px"}}
                  placeholder=""
                  type="textarea"
                 /></FormGroup>
                
          <div className="modal-footer">
            <Button 
              color="danger"
              data-dismiss="modal"
              type="button"
              onClick={() => setExampleModal(!exampleModal)}
            >
             Cancel
            </Button>
            <Button
                color="success"
                type="submit"
                onClick={handleFormSubmit}
                disabled={!isFormValid}
              >
            Send Request
            </Button>
{/*Notification Model*/}
<Modal style={{maxWidth:"800px"}}

              className="modal-dialog-centered "
              contentClassName="bg-gradient-danger"
              isOpen={notification}
        toggle={() => setNotification(!notification)}
            >
              <div className="modal-header notificationproduct" >
                <h6 className="modal-title" id="modal-title-notification">
                 
                </h6>
                <GrClose
              data-dismiss="modal"
              type="button"
              onClick={() => setNotification(!notification)}
            >
              <span aria-hidden={true}>×</span>
            </GrClose>
              </div>
              <div className="modal-body notification">
                <div className="py-3 text-center" style={{display:"inline-block", width: "fit-content"}}>
                
                    <div> <img alt="..." style={{width:"220px", height:"80px", marginRight:"280px"}}
                      src={require("./assetsUI/img/logo.jpeg")}
                    /> </div>
                    <br></br>
                
                 <table style={{marginLeft:"70px", border:"1px solid black",  borderCollapse: "collapse"}} >
                  <tr> 
                  <th style={{padding:"15px",border:"1px solid black",  borderCollapse: "collapse",fontSize:"18px",color:"black"}}> Product Name</th>
                  <th style={{padding:"15px",border:"1px solid black",  borderCollapse: "collapse",fontSize:"18px",color:"black"}}> Quantity</th>
                  <th style={{padding:"15px",border:"1px solid black",  borderCollapse: "collapse",fontSize:"18px",color:"black"}}> Unit Price</th>
                  <th style={{padding:"15px",border:"1px solid black",  borderCollapse: "collapse",fontSize:"18px",color:"black"}}> Total Amount</th>
                  </tr>
                  <tr>
                  <td style={{padding:"15px",border:"1px solid black",  borderCollapse: "collapse",fontSize:"18px",color:"black"}}>{productName}</td> 
                  <td style={{padding:"15px",border:"1px solid black",  borderCollapse: "collapse",fontSize:"18px",color:"black"}}>{formValues.quantity}</td>
                  <td style={{padding:"15px",border:"1px solid black",  borderCollapse: "collapse",fontSize:"18px",color:"black"}}>Rs.{price}.00 </td>
                  <td style={{padding:"15px",border:"1px solid black",  borderCollapse: "collapse",fontSize:"18px",color:"black"}}> Rs.{totalPrice}.00 </td>
              
                   </tr>
                  
                 </table>
                 </div>
                 <br></br>
                 <br></br>
                 <p style={{marginLeft:"70px"}}>The deposit Slip is required when collecting the product from the Agragrian Center.</p>
              </div>
              <div className="modal-footer" style={{backgroundColor:"white"}}> 
                <Button
                  className="text-white ml-auto"
                  color="danger"
                  data-dismiss="modal"
                  type="button"
                  onClick={() => setNotification(!notification)}
                >
                  Close
                </Button>
                <Button  color="success" type="button"  onClick={handleNotificationClose}>
                 Submit
                </Button>
              </div>
            </Modal>



          </div>
          </Form>
          </div>
        </Modal>


</>
              ) : (
                <p>Loading...</p> // Add a loading message while fetching data
              )}
</Col>

</Row>
</div>
{/* Other related Proucts*/}
<br></br> <br></br><br></br><br></br>
<div>
  <h2>Other Related Products</h2>
  < div id="pricing-tables" className="home-section nav row">
        <div className="container">
        {relatedProducts.map((singleData, index) => {
            const base64String = btoa(
              String.fromCharCode(...new Uint8Array(singleData.image.data.data))
            );
            return(
              <div className="col-md-3 col-sm-6 col-xs-12 color-1" style={{ display: "inline-block" , width: "fit-content"}} key={index}>
                <div className="single-table text-center">
                    <div className="">
                    <img src={`data:image/png;base64,${base64String}`} style={{height:"210px", maxWidth:"350px"}}    alt="pesticide" />
                       
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

<br></br><br></br><br></br><br></br>

</div>
</div>
<div>
<Footer/>
</div>
        </>
    )
} export default ViewProduct;
