import React, { useState } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";

export default function AddMachine() {
  const navigate = useNavigate();

  const [machineOwnerName, setMachineOwnerName] = useState("");
  const [machineType, setMachineType] = useState("");
  const [engineNumber, setEngineNumber] = useState("");
  const [dateOfRegistration, setDateOfRegistration] = useState("");
  const [contactNumber, setContactNumber] = useState("");
  const [eNumError, setENumError] = useState("");
  const [contactNoError, setContactNoError] = useState("");

  // Validation functions
  const validateEngineNumber = () => {
    const isValid = /^[A-Za-z]{2}\d{4}$|^[A-Za-z]{3}\d{4}$/.test(engineNumber);
    setENumError(isValid ? "" : "Invalid Engine Number format (e.g., AB1234 or ABC1234)");
  };

  const validateContactNo = () => {
    const isValid = /^\d{10}$/.test(contactNumber);
    setContactNoError(isValid ? "" : "Invalid Contact No format (e.g., 1234567890)");
  };

  function sendData(e) {
    e.preventDefault();

    // Validate Engine Number and Contact No before sending the request
    validateEngineNumber();
    validateContactNo();

    // Check for validation errors before sending the request
    if (!eNumError && !contactNoError) {
      const newMachine = {
        machineOwnerName,
        machineType,
        engineNumber,
        dateOfRegistration,
        contactNumber,
      };

      axios
        .post("http://localhost:8070/machineReg/addMachine", newMachine)
        .then(() => {
          alert("Machine Added successfully");
          navigate("/ssdashboard"); // Redirect to the AllSociety component
        })
        .catch((err) => {
          alert(err.message); // Display the error message
        });
    }
  }

  return (
    <div>
      <form className="container" onSubmit={sendData}>
        <h2>Register the machine</h2>
        <hr className="border border-success border-2 opacity-50" />

        <div className="mb-3">
          <label htmlFor="machineOwnerName" className="form-label">
            Machine Owner name
          </label>
          <input
            type="text"
            className="form-control"
            id="machineOwnerName"
            placeholder="Enter Name"
            value={machineOwnerName}
            onChange={(e) => {
              setMachineOwnerName(e.target.value);
            }}
            required
          />
        </div>

        <div>
          <label htmlFor="machineType">Type of Machine:</label>
          <select
            id="machineType"
            name="machineType"
            value={machineType}
            onChange={(e) => {
              setMachineType(e.target.value);
            }}
            required
          >
            <option value="">Select Machine Type</option>
            <option value="tractor">Tractor</option>
            <option value="combine">Combine</option>
            <option value="harvester">Harvester</option>
            <option value="seeder">Seeder</option>
          </select>
        </div>

        <div className="mb-3">
          <label className="form-label">Engine number</label>
          <input
            type="text"
            className="form-control"
            id="engineNumber"
            placeholder="Enter engine number"
            value={engineNumber}
            onChange={(e) => {
              setEngineNumber(e.target.value);
            }}
            required
            onBlur={validateEngineNumber}
          />
          {eNumError && <div className="text-danger">{eNumError}</div>}
        </div>

        <div className="mb-3">
          <label htmlFor="registrationDate">Date of Registration:</label>
          <input 
            type="date" 
            id="registrationDate" 
            placeholder="Enter date"
            value={dateOfRegistration}
            onChange={(e) => {
              setDateOfRegistration(e.target.value);
            }}
            required
            max={new Date().toISOString().split("T")[0]}
          />
        </div>

        <div className="mb-3">
          <label className="form-label">Contact No</label>
          <input
            type="text"
            className="form-control"
            id="contactNumber" 
            placeholder="Enter contact Number"
            value={contactNumber}
            onChange={(e) => {
              setContactNumber(e.target.value);
            }}
            required
            onBlur={validateContactNo}
          />
          {contactNoError && <div className="text-danger">{contactNoError}</div>}
          {eNumError && <div className="text-danger">{eNumError}</div>}
          {contactNoError && <div className="text-danger">{contactNoError}</div>}
        </div>

        <button
          type="submit"
          className="btn btn-outline-success"
          style={{
            backgroundColor: "#2B8721",
            color: "#fff",
            padding: "10px 20px",
            border: "none",
            borderRadius: "5px",
            cursor: "pointer",
            fontSize: "16px",
            transition: "background-color 0.3s ease",
          }}
        >
          Submit
        </button>
      </form>

    </div>
  );
}