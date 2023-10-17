import React from 'react';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import Header from './component/Header';
import Footer from './component/Footer';
import AddCustomer from './component/AddCustomer';
import AllCustomers from './component/AllCustomers';
import Login from './component/Login';
import UserProfile from './component/UserProfile';
import EditUserProfile from './component/EditUserProfile';
import DeleteAccount from './component/DeleteAccount';

function App() {
  return (
    <Router>
      <div className="App">
        <Header />
        <Routes>
          <Route path="/" element={<AllCustomers />} />
          <Route path="/register" element={<AddCustomer />} />
          <Route path="/loginCus" element={<Login />} />
          <Route path="/getUser/:nic" element={<UserProfile />} />
          <Route path="/updateCus/:nic" element={<EditUserProfile />} />
          <Route path="/deleteCus/:nic" element={<DeleteAccount />} /> 
          {/*<Route path="/crop-selection" component={CropSelectionPage} />*/} {/* Define routes for your other pages */}

          <Route path="/profile" element={<UserProfile />} />
          <Route path="/allcustomers" element={<AllCustomers />} />
        </Routes>

        <Footer />
        
      </div>

    </Router>
  );
}

export default App;
