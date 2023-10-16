import React, { useState, useEffect } from 'react';
import axios from 'axios';
//import './CSS/RequestList.css';
import jsPDF from 'jspdf';
import 'jspdf-autotable';

function ViewFertilizerRequests() {
  const [fertilizerData, setFertilizerData] = useState([]);
  const [searchQuery, setSearchQuery] = useState("");
  //display slip th and td in return


  useEffect(() => {
    axios.get('http://localhost:8070/FertilizerMgt/getRequest')
      .then((response) => {
        setFertilizerData(response.data);
      })
      .catch((error) => {
        console.error('Error fetching data:', error);
      });
  }, []);
  // Filter the requests based on the search query
  const filteredRequests = fertilizerData.filter((fertilizerData) => {
    const name = fertilizerData.name.toLowerCase();
    return name.includes(searchQuery.toLowerCase());
  });




  return (
    <div style={{ paddingRight: '20px', paddingLeft: '20px' }}>

      <table className="tablekv" style={{ borderRadius: '10px' }}>
        <thead>
          <tr>
            <th>NIC</th>
            <th>Name</th>
            <th>Contact No</th>
            <th>Planted Date</th>
            <th>Type</th>
            <th>Amount (kg)</th>
            <th>Total Price (Rs)</th>
          </tr>
        </thead>
        <tbody>
          {filteredRequests.map((item, index) => (
            <tr key={item._id}>
              <td>{item.nic}</td>
              <td>{item.name}</td>
              <td>{item.contactNo}</td>
              <td>{new Date(item.plantedDate).toLocaleDateString()}</td>
              <td>{item.type}</td>
              <td>{item.amount}</td>
              <td>{item.totalPrice}</td>
            </tr>
          ))}
        </tbody>
      </table>
      <br/>
    </div>
  );
}

export default ViewFertilizerRequests;
