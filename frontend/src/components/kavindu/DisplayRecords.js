import React, { useState, useEffect } from "react";
import axios from "axios";
import jsPDF from 'jspdf';
import 'jspdf-autotable';
import headerImageURL from './images/Logo.png';

const DisplayRecords = () => {
  const [records, setRecords] = useState([]);

  useEffect(() => {
    axios.get("http://localhost:8070/UpdateRecord/getUpdateRecords")
      .then((res) => {
        setRecords(res.data);
      })
      .catch((err) => {
        console.error(err.message);
      });
  }, []);

  //generate the PDF report
  const generatePDF = () => {
    const pdfDoc = new jsPDF();

    const imgWidth = 40;
    const imgHeight = 40;
    pdfDoc.addImage(headerImageURL, 'PNG', 85, 15, imgWidth, imgHeight);

    pdfDoc.setFontSize(18);
    pdfDoc.setTextColor(0, 0, 0);
    pdfDoc.text('Fertilizer Update Record', 15, 70);

    // Headers
    const headers = ['Fertilizer Type', 'Fertilizer Amount', 'Unit Price', 'Updated At'];

    const data = records.map((record) => [
      record.updatedFields.fertilizerName,
      record.updatedFields.fertilizerQuantity,
      record.updatedFields.unitPrice,
      new Date(record.updatedAt).toLocaleString()
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

    // Save the PDF
    pdfDoc.save('FertilizerUpdateRecord.pdf');
  };

  return (
    <div className="container">
      <br />
      <a href="/admin"><button type="submit" className="btn btn-outline-warning rounded-circle"><i class="fa-solid fa-arrow-left"></i></button></a>
      <br /><br /><br />
      <h2 style={{ color: '#005b42' }}>Updated Records</h2>
      <hr className="border border-success border-2 opacity-50" /><br />
      <button className="btn btn-outline-success" onClick={generatePDF}>Generate Report</button>
      <table className="tablek">
        <thead>
          <tr>
            <th>Fertilizer Name</th>
            <th>Fertilizer Amount in kg</th>
            <th>Unit Price (Rs)</th>
            <th>Updated At</th>
          </tr>
        </thead>
        <tbody>
          {records.map((record) => (
            <tr key={record._id}>
              <td style={{ fontSize: '16px' }}>{record.updatedFields.fertilizerName}</td>
              <td style={{ fontSize: '16px' }}>{record.updatedFields.fertilizerQuantity}</td>
              <td style={{ fontSize: '16px' }}>{record.updatedFields.unitPrice}</td>
              <td style={{ fontSize: '16px' }}>{new Date(record.updatedAt).toLocaleString()}</td>
            </tr>
          ))}
        </tbody>
      </table>
      <br/><br/>
    </div>
  );
};

export default DisplayRecords;
