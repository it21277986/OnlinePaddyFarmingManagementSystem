import React, { useState, useEffect , useRef } from 'react';
import axios from 'axios';
import "./assetsOfficer/css/header.css"
import {useReactToPrint} from 'react-to-print';
import { Link, useLocation } from 'react-router-dom';
import jsPDF from 'jspdf';
import 'jspdf-autotable';
import autoTable from 'jspdf-autotable';
import headerImageURL from './assetsOfficer/img/logo.jpeg';
import {
    Card,
    CardHeader,
   Button,
    Table,
    Container,
    Row,
    Modal,
    Label,
    Input
  } from "reactstrap";
  // core components
 
  const PesticidePayment = () => {

  
    const [sidebarCollapsed, setSidebarCollapsed] = useState(false);

// Function to generate the PDF for the view modal
const generateViewModalPDF = () => {
  // Create a new jsPDF document
  const pdfDoc = new jsPDF();
  

  // Set font size and color for the report title
  pdfDoc.setFontSize(18);
  pdfDoc.setTextColor(0, 0, 0);
  pdfDoc.text('Pesticide Payment View', 15, 60);
  const content = [];
      const imgWidth = 30;
      const imgHeight = 30;
      pdfDoc.addImage(headerImageURL, 'PNG', 10, 15, imgWidth, imgHeight);

  // Define the table headers
  const headers = ['Slip ID', 'Request ID', 'Account Holder', 'Product Name', 'Quantity', 'Unit Price', 'Total Amount'];

  // Prepare the data for the table
  const data = [
    [
      selectedViewSlip?.transactionId,
      selectedViewSlip?.requestId,
      selectedViewSlip?.AccountHolder,
      requestFormDetails.productName,
      requestFormDetails.quantity,
      `Rs.${(requestFormDetails.totalPrice / requestFormDetails.quantity).toFixed(2)}.00`,
      `Rs.${requestFormDetails.totalPrice}.00`,
    ],
  ];

  // Define the configuration for the autoTable
  const autoTableConfig = {
    startY: 70,
    head: [headers],
    body: data,
  };

  // Generate the table in the PDF using autoTable
  pdfDoc.autoTable(autoTableConfig);

  // Add the image to the PDF
  if (currentSlipImage) {
    pdfDoc.addImage(currentSlipImage, 'PNG', 15, 100, 180, 100); // Adjust the position and dimensions as needed
  }

  pdfDoc.setFontSize(12);
      pdfDoc.setTextColor(0, 0, 0);
      
      // Move the text elements closer to the top
      const name = 'Vishara D D S'; // Replace with the actual name
      const department = 'Agricultural Department';
      const no = 'IT21822544';
      
      pdfDoc.text(`${name}`, 15, 210);  // Adjust the Y-coordinate to move the name up
      pdfDoc.text(`${no}`, 15, 220);    // Adjust the Y-coordinate to move the number up
      pdfDoc.text(`${department}`, 15, 230);  // Adjust the Y-coordinate to move the department up
      
      const printedDate = new Date().toLocaleDateString();
      pdfDoc.setFontSize(12);
      pdfDoc.setTextColor(0, 0, 0);
      pdfDoc.text(`Printed on: ${printedDate}`, 15, 240); 


  // Save the PDF with a file name
  pdfDoc.save('PesticidePaymentView.pdf');
};





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






    useEffect(() => {
      // Fetch bank slip data from your backend
      axios.get('http://localhost:8070/bankPayment/')
        .then((response) => {
          setBankSlips(response.data);
        })
        .catch((error) => {
          console.error('Error fetching data:', error);
        });
    }, []);
  
    const generatePDF = () => {
      // Create a new jsPDF document
      const pdfDoc = new jsPDF();
  
      // Set font size and color for the report title

      const content = [];
      const imgWidth = 30;
      const imgHeight = 30;
      pdfDoc.addImage(headerImageURL, 'PNG', 10, 15, imgWidth, imgHeight);

      pdfDoc.setFontSize(18);
      pdfDoc.setTextColor(0, 0, 0);
      pdfDoc.text('Pesticide Payment List', 15,60);
  
      // Define the table headers
      const headers = ['Slip ID', 'Request ID', 'Account Holder', 'Amount', 'Date', 'Status'];
  
      // Prepare the data for the table
      const data = bankSlips.map((bankSlip) => [
        bankSlip.transactionId,
        bankSlip.requestId,
        bankSlip.AccountHolder,
        `Rs.${bankSlip.Amount}.00`,
        bankSlip.DepositedDate,
        bankSlip.Status,
      ]);
  
      // Define the configuration for the autoTable
      const autoTableConfig = {
        startY: 70,
        head: [headers],
        body: data,
      };
  
      // Generate the table in the PDF using autoTable
      pdfDoc.autoTable(autoTableConfig);

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

  
      // Save the PDF with a file name
      pdfDoc.save('PesticidePaymentList.pdf');
    };


    const [requestFormDetails, setRequestFormDetails] = useState(null);
    const [updateModal, setUpdateModal] = useState(false);
    const [updateStatus, setUpdateStatus] = useState('');
    const [viewModal, setViewModal] = useState(false);
    const [selectedViewSlip, setSelectedViewSlip] = useState(null);
    const [deleteModal, setDeleteModal] = useState(false);
    const [selectedSlipId, setSelectedSlipId] = useState(null);
    const [currentSlip, setCurrentSlip] = useState(null);
    const [currentSlipImage, setCurrentSlipImage] = useState(null);
    const [searchInput, setSearchInput] = useState(''); 

    const fetchSlipDetails = (transactionId) => {
      axios
        .get(`http://localhost:8070/bankPayment/get/${transactionId}`) // Adjust the URL to match your API endpoint
        .then((res) => {
          setCurrentSlip(res.data); // Assuming you have a state variable to store the slip data
          // Set the current slip's image
          const base64String = btoa(
            String.fromCharCode(...new Uint8Array(res.data.slip.data.data))
          );
          setCurrentSlipImage(`data:image/png;base64,${base64String}`); // Assuming you have a state variable to store the slip image
        })
        .catch((err) => {
          console.error(err);
        });
    };
    const fetchRequestFormDetails = (requestId) => {
      axios
        .get(`http://localhost:8070/requestPesticide/get/${requestId}`)
        .then((response) => {
          setRequestFormDetails(response.data); // Set the retrieved request form details to state
        })
        .catch((error) => {
          console.error('Error fetching request form details:', error);
        });
    };
    const resetRequestFormDetails = () => {
      setRequestFormDetails(null);
    };
    useEffect(() => {
      if (selectedViewSlip) {
        // Fetch request form details when selectedViewSlip is available
        fetchRequestFormDetails(selectedViewSlip.requestId);
      }
    }, [selectedViewSlip]);
  


    //Display
    const [bankSlips, setBankSlips] = useState([]);
    useEffect(() => {
      // Make a GET request to fetch data from your backend
      axios.get('http://localhost:8070/bankPayment/')
        .then((response) => {
          setBankSlips(response.data); // Set the retrieved data to your state
        })
        .catch((error) => {
          console.error('Error fetching data:', error);
        });
    }, []);
  
    const handleDelete = () => {
      axios.delete(`http://localhost:8070/bankPayment/delete/${selectedSlipId}`)
        .then((response) => {
          console.log(`Slip ID ${selectedSlipId} deleted`);
          setDeleteModal(false);
         window.location.reload()
        })
        .catch((error) => {
          console.error('Error deleting Slip:', error);
        });
    };

//update
const handleUpdate = () => {
  console.log("Selected Slip ID:", selectedSlipId);
  console.log("Updated Status:", updateStatus);

  // Send a PUT request to update the status
  axios
    .put(`http://localhost:8070/bankPayment/update/${selectedSlipId}`, {
      Status: updateStatus,
    })
    .then((response) => {
      alert(`${selectedSlipId} updated with Status: ${updateStatus}`);
      setUpdateModal(false);
     window.location.reload();
    })
    .catch((error) => {
     alert(`Error updating ${selectedSlipId} Status`, error);
    });
};
const filteredBankSlips = bankSlips.filter((bankSlip) => {
  const searchInputLower = searchInput.toLowerCase();
  const requestIdMatch = bankSlip.requestId.toLowerCase().includes(searchInputLower);
  const accHolderMatch = bankSlip.AccountHolder.toLowerCase().includes(searchInputLower);
  return requestIdMatch || accHolderMatch; // Use OR operator to match either request ID or account holder
});

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
  <form action="#">
    <div class="form-input">
    <input
     type="text"
     placeholder="Search by Request ID / Account Holder"
     value={searchInput}
    onChange={(e) => setSearchInput(e.target.value)} />
  
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
<main>
  <div class="head-title">
    <div class="left">
      <h1>Pesticide Payment</h1>
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
          <Row >
            <div className="col">
              <Card className="shadow">
                <CardHeader className="border-0">
                  <h3 className="mb-0">Bank / Slip Details</h3>
                </CardHeader>
                <Table className="align-items-center table-flush" responsive>
                  <thead className="thead-light">
                    <tr>
                      <th style={{fontSize:"14px" , color:"black"}} scope="col">Slip ID</th>
                      <th style={{fontSize:"14px" , color:"black"}} scope="col">Request ID </th>
                      <th style={{fontSize:"14px" , color:"black"}} scope="col">Acc Holder </th>
                      <th style={{fontSize:"14px" , color:"black"}} scope="col">Amount</th>
                      <th style={{fontSize:"14px" , color:"black"}} scope="col">Date</th>
                      <th style={{fontSize:"14px" , color:"black"}}scope="col">Status</th>
                     <th></th>
                    </tr>
                  </thead>
                  <tbody>
                  {filteredBankSlips.map((bankSlip) => (
                    <tr key={bankSlip.transactionId}>
                      <th scope="row">
                            <span className="mb-0 text-sm">
                              {bankSlip.transactionId}
                            </span>
                      </th>
                      <td style={{fontSize:"15px"}}>{bankSlip.requestId}</td>
                      <td style={{fontSize:"15px"}}>{bankSlip.AccountHolder}</td>
                      <td style={{fontSize:"15px"}}>Rs.{bankSlip.Amount}.00</td>
                      <td style={{fontSize:"15px"}}>{bankSlip.DepositedDate}</td>
                      <td style={{fontSize:"15px"}}>{bankSlip.Status}</td>
                     <td>< Button style={{fontSize:"13px"}} color="default" onClick={() => {
                       setViewModal(true); setSelectedViewSlip(bankSlip);fetchSlipDetails(bankSlip.transactionId); fetchRequestFormDetails(bankSlip.requestId);
                      }} >View</Button> 
               {/*view*/}
               <Modal
        style={{ maxWidth: "1000px", marginLeft:"250px"}}
        className="modal-dialog-centered"
        contentClassName="bg-gradient"
        color="success"
        isOpen={viewModal}
        toggle={() =>{setViewModal(!viewModal);resetRequestFormDetails();}}
        
        >
 
<div className="modal-header notification" >
  <h3>Slip ID : {selectedViewSlip?.transactionId}</h3>
  <h6 className="modal-title" id="modal-title-notification">
   
  </h6>
  <button
              aria-label="Close"
              className="close"
              type="button"
              onClick={() => setViewModal(!viewModal)}
              >
              <span aria-hidden={true}>×</span>
            </button>
</div>
<div className="modal-body">
  <div className="py-3 text-center" style={{display:"inline-block", width: "fit-content"}}>

    <Button color='default'  style={{marginRight:"800px"}}  onClick={generateViewModalPDF}>Generate PDF</Button>
  
    <br></br>
   <table style={{marginLeft:"10px", border:"1px solid black",  borderCollapse: "collapse"}} >
    <tr> 
    <th style={{padding:"15px",border:"1px solid black",  borderCollapse: "collapse",fontSize:"18px",color:"black"}}> Deposited Date</th>
    <th style={{padding:"15px",border:"1px solid black",  borderCollapse: "collapse",fontSize:"18px",color:"black"}}> Request ID</th>
    <th style={{padding:"15px",border:"1px solid black",  borderCollapse: "collapse",fontSize:"18px",color:"black"}}>AccountHolder</th>
    <th style={{padding:"15px",border:"1px solid black",  borderCollapse: "collapse",fontSize:"18px",color:"black"}}> Product Name</th>
    <th style={{padding:"15px",border:"1px solid black",  borderCollapse: "collapse",fontSize:"18px",color:"black"}}> Quantity</th>
    <th style={{padding:"15px",border:"1px solid black",  borderCollapse: "collapse",fontSize:"18px",color:"black"}}> Unit Price</th>
    <th style={{padding:"15px",border:"1px solid black",  borderCollapse: "collapse",fontSize:"18px",color:"black"}}> Total Amount</th>
    </tr>
    <tr>
    {requestFormDetails && (
      <>
  <td style={{padding:"15px",border:"1px solid black",  borderCollapse: "collapse",fontSize:"18px",color:"red"}}>{selectedViewSlip?.DepositedDate}</td> 
   <td style={{padding:"15px",border:"1px solid black",  borderCollapse: "collapse",fontSize:"18px",color:"red"}}>{selectedViewSlip?.requestId}</td> 
   <td style={{padding:"15px",border:"1px solid black",  borderCollapse: "collapse",fontSize:"18px",color:"red"}}>{selectedViewSlip?.AccountHolder}</td> 
    <td style={{padding:"15px",border:"1px solid black",  borderCollapse: "collapse",fontSize:"18px",color:"red"}}>{requestFormDetails.productName}</td> 
    <td style={{padding:"15px",border:"1px solid black",  borderCollapse: "collapse",fontSize:"18px",color:"red"}}> Rs.{(requestFormDetails.totalPrice / requestFormDetails.quantity).toFixed(2)}.00
    </td>
    <td style={{padding:"15px",border:"1px solid black",  borderCollapse: "collapse",fontSize:"18px",color:"red"}}>{requestFormDetails.quantity}</td>
    <td style={{padding:"15px",border:"1px solid black",  borderCollapse: "collapse",fontSize:"18px",color:"red"}}>Rs.{requestFormDetails.totalPrice}.00 </td>
    </>
  )}

     </tr>
    
   </table>

  
<br></br>

   <div> {selectedViewSlip && (
     <img
     alt="slip"
     style={{ width: '250px', height: '150px', marginRight: '440px' , marginLeft:"10px"}}
     src={currentSlipImage}
     />
     )} </div>
   
   
   
</div>
</div>  
</Modal>









     






                     {/*delete*/}
                     <Button style={{fontSize:"13px"}} color="danger"  onClick={() => {
                            setDeleteModal(true);setSelectedSlipId(bankSlip.transactionId);
                          }}> Delete </Button>
                       {/* Modal */}
                  <Modal
           className="boxwidth modal-dialog-centered "
           isOpen={deleteModal}
           toggle={() => setDeleteModal(!deleteModal)}
        >
       
          <div className="modal-body">
            <br/>
            
            {`Are you sure you want to delete Slip ID: ${selectedSlipId}?`}
          </div>
          <div className="modal-footer">
            <Button
              color="secondary"
              data-dismiss="modal"
              type="button"
              onClick={() => setDeleteModal(!deleteModal)}
            >
              Cancel
            </Button>
            <Button color="danger" type="button" onClick={handleDelete}>
              Delete
            </Button>
          </div>
        </Modal>  


        {/*update*/}
        <Button style={{fontSize:"13px"}} color="success" onClick={() => {
                             setSelectedSlipId(bankSlip.transactionId); 
                             setUpdateStatus(bankSlip.Status);
                             setUpdateModal(true); 
                           }}>Update</Button>

        <Modal
           className="boxwidth modal-dialog-centered "
           isOpen={updateModal}
           toggle={() => setUpdateModal(!updateModal)}
        >
       
          <div className="modal-body">
            <br/>
           <b> Slip ID: {" "} {" "}</b> {selectedSlipId}
      
    <br></br> <br></br>
   
    <Label for= "status"> Status :</Label>
      <Input type="text" style={{fontSize:"15px", color:"black"}} value={updateStatus} onChange={(e) => setUpdateStatus(e.target.value)}/>
          </div>
          <div className="modal-footer">
            <Button
              color="danger"
              data-dismiss="modal"
              type="button"
              onClick={() => setUpdateModal(!updateModal)}
            >
              Cancel
            </Button>
            <Button color="success" type="button" onClick={handleUpdate} >
              Save Changes
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
  
  export default PesticidePayment;
  