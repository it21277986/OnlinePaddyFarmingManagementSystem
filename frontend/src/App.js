import React from 'react';
import './App.css';
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";

//Lakmal
import Home from './components/NavBar/Home';
// import Navbar from './components/NavBar/Navbar';
// import AddSociety from './components/Society/AddSociety';
// import AllSociety from './components/Society/AllSociety';
// import EditSociety from './components/Society/EditSociety';
// import DeleteSociety from './components/Society/DeleteSociety';
// import RaiseNewTicket from './components/Ticket/raiseNewTicket';
// import SSDashboard from './components/SystemDashboard/SSDashboard';
// import AllRaisedTicket from './components/Ticket/AllRaisedTicket';
// import DeleteTicket from './components/Ticket/DeleteTicket';
// import NewBreakdown from './components/Breakdown/NewBreakdown';
// import AllBreakdown from './components/Breakdown/AllBreakdown';
import Footer from './components/Footer/Footer';

//Binguni
import AddPaddymill from "./components/binguni/Paddymill/AddPaddymill.js";
import AllPaddymill from "./components/binguni/Paddymill/AllPaddymill.js";
import EditPaddymill from "./components/binguni/Paddymill/EditPaddymill.js";
import DeletePaddymill from "./components/binguni/Paddymill/DeletePaddymill.js";
import Dashboard from "./components/binguni/Dashoboard/Dashboard.js";
import PMHome from "./components/binguni/PMHome/PMHome.js";
import AddTender from "./components/binguni/Tender/AddTender.js";
import AllTender from "./components/binguni/Tender/AllTender.js";
import AddPrice from "./components/binguni/FinalPrice/AddPrice.js";
import Track from "./components/binguni/Track/Track.js";
import VehicleTracking from "./components/binguni/Track/VehicalTracking";

//Sammani
import CropProtection from "./components/sammani/CropProtection";
import ProductDisplay from "./components/sammani/ProductsDisplay";
import ViewProduct from "./components/sammani/viewProduct.js"
import PaymentUI from "./components/sammani/PaymentUI";
import HeaderOfficer from "./components/sammani/PesticideDashBoard.js";
import DashBoardFooter from './components/sammani/DashBoardFooter';
import Product from './components/sammani/Product.js'
import PesticideDashBoard from "./components/sammani/PesticideDashBoard.js";
import Stock from "./components/sammani/Stock"
import ProductRequest from './components/sammani/ProductRequest.js';
import PesticidePayment from "./components/sammani/PesticidePayment";
import UpdateProduct from "./components/sammani/UpdateProduct";

function App() {
  return (
    <Router>
      <div>
         {/* Home */}
         <Routes>
          <Route path='/' element={<Home/>} />
          </Routes>

          {/* Lakmal */}
        <Routes>
          {/* <Route path='/ssdashboard' element={<SSDashboard/>} />
          <Route path='/addticket' element={<RaiseNewTicket/>} />
          <Route path='/ticket' element={<AllRaisedTicket/>} />
          <Route path='/deleteticket/:id' element={<DeleteTicket/>} />
          <Route path='/addSociety' element={<AddSociety />} />
          <Route path='/deleteSociety/:id' element={<DeleteSociety />} />
          <Route path='/Society' element={<AllSociety/>} />
          <Route path='/editSociety/:id' element={<EditSociety />} />
          <Route path='/addBreakdown' element={<NewBreakdown/>} />
          <Route path='/Breakdown' element={<AllBreakdown/>} />  */}
        </Routes>

        {/* Binguni */}
        <Routes>
          <Route path="/pmhome" element={<PMHome/>} />
          <Route path="/dashboard" element={<Dashboard/>} />
          <Route path="/addpm" element={<AddPaddymill />} />
          <Route path="/deletepm/:id" element={<DeletePaddymill/>} />
          <Route path="/addtender" element={<AddTender />} />
          <Route path="/addpmprice" element={<AddPrice />} />
          <Route path="/track" element={<Track/>} />
          <Route path="/vehicleTracking" element={<VehicleTracking/>} />
          <Route path="/pm" element={<AllPaddymill/>} />
          <Route path="/tender" element={<AllTender/>} />
          <Route path="/editpm/:id" element={<EditPaddymill/>}/>
        </Routes>

           {/* Sammani */}
        <Routes>
        <Route path="/pesticidePage" element={<CropProtection />} />
          <Route path="/pesticides" element={<ProductDisplay />} />
          <Route path="/crop-Protection" element={<CropProtection/>}/>
          <Route
            path="/pesticide/:productName/:productId"
            element={<ViewProduct />}
          />
           <Route path="/payment-Details" element={<PaymentUI/>}/>
           <Route path="/pesticideOfficer" element={<HeaderOfficer/>}/>
           
           //officer side 

           <Route path='/products' element={<Product/>}/>
           <Route path='/pesticideDashboard' element={<PesticideDashBoard/>}/>
           <Route path='/stock' element={<Stock/>}/>
           <Route path='/PesticideRequests' element={<ProductRequest/>}/>
           <Route path='/pesticidePayment' element={<PesticidePayment/>}/>
           <Route path='/updateproduct/:pesticideId' element={<UpdateProduct/>}/>

        </Routes>
        
         {/* Footer */}
         <Footer/>
      
    </div>
    </Router>
  );
}

export default App;
