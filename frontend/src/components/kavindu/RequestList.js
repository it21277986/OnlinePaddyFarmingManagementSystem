import React, { useState, useEffect } from 'react';
import axios from 'axios';
import './CSS/RequestList.css';
import jsPDF from 'jspdf';
import 'jspdf-autotable';
import headerImageURL from './images/Logo.png';

function RequestList() {
  const [fertilizerData, setFertilizerData] = useState([]);
  const [searchQuery, setSearchQuery] = useState("");

  const [depositSlipData, setDepositSlipData] = useState([]);

  const fetchDepositSlip = async (requestId) => {
    try {
      const response = await axios.get(`http://localhost:8070/UploadSlip/getSlipByReqId/${requestId}`);
      console.log("response", response.data)
      setDepositSlipData(response.data);
    } catch (error) {
      console.error('Error fetching deposit slip:', error);
    }
  };

  useEffect(() => {
    // Fetch deposit slips when the component mounts
    filteredRequests.map(item => {
      fetchDepositSlip(item._id);
    })

  }, []);

  const renderDepositSlipImage = () => {
    if (depositSlipData && depositSlipData.slip) {
      const imageSrc = `data:${depositSlipData.slip.contentType};base64,${depositSlipData.slip.data.toString('base64')}`;
      return <img src={imageSrc} alt="Deposit Slip" />;
    }
    return '-';
  };


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

  const handleUpdate = (id, isChecked) => {
    axios
      .put(`http://localhost:8070/FertilizerMgt/updateRequest/${id}`, { isChecked })
      .then(() => {

        setFertilizerData((prevData) =>
          prevData.map((item) =>
            item._id === id ? { ...item, isChecked: !item.isChecked } : item
          )
        );
      })
      .catch((error) => {
        console.error('Error updating data:', error);
      });
  };


  const handleDelete = (id) => {
    axios
      .delete(`http://localhost:8070/FertilizerMgt/deleteRequest/${id}`)
      .then(() => {

        if (window.confirm('Do you want to remove the record?')) {
          fetch('http://localhost:8070/FertilizerStock/getStockDetails/' + id, {
            method: "DELETE",

          }).then((res) => {
            alert('Data removed successfully.')
            window.location.reload();
          }).catch((err) => {
            console.log(err.message);
          });
        }

        setFertilizerData((prevData) =>

          prevData.filter((item) => item._id !== id)
        );
      })
      .catch((error) => {
        console.error('Error deleting data:', error);
      });
  };
//report generating
const generatePDF = () => {

  const pdfDoc = new jsPDF();

  const imgWidth = 40;
  const imgHeight = 40;
  pdfDoc.addImage(headerImageURL, 'PNG', 85, 15, imgWidth, imgHeight);

  pdfDoc.setFontSize(18);
  pdfDoc.setTextColor(0, 0, 0);
  pdfDoc.text('Fertilizer Request List', 15, 70);

  const headers = ['NIC', 'Name', 'Contact No', 'Planted Date', 'Type', 'Amount (kg)', 'Total Price (Rs)', 'Checked'];

  const data = filteredRequests.map((item) => [
    item.nic,
    item.name,
    item.contactNo,
    new Date(item.plantedDate).toLocaleDateString(),
    item.type,
    item.amount,
    item.totalPrice,
    item.isChecked ? 'Yes' : 'No',
  ]);

  const autoTableConfig = {
    startY: 80, 
    head: [headers],
  };

  pdfDoc.autoTable({ ...autoTableConfig, body: data });

  // Print the date in the footer
  const printedDate = new Date().toLocaleDateString();
  pdfDoc.setFontSize(12);
  pdfDoc.setTextColor(0, 0, 0);
  pdfDoc.text(`Printed on: ${printedDate}`, 15, pdfDoc.internal.pageSize.height - 15);

  pdfDoc.save('FertilizerRequestList.pdf');
  };


  return (
    <div style={{ paddingRight: '20px', paddingLeft: '20px' }}>
      <div className="col-sm">
        <br />
        <a href="/admin"><button type="submit" className="btn btn-outline-warning rounded-circle"><i class="fa-solid fa-arrow-left"></i></button></a>
        <br /><br /><br /><br />
        <h2 style={{ color: '#005b42' }}>Fertilizer Request List</h2>
        <hr className="border border-success border-2 opacity-50" /><br />
      </div>
      <div>
        <input
          type="text"
          placeholder="Search by Farmer Name"
          value={searchQuery}
          onChange={(e) => setSearchQuery(e.target.value)}
          className="form-control mb-2"
          style={{color: "black"}}
        /><br />
        <button className="btn btn-outline-success" onClick={generatePDF}>Generate Report</button>
      </div>
      <table className="tablek">
        <thead>
          <tr>
            <th>NIC</th>
            <th>Name</th>
            <th>Contact No</th>
            <th>Planted Date</th>
            <th>Type</th>
            <th>Amount (kg)</th>
            <th>Total Price (Rs)</th>
            <th>Deposit Slip</th>
            <th>Checked</th>
            <th>Actions</th>
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
              <td>{renderDepositSlipImage()}</td>
              <td>
                <input
                  type="checkbox"
                  checked={item.isChecked}
                  onChange={() => handleUpdate(item._id, !item.isChecked)}
                />
              </td>
              <td>
                <button className='btn btn-outline-danger' onClick={() => handleDelete(item._id)}>Delete</button>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
      <br />
    </div>
  );
}

export default RequestList;
