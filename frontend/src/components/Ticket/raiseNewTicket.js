import React, { useState } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";

export default function RaiseNewTicket() {
  const navigate = useNavigate();

  const [farmerName, setFarmerName] = useState("");
  const [NIC, setNIC] = useState("");
  const [contactNo, setContactNo] = useState("");
  const [fault, setFault] = useState("");
  const [faultSection, setFaultSection] = useState("");
  const [NICError, setNICError] = useState("");
  const [contactNoError, setContactNoError] = useState("");

  // Validation functions
  const validateNIC = () => {
    if (!NIC.match(/^\d{9}[vVxX]|\d{12}$/)) {
      setNICError("Invalid NIC format (e.g., 123456789V or 123456789000)");
    } else {
      setNICError("");
    }
  };

  const validateContactNo = () => {
    if (!contactNo.match(/^\d{10}$/)) {
      setContactNoError("Invalid Contact No format (e.g., 1234567890)");
    } else {
      setContactNoError("");
    }
  };

  function sendData(e) {
    e.preventDefault();

    // Validate NIC and Contact No before sending the request
    validateNIC();
    validateContactNo();

    // Check for validation errors before sending the request
    if (!NICError && !contactNoError) {
      const newTicket = {
        farmerName,
        NIC,
        contactNo,
        fault,
        faultSection
      };

      axios
        .post("http://localhost:8070/ticket/addticket", newTicket)
        .then(() => {
          alert("Ticket Raised Successfully");
          navigate("../AllCus"); // Redirect to the AllSociety component

        })
        .catch((err) => {
          alert(err.message); // Display the error message
        });
    }
  }

  return (
    <div>
      <form className="container" onSubmit={sendData}>
        <br />
        <div className="row">
          <div className="col-sm">
            <br /><br /><br /><br /><br /><br /><br /><br /><br />
            <h2>Raise New Ticket</h2>
            <hr className="border border-success border-2 opacity-50" />
          </div>
          <div className="col-sm">
            <img className="img-fluid px-3 px-sm-4 mt-3 mb-4 a6"
              src="imgLakmal/undraw_conference_re_2yld.svg" alt="..." />
          </div>
        </div>
        <div className="mb-3">
          <label className="form-label"><h5>Farmer Name</h5></label>
          <input
            type="text"
            className="form-control"
            id="farmerName"
            placeholder="Enter Farmer Name"
            value={farmerName}
            style={{color: "black"}}
            onChange={(e) => {
              setFarmerName(e.target.value);
            }}
            required
          />
        </div>
        <div className="mb-3">
          <label className="form-label"><h5>NIC</h5></label>
          <input
            type="text"
            className="form-control"
            id="NIC"
            placeholder="Enter NIC"
            value={NIC}
            style={{color: "black"}}
            onChange={(e) => {
              setNIC(e.target.value);
            }}
            required
            onBlur={validateNIC}
          />
          {NICError && <div className="text-danger">{NICError}</div>}
        </div>
        <div className="mb-3">
          <label className="form-label"><h5>Contact No</h5></label>
          <input
            type="text"
            className="form-control"
            id="contactNo"
            placeholder="Enter contact Number"
            value={contactNo}
            style={{color: "black"}}
            onChange={(e) => {
              setContactNo(e.target.value);
            }}
            required
            onBlur={validateContactNo}
          />
          {contactNoError && <div className="text-danger">{contactNoError}</div>}
        </div>
        <div className="mb-3">
          <label className="form-label"><h5>Fault</h5></label>
          <input
            type="text"
            className="form-control"
            id="fault"
            placeholder="Enter Fault"
            value={fault}
            style={{color: "black"}}
            onChange={(e) => {
              setFault(e.target.value);
            }}
            required
          />
        </div>
        <div className="mb-3">
          <label className="form-label"><h5>Fault Section</h5></label>
          <input
            type="text"
            className="form-control"
            id="faultSection"
            placeholder="Enter Fault Section"
            value={faultSection}
            style={{color: "black"}}
            onChange={(e) => {
              setFaultSection(e.target.value);
            }}
            required
          />
        </div>
        <button type="submit" className="btn btn-success">
          Submit
        </button>
      </form>
    </div>
  );
}
