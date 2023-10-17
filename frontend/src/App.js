import React from 'react';
import './App.css';
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
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
      
    </div>
    </Router>
  );
}

export default App;
