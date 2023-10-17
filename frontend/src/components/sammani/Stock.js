import { useState , useEffect } from "react";
import axios from "axios";
import "./assetsOfficer/css/dashboard.css";
import { Link, useLocation } from 'react-router-dom';
import {
    Card,
    CardHeader,
   Button,
    Table,
    Container,
    Row,
    Label,Input,Modal
  } from "reactstrap";

  
  // core components

 
  const Stock = () => {
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


    const [editModal, setEditModal] = useState(false);
    const [searchQuery, setSearchQuery] = useState("");

     //Display
   const [data,setData]= useState([]);
   useEffect(() => {
    axios
      .get("http://localhost:8070/pesticides/")
      .then((res) => {
        setData(res.data);
        console.log("Data from the server:", res.data); // Add this line
      })
      .catch((err) => console.log(err, 'There is an Error'));
  }, []);

  const handleSearchInputChange = (e) => {
    setSearchQuery(e.target.value);
  };

  // Function to filter data based on the search query
  const filteredData = data.filter(
    (singleData) =>
      singleData.productName.toLowerCase().includes(searchQuery.toLowerCase()) ||
      singleData.pesticideId.toLowerCase().includes(searchQuery.toLowerCase())
  );

  //Edit
  const [editedData, setEditedData] = useState(null);
  const [editedQuantity, setEditedQuantity] = useState("");
  const [editedAvailability, setEditedAvailability] = useState("");
  const updatePesticide = (singleData) => {
    axios
      .put(`http://localhost:8070/pesticides/update/${singleData.pesticideId}`, {
        quantity: editedQuantity,
        availability: editedAvailability,
        
        // other fields you want to update go here
      })
      .then((response) => {
        alert("Pesticide updated successfully");
        // Close the modal or perform any other actions after a successful update
        setEditModal(false);
        fetchData(); 
        window.location.reload()
      })
      .catch((error) => {
        alert("Error updating pesticide:", error);
      });
  };
  // Function to fetch data
  const fetchData = () => {
    axios
      .get("http://localhost:8070/pesticides/")
      .then((res) => {
        setData(res.data);
        console.log("Data from the server:", res.data);
      })
      .catch((err) => console.log(err, "There is an Error"));
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
    <input
          type="search"
          placeholder="Search by Product Name / ID "
          value={searchQuery}
          onChange={handleSearchInputChange}
        />
<button type="submit" class="search-btn"><i class='bx bx-search' ></i></button>  </div>
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
    <h1>Pesticide Stock Management</h1>
    <ul class="breadcrumb">
      <li>
        <a href="#">Stock</a>
      </li>
      <li><i class='bx bx-chevron-right' ></i></li>
      <li>
        <a class="active" href="#">Home</a>
      </li>
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
                <h3 className="mb-0">Pesticide Stock</h3>
              </CardHeader>
              <Table className="align-items-center table-flush" responsive>
                <thead className="thead-light">
                  <tr>
                    <th  style={{fontSize:"14px" , color:"black"}} scope="col">Product ID</th>
                    <th  style={{fontSize:"14px" , color:"black"}}scope="col">Product Name</th>
                    <th  style={{fontSize:"14px" , color:"black"}}scope="col">Price</th>
                    <th  style={{fontSize:"14px" , color:"black"}}scope="col">Quantity </th>
                    <th  style={{fontSize:"14px" , color:"black"}}scope="col">Availability</th>
                    <th  style={{fontSize:"14px" , color:"black"}}scope="col">Updated Date</th>
                    <th scope="col" />
                  </tr>
                </thead>
                <tbody>
                {filteredData.map((singleData,index) => (
                  <tr key={index}>
                    <th scope="row">
                      <span className="mb-0 text-sm">{singleData.pesticideId}</span>
                    </th>
                    <td style={{fontSize:"15px"}}>{singleData.productName}</td>
                    <td style={{fontSize:"15px"}}>Rs.{singleData.price}.00</td>
                    <td style={{fontSize:"15px"}}>{singleData.quantity}</td>
                    <td style={{fontSize:"15px"}}>{singleData.availability}</td>
                    <td style={{fontSize:"15px"}}>{singleData.updatedTime}</td>
                    <td>
                    <Button style={{fontSize:"13px"}} color="default"   onClick={() => {
  setEditedQuantity(singleData.quantity);
  setEditedAvailability(singleData.availability);
  setEditedData(singleData); //store
  setEditModal(true);
}}> Edit </Button>
                    <Modal
         className="boxwidth modal-dialog-centered "
         isOpen={editModal}
         toggle={() => setEditModal(!editModal)}
      >
     
        <div className="modal-body">
          <br/>
         <b> Product Name :{" "} {" "}</b>  {editedData ? editedData.productName : ""}
 
  <br></br> <br></br>
 
  <Label for= "quantity" > Quantity :</Label>
    <Input type="text" value={editedQuantity}  onChange={(e) => setEditedQuantity(e.target.value)}/>
    <br></br>
    <Label for= "availability"> Availability :</Label>
    <Input type="text" value={editedAvailability} onChange={(e) => setEditedAvailability(e.target.value)}/>
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
          <Button color="success" type="button" onClick={() => updatePesticide(singleData)} >
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

export default Stock;