import {Row,Button,Card,Col,CardImg, Input, Form} from "reactstrap";
import "./assetsOfficer/css/update.css"
import React, { useState, useEffect } from "react";
import { useParams } from 'react-router-dom';
import axios from "axios";
import { Link, useLocation } from 'react-router-dom';

function UpdateProduct() {
    const [sidebarCollapsed, setSidebarCollapsed] = useState(false);

    useEffect(() => {
      // Check if sidebar state is stored in local storage
      const storedSidebarState = localStorage.getItem("sidebarCollapsed");
      if (storedSidebarState) {
        setSidebarCollapsed(JSON.parse(storedSidebarState));
      }
  
      const allSideMenu = document.querySelectorAll('#sidebar .side-menu.top li a');
  
          allSideMenu.forEach(item => {
              const li = item.parentElement;
  
              item.addEventListener('click', function () {
                  allSideMenu.forEach(i => {
                      i.parentElement.classList.remove('active');
                  })
                  li.classList.add('active');
              })
          });
  
      // Add event listener to toggle the sidebar
      const menuBar = document.querySelector('#content nav .bx.bx-menu');
      menuBar.addEventListener('click', function () {
        const newSidebarState = !sidebarCollapsed;
        setSidebarCollapsed(newSidebarState);
  
        // Store the sidebar state in local storage
        localStorage.setItem("sidebarCollapsed", JSON.stringify(newSidebarState));
      });
  
      // Add event listener for window resize
      window.addEventListener('resize', function () {
        if (window.innerWidth > 576) {
          setSidebarCollapsed(false);
          // Store the sidebar state in local storage
          localStorage.setItem("sidebarCollapsed", JSON.stringify(false));
        }
      });
  
      const searchButton = document.querySelector('#content nav form .form-input button');
          const searchButtonIcon = document.querySelector('#content nav form .form-input button .bx');
          const searchForm = document.querySelector('#content nav form');
          const sidebar = document.getElementById('sidebar');
  
          menuBar.addEventListener('click', function () {
              sidebar.classList.toggle('hide');
          });
  
          searchButton.addEventListener('click', function (e) {
              if (window.innerWidth < 576) {
                  e.preventDefault();
                  searchForm.classList.toggle('show');
                  if (searchForm.classList.contains('show')) {
                      searchButtonIcon.classList.replace('bx-search', 'bx-x');
                  } else {
                      searchButtonIcon.classList.replace('bx-x', 'bx-search');
                  }
              }
          });
  
      if (window.innerWidth < 768) {
          sidebar.classList.add('hide');
      } else if (window.innerWidth > 576) {
          searchButtonIcon.classList.replace('bx-x', 'bx-search');
          searchForm.classList.remove('show');
      }
  
      window.addEventListener('resize', function () {
          if (this.innerWidth > 576) {
              searchButtonIcon.classList.replace('bx-x', 'bx-search');
              searchForm.classList.remove('show');
          }
      });
  
      const switchMode = document.getElementById('switch-mode');
  
      switchMode.addEventListener('change', function () {
          if (this.checked) {
              document.body.classList.add('dark');
          } else {
              document.body.classList.remove('dark');
          }
      });
    }, [sidebarCollapsed]);
    const currentLocation = useLocation();
  



//setting image

  const [product, setProduct] = useState({});
  const [selectedImage, setSelectedImage] = useState(null);
  const { pesticideId } = useParams();
  useEffect(() => {
    axios
      .get(`http://localhost:8070/pesticides/get/${pesticideId}`)
      .then((res) => {
        // Handle the fetched product details here
        console.log('Product details:', res.data);
        // Set the product data received from the server
        setProduct(res.data);
      })
      .catch((err) => {
        console.error(err);
      });
  }, [pesticideId]);

  const handleFormSubmit = (e) => {
    e.preventDefault();
  
    const formData = new FormData();
    formData.append("image", selectedImage);
    formData.append("pesticideType", e.target.pesticideType.value);
    formData.append("description", e.target.description.value);
    formData.append("chemicalName", e.target.chemicalName.value);
    formData.append("manufacturer", e.target.manufacturer.value);
    formData.append("classification", e.target.classification.value);
    formData.append("pests", e.target.pests.value);
    formData.append("packs", e.target.packs.value);
    formData.append("price", e.target.price.value);

  
    // Append the new image if it's selected
    
    axios
      .put(`http://localhost:8070/pesticides/updateAll/${pesticideId}`, formData, {
        headers: { "Content-Type": "multipart/form-data" },
      })
      .then((res) => {
        alert("Product updated successfully:", res.data);
        // Optionally, redirect or show a success message
      })
      .catch((err) => {
        alert("Error updating product:", err);
        // Handle errors, show error message, etc.
      });
  };
    
    return (
<>
 {/* <!-- SIDEBAR --> */}
 <section id="sidebar" className={sidebarCollapsed ? 'hide' : ''}>
 <Link to="/crop-Protection">
          <a href="#" class="brand">
              <i class='bx bxs-home'></i>
              <span class="text">Pesticides</span>
          </a>
		  </Link>
     <ul className={`side-menu top`}>
     <li className={currentLocation.pathname === '/pesticideDashboard' ? 'active' : ''}>
            <Link to="/pesticideDashboard">
                  <a href="/dashboard">
                      <i class='bx bxs-dashboard' ></i>
                      <span class="text">Dashboard</span>
                  </a>
				  </Link>
              </li>
         <li className={currentLocation.pathname === '/products' ? 'active' : ''}>
       <Link to="/products">
             <a href="/pm">
                 <i class='bx bxs-cart' ></i>
                 <span class="text">Pesticide Products</span>
             </a>
             </Link>
         </li>
         <li className={currentLocation.pathname === '/stock' ? 'active' : ''}>
       <Link to="/stock">
             <a href="/pm">
                 <i class='bx bxs-data' ></i>
                 <span class="text">Pesticide Stock</span>
             </a>
             </Link>
         </li>
         
         <li className={currentLocation.pathname === '/PesticideRequests' ? 'active' : ''}>
       <Link to="/PesticideRequests">
             <a href="/tender">
                 <i class='bx bxs-doughnut-chart' ></i>
                 <span class="text">Pesticide Enquiry</span>
             </a>
             </Link>
         </li>
         <li className={currentLocation.pathname === '/pesticidePayment' ? 'active' : ''}>
       <Link to="/pesticidePayment">
             <a href="/addpmprice">
                 <i class='bx bxs-dollar-circle' ></i>
                 <span class="text">Pesticide Payment</span>
             </a>
             </Link>
         </li>
       
     </ul>
     <ul class="side-menu">
         <li>
             <a href="#">
                 <i class='bx bxs-cog' ></i>
                 <span class="text">Settings</span>
             </a>
         </li>
         <li>
             <a href="#" class="logout">
                 <i class='bx bxs-log-out-circle' ></i>
                 <span class="text">Logout</span>
             </a>
         </li>
     </ul>
 </section>
  	{/* <!-- SIDEBAR --> */}
      {/* <!-- CONTENT --> */}
<section id="content">
{/* <!-- NAVBAR --> */}
<nav>
  <i class='bx bx-menu' ></i>
  <a href="#" class="nav-link">Categories</a>
			<form action="#">
				<div class="form-input">
					<input type="search" placeholder="Search..."/>
					<button type="submit" class="search-btn"><i class='bx bx-search' ></i></button>
				</div>
			</form>
  <input type="checkbox" id="switch-mode" hidden />
  <label for="switch-mode" class="switch-mode"></label>
  <a href="#" class="notification">
    <i class='bx bxs-bell' ></i>
    <span class="num">8</span>
  </a>
  <a href="#" class="profile">
    <img src="./me.jpg"/>
  </a>
</nav>
{/* <!-- NAVBAR --> */}

{/* <!-- MAIN --> */}
<main style={{marginLeft:"50px"}}>
<Form onSubmit={handleFormSubmit} encType="multipart/form-data" >
<div    className="modal-header"> 
           <div className="modal-title">
           <h1>{product.productName}</h1>
             </div>
            </div>
            <div className="modal-body">
             <Row>
            
<Col>
<br></br> <br></br>

<Card className="cardbg">

<CardImg  style={{ height: "400px"}} src={selectedImage ? URL.createObjectURL(selectedImage) : `data:image/png;base64,${product.image}`} alt="Product">


</CardImg>
<Input type="file" name="image" accept="image/png, image/jpg, image/jpeg" onChange={(e) => setSelectedImage(e.target.files[0])}></Input>
</Card>
</Col>
<Col style={{marginLeft:"30px"}}>
<Row>
<table style={{marginLeft:"30px"}} >
<Row>
  <tr>
<th style={{ fontSize: "18px",color:"black" ,textAlign: "left", padding: "8px" }}>Pesticide Type </th>
<td style={{  fontSize: "18px",color:"black" , textAlign: "left", padding: "8px"  }}><Input type="text" name="pesticideType" defaultValue={product.pesticideType} style={{color:"black",width:"250px"}}></Input></td>
</tr>
</Row>
</table>
</Row>
<Row>
<p style={{ marginLeft:"10px",fontSize: "19px",color:"black"  }} ><Input type="textarea" name="description" defaultValue={product.description} style={{width:"420px",color:"black",height:"100px"}}></Input></p>
</Row>

<table style={{borderCollapse: "collapse"}}>
<tr>
 <th style={{ fontSize: "18px",color:"black" , border: "1px solid #dddddd", textAlign: "left", padding: "8px" }}>Chemical Name </th>
 <td style={{  fontSize: "18px",color:"black" , border: "1px solid #dddddd", textAlign: "left", padding: "8px"  }}><Input  style={{color:"black", width:"250px"}} name="chemicalName" defaultValue={product.chemicalName} type="text"></Input></td>
</tr>
<tr>
 <th style={{ fontSize: "18px",color:"black" , border: "1px solid #dddddd", textAlign: "left", padding: "8px" }}>Manufacturer </th>
 <td style={{  fontSize: "18px",color:"black" , border: "1px solid #dddddd", textAlign: "left", padding: "8px"  }}><Input style={{color:"black",width:"250px"}} name="manufacturer" defaultValue={product.manufacturer} type="text"></Input></td>
</tr>
<tr>
 <th style={{ fontSize: "18px",color:"black" , border: "1px solid #dddddd", textAlign: "left", padding: "8px" }}>Classification </th>
 <td style={{  fontSize: "18px",color:"black" , border: "1px solid #dddddd", textAlign: "left", padding: "8px"  }}><Input style={{color:"black",width:"250px"}}  name="classification" defaultValue={product.classification} type="text"></Input></td>
</tr>
<tr>
 <th style={{ fontSize: "18px",color:"black" , border: "1px solid #dddddd", textAlign: "left", padding: "8px" }}>Control/Prevent </th>
 <td style={{  fontSize: "18px",color:"black" , border: "1px solid #dddddd", textAlign: "left", padding: "8px"  }}><Input style={{color:"black",width:"250px"}} name="pests" defaultValue={product.pests} type="text"></Input></td>
</tr>
<tr>
 <th style={{ fontSize: "18px",color:"black" , border: "1px solid #dddddd", textAlign: "left", padding: "8px" }}>Packing</th>
 <td style={{  fontSize: "18px",color:"black" , border: "1px solid #dddddd", textAlign: "left", padding: "8px"  }}><Input  style={{color:"black",width:"250px"}} name="packs" defaultValue={product.packs} type="text"></Input></td>
</tr>
<tr>
 <th style={{ fontSize: "18px",color:"black" , border: "1px solid #dddddd", textAlign: "left", padding: "8px" }}>Unit Price</th>
 <td style={{  fontSize: "18px",color:"black" , border: "1px solid #dddddd", textAlign: "left", padding: "8px"  }}><Input style={{color:"black",width:"250px"}} name="price" defaultValue={product.price} type="text"></Input></td>
</tr>

<br></br>
<tr>

<td><Button color="success" style={{marginLeft:"10px"}}> Save Changes</Button></td>
</tr>
</table>
</Col>

</Row>
</div>
</Form>
</main>
</section>
</>
    )
} export default UpdateProduct;
