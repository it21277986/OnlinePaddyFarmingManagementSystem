import React, { useState, useEffect } from "react";
import axios from "axios";
import { useParams, useNavigate } from "react-router-dom";
import { Link } from "react-router-dom";

function UpdateSeed() {
  const { id } = useParams();
  const navigate = useNavigate();

  const [seedData, setSeedData] = useState({
    seedtype: "",
    quantity: "",
    date: "",
    rol: "",
  });

  useEffect(() => {
    axios.get(`http://localhost:8070/seed/getSeed/${id}`)
      .then((res) => {
        setSeedData(res.data.seed);
      })
      .catch((err) => {
        alert(err.message);
      });
  }, [id]);

  const handleUpdate = () => {
    axios.put(`http://localhost:8070/seed/updateSeed/${id}`, seedData)
      .then(() => {
        alert("Seed information updated successfully");
        navigate('/allseeds');
      })
      .catch((err) => {
        alert(err.message);
      });
  };

  return (
    <div className="container">
      <br />
      <br />
      <br />
      <h2>Update Seed Stock Details</h2>
      <br />
      <form>
        <div className="form-group">
          <label>Seed Type</label>
          <input
            type="text"
            className="form-control"
            value={seedData.seedtype}
            onChange={(e) => setSeedData({ ...seedData, seedtype: e.target.value })}
          />
        </div>
        <div className="form-group">
          <label>Quantity</label>
          <input
            type="text"
            className="form-control"
            value={seedData.quantity}
            onChange={(e) => setSeedData({ ...seedData, quantity: e.target.value })}
          />
        </div>
        <div className="form-group">
          <label>Date</label>
          <input
            type="date"
            className="form-control"
            value={seedData.date}
            onChange={(e) => setSeedData({ ...seedData, date: e.target.value })}
          />
        </div>
        <div className="form-group">
          <label>ROL</label>
          <input
            type="text"
            className="form-control"
            value={seedData.rol}
            onChange={(e) => setSeedData({ ...seedData, rol: e.target.value })}
          />
        </div>
        <br />
        <button type="button" className="btn btn-success" onClick={handleUpdate}>
          Update Seed Information
        </button>
      </form>
    </div>
  );
}

export default UpdateSeed;
