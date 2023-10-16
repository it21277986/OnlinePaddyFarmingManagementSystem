import React, { useState, useEffect } from "react";
import axios from "axios";
import { Link, useNavigate } from "react-router-dom";

export default function AllSeeds() {
  const [seeds, setSeeds] = useState([]);
  const [searchQuery, setSearchQuery] = useState("");
  const navigate = useNavigate();

  useEffect(() => {
    // Fetch seeds when the component mounts
    axios.get("http://localhost:8070/seed/Seed")
      .then((res) => {
        setSeeds(res.data);
      })
      .catch((err) => {
        alert(err.message);
      });
  }, []);

  const handleDeleteClick = (id) => {
    axios.delete(`http://localhost:8070/seed/deleteSeed/${id}`)
      .then(() => {
        // Remove the deleted seed from the state
        setSeeds(seeds.filter(seed => seed._id !== id));
      })
      .catch((err) => {
        alert(err.message);
      });
  };
  //search 
  const filteredSeeds = seeds.filter((seed) => {
    const seedType = seed.seedtype.toLowerCase();
    return seedType.includes(searchQuery.toLowerCase());
  });

  return (
    <div className="container">
      <h2 className="my-4">Seeds Stock</h2>
      <div className="table-responsive">
        <table className="table table-bordered">
          <thead className="thead-dark">
            <tr>
              <th scope="col" style={{ fontSize: '16px' , color:'white'}}>Seed Type</th>
              <th scope="col" style={{ fontSize: '16px' , color:'white'}}>Quantity (kg)</th>
              <th scope="col" style={{ fontSize: '16px' , color:'white'}}>Date</th>
              <th scope="col" style={{ fontSize: '16px' , color:'white'}}>ROL</th>
              <th scope="col" style={{ fontSize: '16px' , color:'white'}}>Action</th>
            </tr>
          </thead>
          <tbody>
            {filteredSeeds.map((seed) => (
              <tr key={seed._id}>
                <td style={{ fontSize: '20px' }}>{seed.seedtype}</td>
                <td style={{ fontSize: '20px' }}>{seed.quantity}</td>
                <td style={{ fontSize: '20px' }}>{seed.date}</td>
                <td style={{ fontSize: '20px' }}>{seed.rol}</td>
                <td className="d-flex justify-content-center align-items-center">
                  <div className="btn-group" role="group">
                      <button
                        onClick={() => handleDeleteClick(seed._id)}
                        className="btn btn-danger">
                        <i className="fas fa-trash" /> Delete
                      </button>
                    <Link to={`/updateseed/${seed._id}`}>
                    <button
                        className="btn btn-success">
                        <i className="fas fa-trash" /> Update
                      </button>
                    </Link>
                  </div>
                </td>
              </tr>
            ))}
            <br /><br />
            <Link to={'/addseed'} className="btn btn-success">
              <i className="fas fa-pen" /> ADD to the stock
            </Link>
          </tbody>
        </table>
      </div>
    </div>
  );
}
