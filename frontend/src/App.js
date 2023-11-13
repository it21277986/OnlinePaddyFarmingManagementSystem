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

import AddSociety from './components/Society/AddSociety';
import AllSociety from './components/Society/AllSociety';
import EditSociety from './components/Society/EditSociety';
import DeleteSociety from './components/Society/DeleteSociety';
import RaiseNewTicket from './components/Ticket/raiseNewTicket';
import SSDashboard from './components/SystemDashboard/SSDashboard';
import AllRaisedTicket from './components/Ticket/AllRaisedTicket';
import DeleteTicket from './components/Ticket/DeleteTicket';
import NewBreakdown from './components/Breakdown/NewBreakdown';
import AllBreakdown from './components/Breakdown/AllBreakdown';
import Footer from './components/Footer/Footer';

//Sachini
import AddCustomer from './components/sachini/AddCustomer';
import AllCustomers from './components/sachini/AllCustomers';
import Login from './components/sachini/Login';
import UserProfile from './components/sachini/UserProfile';
import EditUserProfile from './components/sachini/EditUserProfile';
import DeleteAccount from './components/sachini/DeleteAccount';
import AllRequests from './components/sachini/AllRequests';
import CustomerList from './components/sachini/CustomerList';
import HRHome from './components/sachini/HRHome';
import DeletedCustomerList from './components/sachini/DeletedCustomerList';
import CustomerEditForm from './components/sachini/CustomerEditForm';

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
import VehicleTracking from "./components/binguni/Track/VehicleTracking.js";

//Kalpana
import MachineRegistrationForm from './components/kalpana/MachineRegistrationForm';
import FuelRequest from './components/kalpana/FuelRequest';
import MachineRequest from './components/kalpana/MachineRequest/MachineRequest';
import Payment from './components/kalpana/Payment/Payment';
import MachineUpdateDelete from './components/kalpana/Dashboard/MachineUpdateDelete';
import MachineView from './components/kalpana/Dashboard/MachineView';
import MDashboard from './components/kalpana/Dashboard/MDashboard';

//Weenali
import AddReqDetails from './components/weenali/AddReqDetails';
import UpdateReqDetails from './components/weenali/UpdateReqDetails';
import DeleteReqDetails from './components/weenali/DeleteReqDetails';
// import HarvestDashboard from './components/weenali/HarvestDashboard';
// import ReportGenerate from './components/weenali/ReportGenerate';
import AllHarvestDetails from './components/weenali/AllHarvestDetails';
import Graph from './components/weenali/Graph';
import CostDetails from './components/weenali/CostDetails';
// import UnitPriceCalculations from './components/weenali/UnitPriceCal';
import PaddyTransfer from './components/weenali/PaddyTransfer';
import UpdatePaddyTransfer from './components/weenali/UpdatePaddyTransfer';
import HarvestCollectorDashboard from './components/weenali/HarvestCollectorDashboard';

//Kavindu
import MainPage from './components/kavindu/MainPage';
import AddFarmer from "./components/kavindu/addFarmer";
import AdminPage from "./components/kavindu/AdminPage";
import RequestList from './components/kavindu/RequestList';
import FertilizerStock from './components/kavindu/FertilizerStock';
import DeleteItem from './components/kavindu/DeleteItem';
import AddItem from './components/kavindu/AddItem';
import EditItem from './components/kavindu/EditItem';
import UploadDepositSlipPopup from './components/kavindu/UploadDepositSlipPopup';
import DisplayRecords from './components/kavindu/DisplayRecords';
import ViewFertilizerRequests from './components/kavindu/ViewFertilizerRequests';

