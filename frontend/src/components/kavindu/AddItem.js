import { Link, useNavigate } from 'react-router-dom'
import React, { useEffect, useState } from 'react';
import axios from "axios";

const AddItem = () => {
  const [fertilizerName, setFertilizerName] = useState("");
  const [fertilizerQuantity, setFertilizerQuantity] = useState("");
  const [unitPrice, setUnitPrice] = useState("");
  const [latestFertilizerDetails, setLatestFertilizerDetails] = useState(null);

  const navigate = useNavigate();

  const sendData = (e) => {
    e.preventDefault();

    const newFertilizer = {
      fertilizerName,
      fertilizerQuantity,
      unitPrice,
    };

    axios.post("http://localhost:8070/FertilizerStock/addStockDetails", newFertilizer)
      .then(() => {
        setLatestFertilizerDetails(newFertilizer); 
        setFertilizerName(""); 
        setFertilizerQuantity("");
        setUnitPrice("");
        document.getElementById("exampleModal").style.display = "block"; // Show the modal
      })
      .catch((err) => {
        alert(err);
      });
  };

  const handleDoneClick = () => {
    document.getElementById("exampleModal").style.display = "none"; // Hide the modal
    navigate(-1);
  };

  return (
    <div>
      <form className="container" onSubmit={sendData}>
        <br />
        <div className="row">
          <div className="col-sm">
            <br /><br /><br /><br />
            <h2 style={{color: '#005b42' }}>Add new Fertilizer</h2>
            <hr className="border border-success border-2 opacity-50" />
          </div>
        </div>
        <div className="mb-3">
          <label className="form-label"><h5>Fertilizer Name</h5></label>
          <input
            type="text"
            className="form-control"
            placeholder="Enter Fertilizer Name"
            value={fertilizerName}
            onChange={(e) => setFertilizerName(e.target.value)}
            required
            style={{color: "black"}}
          />
        </div>
        <div className="mb-3">
          <label className="form-label"><h5>Quantity in kg</h5></label>
          <input
            type="text"
            className="form-control"
            placeholder="Enter Fertilizer Quantity"
            value={fertilizerQuantity}
            onChange={(e) => setFertilizerQuantity(e.target.value)}
            required
            style={{color: "black"}}
          />
        </div>
        <div className="mb-3">
          <label className="form-label"><h5>Unit Price (Rs)</h5></label>
          <input
            type="text"
            className="form-control"
            placeholder="Enter unit price"
            value={unitPrice}
            onChange={(e) => setUnitPrice(e.target.value)}
            required
            style={{color: "black"}}
          />
        </div>

        <button type="submit" className="btn btn-success" data-bs-toggle="modal" data-bs-target="#exampleModal" >
          Submit
        </button>
        <div className="modal fade" id="exampleModal" tabIndex="-1" aria-labelledby="exampleModalLabel" aria-hidden="true">
          <div className="modal-dialog">
            <div className="modal-content">
              <div className="modal-header">
                <h1 className="modal-title fs-5" id="exampleModalLabel">Add new Fertilizer</h1>
              </div>
              <div className="modal-body">
                {latestFertilizerDetails && (
                  <div>
                    <p><strong>Fertilizer Name:</strong> {latestFertilizerDetails.fertilizerName}</p>
                    <p><strong>Fertilizer Quantity:</strong> {latestFertilizerDetails.fertilizerQuantity}</p>
                    <p><strong>Unit Price:</strong> {latestFertilizerDetails.unitPrice}</p>
                  </div>
                )}
              </div>
              <div className="modal-footer">
                <Link to={'/admin'} className="btn btn-success" aria-label="Close" data-bs-dismiss="modal" >
                  <i className="fa-solid fa-check"></i>ok
                </Link>
              </div>
            </div>
          </div>
        </div>
      </form>
    </div>
  );
};


export default AddItem;
