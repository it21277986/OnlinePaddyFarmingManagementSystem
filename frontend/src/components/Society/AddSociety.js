import React, { useState } from "react";
import axios from "axios";
import { Link } from 'react-router-dom';

export default function AddSociety() {

  const [societyname, setSocietyname] = useState("");
  const [regid, setRegid] = useState("");
  const [address, setAddress] = useState("");
  const [presidentname, setPresidentname] = useState("");
  const [presidentnic, setPresidentnic] = useState("");
  const [contactno, setContactno] = useState("");
  const [presidentNicError, setPresidentNicError] = useState("");
  const [contactNoError, setContactNoError] = useState("");
  const [latestSocietyDetails, setLatestSocietyDetails] = useState(null);

  // Validation functions
  const validatePresidentNIC = () => {
    if (!presidentnic.match(/^\d{9}[vVxX]|\d{12}$/)) {
      setPresidentNicError("Invalid NIC format (e.g., 123456789V or 123456789000)");
    } else {
      setPresidentNicError("");
    }
  };

  const validateContactNo = () => {
    if (!contactno.match(/^\d{10}$/)) {
      setContactNoError("Invalid Contact No format (e.g., 1234567890)");
    } else {
      setContactNoError("");
    }
  };

  const sendData = (e) => {
    e.preventDefault();

    validatePresidentNIC();
    validateContactNo();

    if (!presidentNicError && !contactNoError) {
      const newSociety = {
        societyname,
        regid,
        address,
        presidentname,
        presidentnic,
        contactno,
      };

      axios.post("http://localhost:8070/society/addSociety", newSociety)
          .then(() => {

          setLatestSocietyDetails(newSociety); // Update the latestSocietyDetails state
          setSocietyname(""); // Clear form fields
          setRegid("");
          setAddress("");
          setPresidentname("");
          setPresidentnic("");
          setContactno("");
          document.getElementById("exampleModal").style.display = "block"; // Show the modal
        })
        .catch((err) => {
          alert("filling not successful try again");
        });
    }
  };
  const handleDoneClick = () => {
    document.getElementById("exampleModal").style.display = "none"; // Hide the modal
  };

  return (
    <div>
      <form className="container" onSubmit={sendData}>
        <br />
        <div className="row">
          <div className="col-sm">
            <br/><br/><br/><br/><br/><br/>
            <h2>Add Your Society</h2>
            <hr className="border border-success border-2 opacity-50"/>
          </div>
          <div className="col-sm">
            <img className="img-fluid px-3 px-sm-4 mt-3 mb-4 a6"
              src="imgLakmal/undraw_engineering_team_a7n2.svg" alt="..." />
          </div>
        </div>
        <div className="mb-3">
          <label className="form-label"><h5>Society Name</h5></label>
          <input
            type="text" 
            className="form-control"
            placeholder="Enter Society Name"
            value={societyname}
            onChange={(e) => setSocietyname(e.target.value)}
            required
            style={{color: "black"}}
          />
        </div>
        <div className="mb-3">
          <label className="form-label"><h5>Registration No</h5></label>
          <input
            type="text"
            className="form-control"
            placeholder="Enter Registration No"
            value={regid}
            onChange={(e) => setRegid(e.target.value)}
            required
            style={{color: "black"}}
          />
        </div>
        <div className="mb-3">
          <label className="form-label"><h5>Address</h5></label>
          <input
            type="text"
            className="form-control"
            placeholder="Enter Address"
            value={address}
            onChange={(e) => setAddress(e.target.value)}
            required
            style={{color: "black"}}
          />
        </div>
        <div className="mb-3">
          <label className="form-label"><h5>President Name</h5></label>
          <input
            type="text"
            className="form-control"
            placeholder="Enter President Name"
            value={presidentname}
            onChange={(e) => setPresidentname(e.target.value)}
            required
            style={{color: "black"}}
          />
        </div>
        <div className="mb-3">
          <label className="form-label"><h5>President NIC</h5></label>
          <input
            type="text"
            className="form-control"
            placeholder="Enter President NIC"
            value={presidentnic}
            onChange={(e) => setPresidentnic(e.target.value)}
            required
            style={{color: "black"}}
            onBlur={validatePresidentNIC}
          />
          {presidentNicError && (
            <div className="text-danger">{presidentNicError}</div>
          )}
        </div>
        <div className="mb-3">
          <label className="form-label"><h5>Contact No</h5></label>
          <input
            type="text"
            className="form-control"
            placeholder="Enter Society Contact No"
            value={contactno}
            onChange={(e) => setContactno(e.target.value)}
            required
            style={{color: "black"}}
            onBlur={validateContactNo}
          />
          {contactNoError && <div className="text-danger">{contactNoError}</div>}
        </div>
        <button type="submit" className="btn btn-outline-success" data-bs-toggle="modal" data-bs-target="#exampleModal">
          Submit
        </button>
        <div class="modal fade" id="exampleModal" tabindex="-1" aria-labelledby="exampleModalLabel" aria-hidden="true">
          <div class="modal-dialog">
            <div class="modal-content">
              <div class="modal-header">
                <h1 class="modal-title fs-5" id="exampleModalLabel">Society Details</h1>
              </div>
              <div class="modal-body">
                {/* Display the latest society details in the modal body */}
                {latestSocietyDetails && (
                  <div>
                    <p><strong>Society Name:</strong> {latestSocietyDetails.societyname}</p>
                    <p><strong>Registration No:</strong> {latestSocietyDetails.regid}</p>
                    <p><strong>Address:</strong> {latestSocietyDetails.address}</p>
                    <p><strong>President Name:</strong> {latestSocietyDetails.presidentname}</p>
                    <p><strong>President NIC:</strong> {latestSocietyDetails.presidentnic}</p>
                    <p><strong>Contact No:</strong> {latestSocietyDetails.contactno}</p>
                  </div>
                )}
              </div>
              <div class="modal-footer">
                <Link to={'/ssdashboard'} class="btn btn-success" data-bs-dismiss="modal">
                  <i class="fa-solid fa-check"></i>
                </Link>
              </div>
            </div>
          </div>
        </div>
      </form>
    </div>
  );
}
