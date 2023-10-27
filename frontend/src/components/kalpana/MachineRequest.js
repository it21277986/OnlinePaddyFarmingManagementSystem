import React, { useState } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";

export default function AddRequest() {
  const navigate = useNavigate();

  const [farmerId, setFarmerId] = useState("");
  const [farmerName, setFarmerName] = useState("");
  const [machineName, setMachineName] = useState("");
  const [noOfDays, setNoOfDays] = useState("");
  const [payableAmount, setPayableAmount] = useState(""); // New state variable for the amount
  const [dateOfRequest, setDateOfRequest] = useState("");

  function calculateAmount() {
    const calculatedAmount = 1500 * noOfDays;
    setPayableAmount(calculatedAmount);
  }

  function sendData(e) {
    e.preventDefault();

    const newRequest = {
      farmerId,
      farmerName,
      machineName,
      noOfDays,
      payableAmount,
      dateOfRequest,
    };

    axios
      .post("http://localhost:8070/machineReq/addMachineReq", newRequest)
      .then(() => {
        alert("Request Added successfully");
        navigate("/ssdashboard"); // Redirect to the AllSociety component
      })
      .catch((err) => {
        alert(err.message); // Display the error message
      });
  }

  return (
    <div>
      <form className="container"
      style={{
          display: "flex",
          flexDirection: "column",
          alignItems: "center",
          justifyContent: "center",
          height: "100vh",
          border: "1px solid #ccc", // Add a border
          padding: "20px",
          borderRadius: "10px",
          boxShadow: "0 0 10px rgba(0, 0, 0, 0.1)",
        }}
      onSubmit={sendData}>
        <h2>Machine requests</h2>
        <hr className="border border-success border-2 opacity-50" />
        <br></br>


        <div className="mb-3">
          <label htmlFor="farmerId" className="form-label">
            Farmer ID
          </label>
          <input
            type="text"
            className="form-control"
            id="farmerId"
            placeholder="Enter ID"
            value={farmerId}
            onChange={(e) => {
              setFarmerId(e.target.value);
            }}
            required
          />
        </div>
            <br></br>


        <div className="mb-3">
          <label className="form-label">Farmer Name </label>
          <input
            type="text"
            className="form-control"
            id="farmerName"
            placeholder="Enter name"
            value={farmerName}
            onChange={(e) => {
              setFarmerName(e.target.value);
            }}
            required
          />
        </div>
            <br></br>


        <div>
          <label htmlFor="machineName">Machine name:</label>
          <select
            id="machineName"
            name="machineName"
            value={machineName}
            onChange={(e) => {
              setMachineName(e.target.value);
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
        <br></br>

        <div className="mb-3">
          <label htmlFor="noOfDays">Number of Days:</label>
          <input
            type="number"
            id="noOfDays"
            placeholder="Insert the number of days"
            value={noOfDays}
            onChange={(e) => {
              setNoOfDays(e.target.value);
            }}
            required
          />
        </div>
        <br></br>

        {/* Display the calculated amount */}
        <div className="mb-3">
          <label htmlFor="amount">Amount:</label>
          <input
            type="text"
            id="amount"
            value={payableAmount}
            readOnly
          />
        </div>
            <br></br>

        <div className="mb-3">
          <label htmlFor="requestDate">Date of Registration:</label>
          <input
            type="date"
            id="registrationDate"
            placeholder="Enter date"
            value={dateOfRequest}
            onChange={(e) => {
              setDateOfRequest(e.target.value);
            }}
            required
            max={new Date().toISOString().split("T")[0]}
          />
        </div>
            <br></br>
        <button
  type="button"
  onClick={calculateAmount}
  className="btn btn-outline-secondary"
  style={{
    backgroundColor: "#2B8721",
    color: "#fff",
    padding: "10px 20px",
    border: "none",
    borderRadius: "5px",
    cursor: "pointer",
    fontSize: "16px",
    transition: "background-color 0.3s ease",
    marginRight: "10px", // Add margin-right for spacing
  }}
>
  Calculate Amount
</button>
<br></br>
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
