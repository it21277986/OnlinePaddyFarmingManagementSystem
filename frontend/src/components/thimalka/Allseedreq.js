import React, { useState, useEffect } from "react";
import axios from "axios";
import jsPDF from 'jspdf';
import 'jspdf-autotable';
import headerImageURL from '../thimalka/images/Logo.png';

export default function Allseedreq() {
  const [requests, setRequests] = useState([]);
  const [searchQuery, setSearchQuery] = useState("");

  useEffect(() => {
    function getRequests() {
      axios.get("http://localhost:8070/seedreq/Seedreq")
        .then((res) => {
          setRequests(res.data);
        })
        .catch((err) => {
          alert(err.message);
        });
    }
    getRequests();
  }, []);

  // Function to handle the delete button click
  const handleDeleteClick = (id) => {
    axios.delete(`http://localhost:8070/seedreq/deleteSeedreq/${id}`)
      .then(() => {
        // Remove the deleted request from the state
        setRequests(requests.filter(request => request._id !== id));
      })
      .catch((err) => {
        alert(err.message);
      });
  };

  // Generating PDF
  const generatePDF = () => {
    const pdfDoc = new jsPDF();

    // Add the header image
    const imgWidth = 40;
    const imgHeight = 40;
    pdfDoc.addImage(headerImageURL, 'PNG', 85, 15, imgWidth, imgHeight);

    // Add a title to the PDF
    pdfDoc.text('Seeds Request List', 15, 70);

    // Headers
    const headers = ['Farmer ID', 'Requested Seed Type', 'Field Size', 'Requested Amount (KG)', 'Price(RS)', 'Date'];

    const data = requests.map((Seedreq) => [
      Seedreq.farmerid,
      Seedreq.seedtype,
      Seedreq.feildsize,
      Seedreq.reqamount,
      Seedreq.Price,
      new Date(Seedreq.date).toLocaleDateString() // Format date to display only the date
    ]);

    // Configurations
    const autoTableConfig = {
      startY: 80, // Adjust the starting point below the image and title
      head: [headers],
    };

    pdfDoc.autoTable({ ...autoTableConfig, body: data });

     // Print the date in the footer
     const printedDate = new Date().toLocaleDateString();
     pdfDoc.setFontSize(12);
     pdfDoc.setTextColor(0, 0, 0);
     pdfDoc.text(`Printed on: ${printedDate}`, 15, pdfDoc.internal.pageSize.height - 15);

    pdfDoc.save('SeedsRequestList.pdf');
  };

  // Filter the requests based on the search query
  const filteredRequests = requests.filter((request) => {
    const farmerId = request.farmerid.toLowerCase();
    return farmerId.includes(searchQuery.toLowerCase());
  });

  return (
    <div className="container">
      <div className="rowtt">
        <div className="col-smtt"><br></br>
          <h3>All Seeds Requests</h3><br />
        </div>
      </div>
      <div>
        <input
          type="text"
          placeholder="Search by Farmer ID"
          value={searchQuery}
          onChange={(e) => setSearchQuery(e.target.value)}
          className="form-control mb-2"
          style={{color: "black"}}
        /><br />
        <button className="btn btn-success" onClick={generatePDF}>Generate PDF Report</button><br /><br />
      </div>
      {filteredRequests.length === 0 ? (
        <div className="alert alert-warning">
          No Results Found
        </div>
      ) : (
        <table className="table">
          <thead>
            <tr className="table-success">
              <th scope="col" style={{ fontSize: '18px' }}>Farmer Id</th>
              <th scope="col" style={{ fontSize: '18px' }}>Requested Seed Type</th>
              <th scope="col" style={{ fontSize: '18px' }}>Field Size (AR)</th>
              <th scope="col" style={{ fontSize: '18px' }}>Requested Amount (KG)</th>
              <th scope="col" style={{ fontSize: '18px' }}>Price (RS)</th>
              <th scope="col" style={{ fontSize: '18px' }}>Date</th>
              <th scope="col" style={{ fontSize: '18px' }}>Action</th>
            </tr>
          </thead>
          <tbody>
            {filteredRequests.map((Seedreq) => (
              <tr key={Seedreq._id}>
                <td style={{ fontSize: '18px' }}>{Seedreq.farmerid}</td>
                <td style={{ fontSize: '18px' }}>{Seedreq.seedtype}</td>
                <td style={{ fontSize: '18px' }}>{Seedreq.feildsize}</td>
                <td style={{ fontSize: '18px' }}>{Seedreq.reqamount}</td>
                <td style={{ fontSize: '18px' }}>{Seedreq.Price}</td>
                <td style={{ fontSize: '18px' }}>{new Date(Seedreq.date).toLocaleDateString()}</td>
                <td className="d-flex justify-content-between">
                  <button
                    onClick={() => handleDeleteClick(Seedreq._id)}
                    className="btn btn-danger">
                    <i className="fas fa-trash" /> Reject
                  </button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      )}
    </div>
  );
}
