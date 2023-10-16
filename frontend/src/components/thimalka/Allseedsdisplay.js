import React, { useState, useEffect } from "react";
import axios from "axios";
import { Link, useNavigate } from "react-router-dom";

export default function AllSeedsdisplay() {
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

  const filteredSeeds = seeds.filter((seed) => {
    const seedType = seed.seedtype.toLowerCase();
    return seedType.includes(searchQuery.toLowerCase());
  });

  return (
    <div className="container">
      <h2 className="my-4">Remaining Stock</h2>
      <div className="table-responsive">
        <table className="table table-bordered">
          <thead className="thead-dark">
            <tr>
              <th scope="col">Seed Type</th>
              <th scope="col">Quantity (kg)</th>
              <th scope="col">Date</th>
              <th scope="col">ROL</th>
            </tr>
          </thead>
          <tbody>
            {filteredSeeds.map((seed) => (
              <tr key={seed._id}>
                <td>{seed.seedtype}</td>
                <td>{seed.quantity}</td>
                <td>{seed.date}</td>
                <td>{seed.rol}</td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
}
