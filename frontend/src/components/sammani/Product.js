import "./assetsOfficer/css/dashboard.css";
import React, { useEffect, useState } from "react";
import  axios from "axios";
import "./assetsOfficer/css/Product.css"
import "./assetsOfficer/css/viewProduct.css"
import { useNavigate } from "react-router-dom";
import { Link, useLocation } from 'react-router-dom';
import {
  Button,
  Card,
  CardBody,
  CardImg,
  CardTitle,
  Modal,
  FormGroup,
  Form,
  Input,
  Label,
  Row,Col
} from "reactstrap";




function Product(){
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

  const [exampleModal, setExampleModal] = useState(false);

  //search function

  const [searchQuery, setSearchQuery] = useState("");
  const [filteredData, setFilteredData] = useState([]);



//update Product

const navigate = useNavigate();

  //deleteButtonPopup
  const [viewModal, setViewModal] = useState(false);

//Display seraptely using Id
const [singleView,setSingleView]= useState(false)
const [currentProduct, setCurrentProduct] = useState(null);
const [currentProductImage, setCurrentProductImage] = useState("");

const fetchProductDetails = (productId) => {
  axios
    .get(`http://localhost:8070/pesticides/get/${productId}`)
    .then((res) => {
      setCurrentProduct(res.data);
      // Set the current product's image
      const base64String = btoa(
        String.fromCharCode(...new Uint8Array(res.data.image.data.data))
      );
      setCurrentProductImage(`data:image/png;base64,${base64String}`);
    })
    .catch((err) => {
      console.error(err);
    });
};
//Delete 
 const [selectedProductName, setSelectedProductName] = useState(""); 
  const [productIdToDelete, setProductIdToDelete] = useState("");
  const deleteProduct = () => {
    
    axios
      .delete(`http://localhost:8070/pesticides/delete/${productIdToDelete}`)
      .then(() => {
        alert("Product deleted");
        // Reload the page after deleting the product
        window.location.reload();
      })
      .catch((err) => {
        alert(err);
      });
  };
 
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
  const handleSearchQueryChange = (e) => {
    console.log("Search query changed:", e.target.value); 
    const query = e.target.value.toLowerCase();
    setSearchQuery(query);

    // Filter the data based on the search query
    const filtered = data.filter((product) =>
      product.productName.toLowerCase().includes(query)
    );

    setFilteredData(filtered);
  };


   //ADD
    const [pesticideId, setpesticideId] = useState("");
    const [image, setimage] = useState("");
    const [pesticideType, setpesticideType] = useState("");
    const [chemicalName, setchemicalName] = useState("");
    const [manufacturer, setmanufacturer] = useState("");
    const [productName, setproductName] = useState("");
    const [classification, setclassification] = useState("");
    const [pests, setpests] = useState("");
    const [availability, setavailability] = useState("");
    const [quantity, setquantity] = useState("");
    const [price, setprice] = useState("");
    const [packs, setpacks] = useState("");
    const [description, setdescription] = useState("");

    function onChangeFile(e){
    setimage(e.target.files[0]);
     }


   function changeOnClick(e){
      e.preventDefault();
      
      const formData = new FormData();
      formData.append("pesticideId", pesticideId);
      formData.append("image", image);
      formData.append("pesticideType", pesticideType);
      formData.append("chemicalName", chemicalName);
      formData.append("manufacturer", manufacturer);
      formData.append("productName", productName);
      formData.append("classification", classification);
      formData.append("pests", pests);
      formData.append("availability", availability);
      formData.append("quantity", quantity);
      formData.append("price", price);
      formData.append("packs", packs);
      formData.append("description", description);


      const newProduct = {
        pesticideId,
        image,
        pesticideType,
        chemicalName,
        manufacturer,
        productName,
        classification,
        pests,
        availability,
        quantity,
        price,
        packs,
        description,
      
      }
       console.log(newProduct);
      

      axios.post("http://localhost:8070/pesticides/add",formData,{
         headers: {"Content-Type": "multipart/form-data"},}).then(()=>{
          alert("Product added");

          setpesticideId("");
          setpesticideType("");
          setchemicalName("");
          setmanufacturer("");
          setproductName("");
          setclassification("");
          setpests("");
          setavailability("");
          setquantity("");
          setprice("");
          setpacks("");
          setdescription("")
      
         // Reload the page after adding the product
          window.location.reload();


      }).catch((err)=>{
          alert(err)
      })
      
     

      }
      console.log("Rendering cards...");
      const renderCards = () => {
        const productsToRender = searchQuery ? filteredData : data;
        
        return productsToRender.map((singleData, index) => {
          const base64String = btoa(
            String.fromCharCode(...new Uint8Array(singleData.image.data.data))
          );
          return (
            <div className="wrap" key={index}>
              <Card className="cardcss" style={{ marginLeft: "20px" }}>
                <CardImg
                  className="photo cardimage"
                  alt="..."
                  src={`data:image/png;base64,${base64String}`}
                  top
                    onClick={() => {
                    setSingleView(true);
                    fetchProductDetails(singleData.pesticideId); 
                 }}
                />
{/*View Modal*/}
              {/*Image Popup*/}

              <Modal className="bxwidth modal-dialog-centered "
           isOpen={singleView}
           toggle={() => setSingleView(!singleView)}>
            
              {currentProduct && (
     <>

           <div  style={{marginTop:"10px"}}   className="modal-header"> 
           <div className="modal-title">
           <h1>Product Name: {currentProduct.productName}</h1>
             </div>
              <button
              aria-label="Close"
              className="close"
              data-dismiss="modal"
              type="button"
              onClick={() => setSingleView(!singleView)}
            >
              <span aria-hidden={true}>×</span>
            </button>
            </div>
            <div className="modal-body">
             <Row>

<Col>
<br/>
<br/>
<Card className="cardbg">

<CardImg  style={{ height: "400px"}}  src={currentProductImage}>

</CardImg>
</Card>
</Col>
<Col style={{marginLeft:"30px"}}>
<Row>
<h3 style={{ marginLeft:"10px",fontSize: "22px",color:"black"  }} >{currentProduct.pesticideType}</h3>
</Row>
<Row>
<p style={{ marginLeft:"10px",fontSize: "19px",color:"black"  }} >{currentProduct.description}</p>
</Row>

<table style={{borderCollapse: "collapse"}}>
<tr>
 <th style={{ fontSize: "18px",color:"black" , border: "1px solid #dddddd", textAlign: "left", padding: "8px" }}>Chemical Name </th>
 <td style={{  fontSize: "18px",color:"black" , border: "1px solid #dddddd", textAlign: "left", padding: "8px"  }}>{currentProduct.chemicalName}</td>
</tr>
<tr>
 <th style={{ fontSize: "18px",color:"black" , border: "1px solid #dddddd", textAlign: "left", padding: "8px" }}>Manufacturer </th>
 <td style={{  fontSize: "18px",color:"black" , border: "1px solid #dddddd", textAlign: "left", padding: "8px"  }}>{currentProduct.manufacturer}</td>
</tr>
<tr>
 <th style={{ fontSize: "18px",color:"black" , border: "1px solid #dddddd", textAlign: "left", padding: "8px" }}>Classification </th>
 <td style={{  fontSize: "18px",color:"black" , border: "1px solid #dddddd", textAlign: "left", padding: "8px"  }}>{currentProduct.classification}</td>
</tr>
<tr>
 <th style={{ fontSize: "18px",color:"black" , border: "1px solid #dddddd", textAlign: "left", padding: "8px" }}>Control/Prevent </th>
 <td style={{  fontSize: "18px",color:"black" , border: "1px solid #dddddd", textAlign: "left", padding: "8px"  }}>{currentProduct.pests}</td>
</tr>
<tr>
 <th style={{ fontSize: "18px",color:"black" , border: "1px solid #dddddd", textAlign: "left", padding: "8px" }}>Packing</th>
 <td style={{  fontSize: "18px",color:"black" , border: "1px solid #dddddd", textAlign: "left", padding: "8px"  }}>{currentProduct.packs}</td>
</tr>
<tr>
 <th style={{ fontSize: "18px",color:"black" , border: "1px solid #dddddd", textAlign: "left", padding: "8px" }}>Unit Price</th>
 <td style={{  fontSize: "18px",color:"black" , border: "1px solid #dddddd", textAlign: "left", padding: "8px"  }}>Rs.{currentProduct.price}.00</td>
</tr>
<br></br>


</table>
</Col>
</Row>
</div>

</>
  )}
</Modal>

                <CardBody>
                  <CardTitle style={{ fontWeight: "600", fontSize: "18px", color: "black" }}>{singleData.productName}</CardTitle>
                 
                  <Button
                color="neutral"
                 onClick={() => {
                  navigate(`/updateproduct/${singleData.pesticideId}`);
                }}
              >
               Update
              </Button>



                  {/* Button trigger modal */}
                  <Button
                    color="danger"
                    onClick={() => {
                      setSelectedProductName(singleData.productName);
                      setProductIdToDelete(singleData.pesticideId);
                      setViewModal(true);
                    }}
                  >
                    Delete
                  </Button>
                  {/* Modal */}
                  <Modal
           className="boxwidth modal-dialog-centered "
           isOpen={viewModal}
           toggle={() => setViewModal(!viewModal)}
        >
       
          <div className="modal-body">
            <br/>
            Are you sure you want delete {selectedProductName}?
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
            <Button color="danger" type="button" onClick={()=>deleteProduct()}>
              Delete
            </Button>
          </div>
        </Modal>

                </CardBody>
              </Card>
              <br />
            </div>
          );
        });
      
      };
      console.log("Finished rendering cards.");



      
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
            type="text"
            placeholder="Search by Product Name"
            value={searchQuery}
            onChange={handleSearchQueryChange}
          />
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
					<h1>Pesticide Products</h1>
					<ul class="breadcrumb">
						<li>
							<a href="#">Dashboard</a>
						</li>
						<li><i class='bx bx-chevron-right' ></i></li>
						<li>
							<a class="active" href="#">Home</a>
						</li>
					</ul>
				</div>
</div>
      <div className="addproduct">
      {/* Button trigger modal */}
      <Button
          color="warning"
          onClick={() => setExampleModal(!exampleModal)}
        >
         Add Product
        </Button>
        {/* Modal */}
        <Modal style={{fontSize:"16px"}}  
          className="boxwidth modal-dialog-centered "
          isOpen={exampleModal}
        toggle={() => setExampleModal(!exampleModal)}
        >
          <div className="modal-header">
            <h5 className="modal-title" id="exampleModalLabel">
            Pesticide Product
            </h5>
            <button
              aria-label="Close"
              className="close"
              data-dismiss="modal"
              type="button"
              onClick={() => setExampleModal(!exampleModal)}
            >
              <span aria-hidden={true}>×</span>
            </button>
          </div>
          <div className="modal-body">
            <Form onSubmit={changeOnClick} encType="multipart/form-data">
             
              <FormGroup className="boxmargin">
              <Label for="pesticideId">Pesticide ID :</Label>
                <Input style={{color:"black", fontSize:'16px'}}
                value={pesticideId}
                  placeholder="Pesticide##"
                  type="text"
               required onChange={(e)=>{setpesticideId(e.target.value);}}/>
              </FormGroup>
               <FormGroup style={{border:"none"}} >
               <Input  type="file" id="image"  filename="image/*" onChange={onChangeFile}/> 
               </FormGroup>
                   
                  <FormGroup className="boxmargin">
                 <Label for="pesticideType">Product Type :</Label>
                 <Input style={{color:"black", fontSize:'16px'}}
                 value={pesticideType}
                  placeholder="Insecticide/Herbicide/Fungicide/Weedicide"
                  type="text"
               required onChange={(e)=>{setpesticideType(e.target.value);}}/>
                </FormGroup>
                  <FormGroup className="boxmargin">
                 <Label for="chemicalName">Chemical Name :</Label>
                 <Input style={{color:"black", fontSize:'16px'}}
                 value={chemicalName}
                  placeholder=""
                  type="text"
                  required onChange={(e)=>{setchemicalName(e.target.value);}}/> </FormGroup>
                 <FormGroup className="boxmargin">
                <Label for="manufacturer">Manufacturer :</Label>
                 <Input style={{color:"black", fontSize:'16px'}}
                 value={manufacturer}
                  placeholder=""
                  type="text"
                  required onChange={(e)=>{setmanufacturer(e.target.value);}}/>
                </FormGroup>
                 <FormGroup className="boxmargin">
                 <Input style={{color:"black", fontSize:'16px'}}
                 value={availability}
                  placeholder=""
                  type="hidden"
                  onChange={(e)=>{setavailability(e.target.value);}}/></FormGroup>
                 <FormGroup className="boxmargin">
                <Label for="productName">Product Name :</Label>
                 <Input style={{color:"black", fontSize:'16px'}}
                 value={productName}
                  placeholder=""
                  type="text"
                  required onChange={(e)=>{setproductName(e.target.value);}}/></FormGroup>
                 <FormGroup className="boxmargin">
                <Label for="classification">Classification :</Label>
                 <Input style={{color:"black", fontSize:'16px'}}
                 value={classification}
                  placeholder=""
                  type="text"
                  onChange={(e)=>{setclassification(e.target.value);}}/></FormGroup>
                   <FormGroup className="boxmargin">
                  <Label for="pests">Control/Prevent :</Label>
                  <Input style={{color:"black", fontSize:'16px'}}
                     value={pests}
                     placeholder=" "
                     rows="3"
                     type="text"
                  required onChange={(e)=>{setpests(e.target.value);}}/>
                </FormGroup>
                 <FormGroup className="boxmargin">
                <Label for="quantity">Quantity :</Label>
                <Input style={{color:"black", fontSize:'16px'}}
                 value={quantity}
                  placeholder=""
                  type="text"
                  required onChange={(e)=>{setquantity(e.target.value);}}/>
                </FormGroup>
                   <FormGroup className="boxmargin">
                  <Label for="price">Unit Price :</Label>
                <Input style={{color:"black", fontSize:'16px'}}
                 value={price}
                  placeholder=""
                  type="text"
                  required onChange={(e)=>{setprice(e.target.value);}}/></FormGroup>
                   <FormGroup className="boxmargin">
                  <Label for="packs">Packing :</Label>
                <Input style={{color:"black", fontSize:'16px'}}
                 value={packs}
                  placeholder=""
                  type="text"
                  required onChange={(e)=>{setpacks(e.target.value);}}/></FormGroup>
                   <FormGroup className="boxmargin">
                <Input style={{color:"black", fontSize:'16px', border:"1px solid black"}}
                 value={description}
                  placeholder="description"
                  type="textarea"
                  required onChange={(e)=>{setdescription(e.target.value);}}/></FormGroup>
          <div className="modal-footer">
            <Button 
              color="danger"
              data-dismiss="modal"
              type="button"
              onClick={() => setExampleModal(!exampleModal)}
            >
             Cancel
            </Button>
            <Button className="btn-success" type="submit" onClick={() => console.log("Add Product button inside modal clicked")}>
            Add Product
            </Button>
          </div>
          </Form>
          </div>
        </Modal>
      </div>
      <br/>
       <br/>       
     
        {renderCards()}
     </main>
     </section>
    </>
  );
}export default Product;







    


   