//Thimalka
import Seedreq from "./components/thimalka/Seedreq"
import Addseedstock from "./components/thimalka/Addseedstock"
import Addpaddyvar from "./components/thimalka/Addpaddyvar"
import Allseedreq from './components/thimalka/Allseedreq';
import PaddyvarList from './components/thimalka/Allpaddyvar';
import AllSeeds from './components/thimalka/Allseeds'
import UpdateSeed from './components/thimalka/UpdateSeed'
import CEuser from './components/thimalka/CropEstabUser';
import PaddyInfo from './components/thimalka/Aboutcul';
import AllSeedsdisplay from './components/thimalka/Allseedsdisplay';
import Dashboardceo from './components/thimalka/Dashboardceo';

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
          {/* <Route path='/ssdashboard' element={<SSDashboard/>} /> */}

        </Routes>

        {/* Lakmal */}
        <Routes>
          <Route path='/ssdashboard' element={<SSDashboard/>} />
          <Route path='/addticket' element={<RaiseNewTicket/>} />
          <Route path='/ticket' element={<AllRaisedTicket/>} />
          <Route path='/deleteticket/:id' element={<DeleteTicket/>} />
          <Route path='/addSociety' element={<AddSociety />} />
          <Route path='/deleteSociety/:id' element={<DeleteSociety />} />
          <Route path='/Society' element={<AllSociety/>} />
          <Route path='/editSociety/:id' element={<EditSociety />} />
          <Route path='/addBreakdown' element={<NewBreakdown/>} />
          <Route path='/Breakdown' element={<AllBreakdown/>} /> 
          <Route path='/Breakdown' element={<AllBreakdown/>} /> 
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
        {/* Sachini */}
        <Routes>
          <Route path="/AllCus" element={<AllCustomers />} />
          <Route path="/register" element={<AddCustomer />} />
          <Route path="/loginCus" element={<Login />} />
          <Route path="/getUser/:nic" element={<UserProfile />} />
          <Route path="/updateCus/:nic" element={<EditUserProfile />} />
          <Route path="/deleteCus/:nic" element={<DeleteAccount />} /> 
          <Route path="/checkNIC/:nic" element={<AllRequests />} />
          <Route path="/fetch" element={<CustomerList />} />
          {/*<Route path="/crop-selection" component={CropSelectionPage} />*/} {/* Define routes for your other pages */}
          <Route path="/hr-home" element={<HRHome />} /> 
          <Route path="/customer-list" element={<CustomerList />} />
          <Route path="/deleted-customer-list" element={<DeletedCustomerList />} />
          <Route path="/CustomerEditForm/:nic" element={<CustomerEditForm />} />
          <Route path="/profile" element={<UserProfile />} />
          <Route path="/allcustomers" element={<AllCustomers />} />
        </Routes>
          
          {/* Kalpana */}
        <Routes>
          <Route path="/AddMachine" element={<MachineRegistrationForm />} />
          <Route path="/MachineRequest" element={<MachineRequest/>}/>
          <Route path="/FuelRequest" element={<FuelRequest/>}/>
          <Route path= "/Payment" element={<Payment/>} />
          <Route path= "/displayMachine" element={<MachineUpdateDelete/>}/>
          <Route path="/viewMachine/:id" element={<MachineView/>} />
          <Route path='/Mdashboard' element={<MDashboard/>} />
        </Routes>

        {/* Weenali */}
        <Routes>
        <Route path="/addHarvest" element={<AddReqDetails/>}/>
          <Route path="/cost" element={<CostDetails/>}/>
          {/* <Route path="/calculate" element={<UnitPriceCalculations/>}/> */}
          <Route path="/transfer" element={<PaddyTransfer/>}/>
          <Route path='/UpdatePaddyTransfer/:id' element={<UpdatePaddyTransfer />}/>
          <Route path="/Graph" element={<Graph/>}/>
          <Route path='/Harvest' element={<AllHarvestDetails/>} />
          <Route path='/UpdateReqDetails/:id' element={<UpdateReqDetails />}/>
          <Route path='/DeleteReqDetails/:id' element={<DeleteReqDetails />}/>
          {/* <Route path='/getDashboard' element={<HarvestDashboard/>} /> */}
          {/* <Route path='/report' element={<ReportGenerate/>} />  */}
          <Route path='/getDashboard' element={<HarvestCollectorDashboard/>} />
        </Routes>
        
        {/* Kavindu */}
        <Routes>
          <Route path="/fertilizer" element={<MainPage />} />
          <Route path="/fertilizer/addRequest" element={<AddFarmer />} />
          <Route path="/admin" element={<AdminPage />} />
          <Route path="/admin/getRequest" element={<RequestList />}/>
          <Route path="/admin/stock" element={<FertilizerStock />} /> 
          <Route path="/admin/addItem" element={<AddItem />} />
          <Route path="/admin/stock/updateStockDetails/:id" element={<EditItem />} />
          <Route path="/admin/stock/deleteStockDetails/:id" element={<DeleteItem />} />
          <Route path="/fertilizer/upload" element={<UploadDepositSlipPopup/>} />
          <Route path="/admin/getUpdateRecords" element={<DisplayRecords />} />
          <Route path="/admin/getRequest" element={<ViewFertilizerRequests />} />
        </Routes>

        {/* Thimalka */}
        <Routes>
          <Route path='/req' element={<Seedreq />} />
          <Route path='/addseed' element={<Addseedstock />} />
          <Route path='/addpaddy' element={<Addpaddyvar />} />
          <Route path='/allreq' element={<Allseedreq />} />
          <Route path='/allpaddy' element={<PaddyvarList />} />
          <Route path='/allseeds' element={<AllSeeds />} />
          <Route path='/updateseed/:id' element={<UpdateSeed />} />
          <Route path='/ASD' element={<AllSeedsdisplay />} />
          <Route path='/CEU' element={<CEuser />} />
          <Route path='/APC' element={<PaddyInfo />} />
          <Route path='/dboard' element={<Dashboardceo/>} />
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
