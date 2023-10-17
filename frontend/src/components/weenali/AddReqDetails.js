import React, { useState } from "react";
import axios from "axios";
import { Navigate } from "react-router-dom";
import HarvestMenu from './HarvestMenu';
import { Link } from 'react-router-dom';


export default function AddReqDetails() {

  const [name, setName] = useState("");
  const [date, setDate] = useState("");
  const [address, setAddress] = useState("");
  const [email, setEmail] = useState("");
  const [NIC, setNIC] = useState("");
  const [area, setArea] = useState("");
  const [ricetype, setRicetype] = useState("");
  const [cultivatedamount, setCultivatedamount] = useState("");
  const [agreedamount, setAgreedamount] = useState("");
  const [contactNumber, setContactNumber] = useState("");
  const [NicError, setNicError] = useState("");
  const [status, setStatus] = useState("");
  const [contactNumberError, setContactNumberError] = useState("");


  // Validation functions
  const validateNIC = () => {
    if (!NIC.match(/^\d{9}[vVxX]|\d{12}$/)) {
      setNicError("Invalid NIC format (e.g., 123456789V or 123456789000)");
    } else {
      setNicError("");
    }
  };

  const validateContactNumber = () => {
    if (!contactNumber.match(/^\d{10}$/)) {
      setContactNumberError("Invalid Contact No format (e.g., 1234567890)");
    } else {
      setContactNumberError("");
    }
  };

  const sendData = (e) => {
    e.preventDefault();

    validateNIC();
    validateContactNumber();

    if (!NicError && !contactNumberError) {
      const newHarvest = {
        name,
        date,
        address,
        email,
        NIC,
        area,
        ricetype,
        cultivatedamount,
        agreedamount,
        status,
        contactNumber,
      };

      axios
        .post("http://localhost:8070/harvest/addHarvest", newHarvest)
        .then(() => {
          // Use Navigate as a function
          Navigate('/Harvest');
          alert("done");
        })
        .catch((err) => {
          alert(err);
        });
    }
  }

  return (


    
    <div>
        <HarvestMenu/>
      <form className="container" onSubmit={sendData}>
        <br />
        <div className="row">
          <div className="col-sm">
            <br/><br/><br/><br/><br/><br/>
            <h2>Add Harvest Details</h2>
            <hr className="border border-success border-2 opacity-50"/>
          </div>
          
        </div>
        <div className="mb-3">
          <label className="form-label">Farmer Name</label>
          <input
            type="text" 
            className="form-control"
            placeholder="Enter  Name"
            value={name}
            onChange={(e) => setName(e.target.value)}
            required
          />
        </div>
        
        <div className="mb-3">
          <label className="form-label">Date</label>
          <input
            type="Date" 
            className="form-control"
            placeholder="Enter Date"
            value={date}
            onChange={(e) => setDate(e.target.value)}
            required
            max={new Date().toISOString().split("T")[0]}
          />
        </div>
        <div className="mb-3">
          <label className="form-label">Address</label>
          <input
            type="text"
            className="form-control"
            placeholder="Enter address"
            value={address}
            onChange={(e) => setAddress(e.target.value)}
            required
          />
        </div>
        <div className="mb-3">
          <label className="form-label">Email</label>
          <input
            type="text"
            className="form-control"
            placeholder="Enter email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            required
          />
          <div className="mb-3">
          <label className="form-label">NIC</label>
          <input
            type="text"
            className="form-control"
            placeholder="Enter NIC"
            value={NIC}
            onChange={(e) => setNIC(e.target.value)}
            required
            onBlur={validateNIC}
          />
          {NicError && (
            <div className="text-danger">{NicError}</div>
          )}
        </div>
        </div>
        <div className="mb-3">
          <label className="form-label">Area</label>
          <input
            type="text"
            className="form-control"
            placeholder="Enter area"
            value={area}
            onChange={(e) => setArea(e.target.value)}
            required
          />
        </div>
        <div className="mb-3">
          <label className="form-label">Rice type</label>
          {/* <input
            type="text"
            className="form-control"
            placeholder="Enter Rice Type"
            value={ricetype}
            onChange={(e) => setRicetype(e.target.value)}
            required
          /> */}
            <select name="ricetype" id="ricetype" className="form-control" value={ricetype}
            onChange={(e) => setRicetype(e.target.value)}
            required>
              <option value="Samba">Samba</option>
              <option value="Nadu">Nadu</option>
              <option value="Rathu Kakulu">Rathu Kakulu</option>
              <option value="Sudu Kakulu">Sudu Kakulu</option>
              <option value="Basmathi">Basmathi</option>
             
            </select>
        </div>
        <div className="mb-3">
          <label className="form-label">Cultivated-Kg</label>
          <input
            type="text"
            className="form-control"
            placeholder="Enter Cultivated Amount"
            value={cultivatedamount}
            onChange={(e) => setCultivatedamount(e.target.value)}
            required
          />
        </div>
        <div className="mb-3">
          <label className="form-label">Agreed-Kg</label>
          <input
            type="text"
            className="form-control"
            placeholder="Enter Agreed Amount"
            value={agreedamount}
            onChange={(e) => setAgreedamount(e.target.value)}
            required
          />
        </div>
        <div className="mb-3">
          <label className="form-label">Status</label>
          <input
            type="text" 
            className="form-control"
            placeholder="Enter Status"
            value={status}
            onChange={(e) => setStatus(e.target.value)}
            required
          />
        </div>
        <div className="mb-3">
          <label className="form-label">Contact No</label>
          <input
            type="text"
            className="form-control"
            placeholder="Enter Society Contact No"
            value={contactNumber}
            onChange={(e) => setContactNumber(e.target.value)}
            required
            onBlur={validateContactNumber}
          />
          {contactNumberError && <div className="text-danger">{contactNumberError}</div>}
        </div >
        <div className="d-flex justify-content-between">
          <button type="submit" className="btn btn-outline-success">
            Submit
          </button>
          <Link to={`/Harvest`} className="btn btn-outline-success">
          <i className="fas fa-pen" /> All Harvest Details
          </Link>
        </div>
        
       
      </form>
    </div>
  );
}