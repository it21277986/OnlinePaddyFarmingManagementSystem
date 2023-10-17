import React, { useEffect, useState } from "react";
import "./assetsOfficer/css/dashboard.css";
import { Link, useLocation } from 'react-router-dom';
import axios from "axios";
import jsPDF from 'jspdf';
import 'jspdf-autotable';
import headerImageURL from './assetsOfficer/img/logo.jpeg';
import {
    Card,
    CardHeader,
    Table,
    Container,
    Row,
    Button,
    Modal,
    Input,
    Label,
  
    
  } from "reactstrap";

  
  // core components

 
  const ProductRequest = () => {
     
    const [viewModal, setViewModal] = useState(false);
    const [editModal, setEditModal] = useState(false);
    const [requestForms, setRequestForms] = useState([]);
    const [requestIdToDelete, setRequestIdToDelete] = useState(null);
    const [requestIdToEdit, setRequestIdToEdit] = useState(null);
    const [searchQuery, setSearchQuery] = useState("");
    const [filteredRequestForms, setFilteredRequestForms] = useState([]);

    const generatePDF = () => {
      // Check if there is data to generate PDF from
      if (filteredRequestForms.length === 0) {
        alert("No data available to generate PDF.");
        return;
      }
  
      // Create a new jsPDF document
      const pdfDoc = new jsPDF();
  
      // Define the content to be included in the PDF
      const content = [];
      const imgWidth = 30;
      const imgHeight = 30;
      pdfDoc.addImage(headerImageURL, 'PNG', 10, 15, imgWidth, imgHeight);
  
  
      // Add a title to the PDF
      pdfDoc.setFontSize(18);
      pdfDoc.text('Pesticide Requests', 15, 60);

      
      // Create a data array with table data
      const tableData = [];
      tableData.push(['Request ID', 'NIC', 'Farmer Name', 'Product Name', 'Request Date', 'Status']);
  
      filteredRequestForms.forEach((requestForm) => {
        tableData.push([
          requestForm.requestId,
          requestForm.nic,
          requestForm.landOwnerName,
          requestForm.productName,
          requestForm.requestedDate,
          requestForm.status,
        ]);
      });
  
      pdfDoc.setFontSize(12);
      pdfDoc.setTextColor(0, 0, 0);
      
      // Move the text elements closer to the top
      const name = 'Vishara D D S'; // Replace with the actual name
      const department = 'Agricultural Department';
      const no = 'IT21822544';
      
      pdfDoc.text(`${name}`, 15, 150);  // Adjust the Y-coordinate to move the name up
      pdfDoc.text(`${no}`, 15, 160);    // Adjust the Y-coordinate to move the number up
      pdfDoc.text(`${department}`, 15, 170);  // Adjust the Y-coordinate to move the department up
      
      const printedDate = new Date().toLocaleDateString();
      pdfDoc.setFontSize(12);
      pdfDoc.setTextColor(0, 0, 0);
      pdfDoc.text(`Printed on: ${printedDate}`, 15, 180); 

  
      // Auto-generate the table from the data
      pdfDoc.autoTable({
        head: [tableData[0]],
        body: tableData.slice(1),
        startY: 70, // Adjust the Y position for the table
      });
  
      // Save the PDF with a name
      pdfDoc.save('pesticide_requests.pdf');
    };

  
  



   
    

//delete 
useEffect(() => {
  // Display
  axios
    .get("http://localhost:8070/requestPesticide/")
    .then((response) => {
      setRequestForms(response.data);
    })
    .catch((error) => {
      console.error("Error fetching data:", error);
    });
}, []);

const handleSearchInputChange = (e) => {
  setSearchQuery(e.target.value);
};

// Function to filter data based on the search query
useEffect(() => {
  const filteredData = requestForms.filter(
    (requestForm) =>
      requestForm.requestId.toLowerCase().includes(searchQuery.toLowerCase()) ||
      requestForm.nic.toLowerCase().includes(searchQuery.toLowerCase())
  );
  setFilteredRequestForms(filteredData);
}, [searchQuery, requestForms]);



const deleteProduct = () => {
  if (requestIdToDelete) {
   
    axios
      .delete(`http://localhost:8070/requestPesticide/delete/${requestIdToDelete}`)
      .then((response) => {
        console.log(response.data);
        // Close the delete modal after successful deletion
        setViewModal(false);
        // Fetch updated data from the backend
        axios
          .get("http://localhost:8070/requestPesticide/")
          .then((response) => {
            setRequestForms(response.data);
          })
          .catch((error) => {
            console.error("Error fetching data:", error);
          });
      })
      .catch((error) => {
        console.error("Error deleting data:", error);
      });
  }
};


//update 
const [editedStatus, setEditedStatus] = useState("");
const updateStatus = (requestId, newStatus) => {

  const fetchRequestData = () => {
    axios
      .get("http://localhost:8070/requestPesticide/")
      .then((response) => {
        setRequestForms(response.data);
      })
      .catch((error) => {
        console.error("Error fetching data:", error);
      });
  

  };

  axios
    .put(`http://localhost:8070/requestPesticide/update/${requestId}`, {
      status: newStatus,
    })
    .then((response) => {
      console.log("Request status updated successfully");
      // Close the edit modal after successful update
      setEditModal(false);
      // Fetch updated data from the backend (optional)
      fetchRequestData(); // You can create a separate function for fetching data.
      window.location.reload();
    })
    .catch((error) => {
      console.error("Error updating request status:", error);
    });
};

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
    <input
      type="search"
      placeholder="Search by Request ID / NIC"
      value={searchQuery}
      onChange={handleSearchInputChange}
    />
<button type="submit" class="search-btn"><i class='bx bx-search' ></i></button>    </div>
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
<main>
  <div class="head-title">
    <div class="left">
      <h1>Pesticide Enquiries</h1>
      <ul class="breadcrumb">
        <li>
          <a href="#">Bank Payment</a>
        </li>
        <li><i class='bx bx-chevron-right' ></i></li>
        <li>
          <a class="active" href="#">Home</a>
        </li>
        <a class="active" href="#"></a>
        <Button color='default'  style={{marginRight:"800px"}} onClick={generatePDF}>Generate PDF</Button>
      </ul>
    </div>
  </div>
  
<br></br>
<br></br>
<br></br>
<br></br>



        {/* Page content */}
        <Container className="mt--7" fluid>
          {/* Table */}
          <Row>
            <div className="col">
              <Card className="shadow">
                <CardHeader className="border-0">
                  <h3 className="mb-0">Product Orders</h3>
                </CardHeader>
                <Table className="align-items-center table-flush" responsive>
                  <thead className="thead-light">
                    <tr>
                      <th style={{fontSize:"14px" , color:"black"}} scope="col">Request ID</th>
                      <th style={{fontSize:"14px" , color:"black"}}scope="col">NIC</th>
                      <th style={{fontSize:"14px" , color:"black"}} scope="col">Farmer Name </th>
                      <th  style={{fontSize:"14px" , color:"black"}}scope="col">Product Name</th>
                      <th style={{fontSize:"14px" , color:"black"}} scope="col">Request Date</th>
                      <th  style={{fontSize:"14px" , color:"black"}}scope="col">Status</th>
                      <th  style={{fontSize:"14px" , color:"black"}}scope="col" />
                    </tr>
                  </thead>
                  
                  <tbody>
                  {filteredRequestForms.map((requestForm) => (
                    <tr>
                      <th scope="row">
                            <span className="mb-0 text-sm">
                            {requestForm.requestId}
                            </span>
                      </th>
                      <td>{requestForm.nic}</td>
              <td style={{fontSize:"15px"}}>{requestForm.landOwnerName}</td>
              <td style={{fontSize:"15px"}}>{requestForm.productName}</td>
              <td style={{fontSize:"15px"}}>{requestForm.requestedDate}</td>
              <td style={{fontSize:"15px"}}>{requestForm.status}</td>
                      <td>
                      <Button style={{fontSize:"13px"}} color="default"   onClick={() => {
                setRequestIdToEdit(requestForm.requestId);
                setEditedStatus(requestForm.status);
                setEditModal(true);
              }}> 
            Edit </Button>
               {/*update*/}
               <Modal
           className="boxwidth modal-dialog-centered "
           isOpen={editModal}
           toggle={() => setEditModal(!editModal)}
        >
       
          <div className="modal-body">
            <br/>
           <b> Resquest ID:{" "} {" "}</b>
            {requestIdToEdit ? (
      `${requestIdToEdit.toString()}`
    ) : (
      "Request ID not available"
    )}
    <br></br> <br></br>
   
    <Label for= "status"> Status :</Label>
      <Input type="text" style={{fontSize:"15px", color:"black"}} value={editedStatus} onChange={(e) => setEditedStatus(e.target.value)}/>
          </div>
          <div className="modal-footer">
            <Button
              color="danger"
              data-dismiss="modal"
              type="button"
              onClick={() => setEditModal(!editModal)}
            >
              Cancel
            </Button>
            <Button color="success" type="button" onClick={() => {updateStatus(requestIdToEdit, editedStatus); }} >
              Save Changes
            </Button>
          </div>
        </Modal>





                      <Button style={{fontSize:"13px"}} color="danger"  onClick={() => {
                            setRequestIdToDelete(requestForm.requestId);
                            setViewModal(true);
                          }}> Delete </Button>
                       {/* Modal */}
                  <Modal
           className="boxwidth modal-dialog-centered "
           isOpen={viewModal}
           toggle={() => setViewModal(!viewModal)}
        >
       
          <div className="modal-body">
            <br/>
            {requestIdToDelete ? (
      `Are you sure you want to delete Request ID: ${requestIdToDelete.toString()}?`
    ) : (
      "Request ID not available"
    )}
          </div>
          <div className="modal-footer">
            <Button
              color="secondary"
              data-dismiss="modal"
              type="button"
              onClick={() => setViewModal(!viewModal)}
            >
              Cancel
            </Button>
            <Button color="danger" type="button" onClick={deleteProduct}>
              Delete
            </Button>
          </div>
        </Modal>
       
                      </td>
                    </tr>
                    ))}
                  </tbody>
                </Table>
              </Card>
            </div>
          </Row>
        </Container>
        </main>
        </section>
       
      </>
    );
  };
  
  export default ProductRequest;
  