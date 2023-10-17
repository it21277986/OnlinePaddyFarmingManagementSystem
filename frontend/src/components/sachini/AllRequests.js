import React, { useEffect, useState } from 'react';
import axios from 'axios';
import { useParams, Link } from 'react-router-dom';
import './styles/AllRequest.css';
import jsPDF from 'jspdf';
import 'jspdf-autotable'; 
import { parseISO, isSameDay } from 'date-fns';
import logoImage from "./images/siteLogo.jpg";
import QRCode from 'qrcode.react';
import HeaderMain from "./HeaderAllCus";


function AllRequests() {

  const siteName = "Green Feild Pro";

  const { nic } = useParams();
  const [mergedData, setMergedData] = useState([]);
  const [loading, setLoading] = useState(true);
  const [searchDate, setSearchDate] = useState('');
  const [highlightedRows, setHighlightedRows] = useState([]);
  const [noResultsMessage, setNoResultsMessage] = useState('');
  const [scannedQRData, setScannedQRData] = useState(null);

  useEffect(() => {
    // Fetch data from both tables and merge them
    axios
      .get(`http://localhost:8070/customer/checkNIC/${nic}`)
      .then((response) => {
        console.log('API Response:', response.data);
        setMergedData(response.data);
        setLoading(false);
      })
      .catch((error) => {
        console.error('Error fetching data', error);
        setLoading(false);
      });
  }, [nic]);

  

/*

  const filterRequestsByDate = () => {
    const matchingRows = mergedData.filter((data) => {
      if (!data.requestedDate) {
        // Handle the case where requestedDate is undefined
        return false;
      }
  
      const searchDateObj = new Date(searchDate);
      const requestedDateParts = data.requestedDate.split('/'); // Replace '/' with your date separator
  
      if (requestedDateParts.length !== 3) {
        // Handle invalid date format, e.g., if it doesn't split into three parts
        return false;
      }
  
      const requestedDateObj = new Date(
        Number(requestedDateParts[2]), // Year
        Number(requestedDateParts[1]) - 1, // Month (subtract 1 since months are 0-indexed)
        Number(requestedDateParts[0]) // Day
      );
  
      // Debug log to check dates
      console.log('Search Date:', searchDateObj);
      console.log('Requested Date:', requestedDateObj);
  
      return (
        searchDateObj.getDate() === requestedDateObj.getDate() &&
        searchDateObj.getMonth() === requestedDateObj.getMonth() &&
        searchDateObj.getFullYear() === requestedDateObj.getFullYear()
      );
    });
  
    // Debug log to check matching rows
    console.log('Matching Rows:', matchingRows);
  
    if (matchingRows.length === 0) {
      setHighlightedRows([]);
      setNoResultsMessage('No results');
    } else {
      setHighlightedRows(matchingRows);
      setNoResultsMessage('');
    }
  };
  */
  

  const filterRequestsByDate = () => {
    const matchingRows = mergedData.filter((data) => {
      if (!data.requestedDate) {
        return false;
      }
  
      const searchDateObj = new Date(searchDate);
      const requestedDateParts = data.requestedDate.split('/');
  
      if (requestedDateParts.length !== 3) {
        return false;
      }
  
      const requestedDateObj = new Date(
        Number(requestedDateParts[2]),
        Number(requestedDateParts[1]) - 1,
        Number(requestedDateParts[0])
      );
  
      console.log('Search Date:', searchDateObj);
      console.log('Requested Date:', requestedDateObj);
  
      const isMatching = (
        searchDateObj.getDate() === requestedDateObj.getDate() &&
        searchDateObj.getMonth() === requestedDateObj.getMonth() &&
        searchDateObj.getFullYear() === requestedDateObj.getFullYear()
      );
  
      console.log('Is Matching:', isMatching);
  
      return isMatching;
    });
  
    if (matchingRows.length === 0) {
      setHighlightedRows([]);
      setNoResultsMessage('No results');
    } else {
      setHighlightedRows(matchingRows);
      setNoResultsMessage('');
    }
  };
  
  

  
  
  
/*
  const downloadRequestFormAsPDF = () => {
    if (!Array.isArray(mergedData)) {
      return;
    }
    // Create a new jsPDF instance
    const doc = new jsPDF();
  
    // Add your logo without resizing it
    doc.addImage(logoImage, 'PNG', 10, 10, 40, 40); // Adjust the coordinates and dimensions as needed
  
    // Calculate the X-coordinate for the site name to be positioned to the right of the logo
    const logoWidth = 40; // Adjust the width of the logo if needed
    const siteNameX = 10 + logoWidth + 10; // Adjust the spacing as needed
  
    // Calculate the Y-coordinate for the site name to be at the same vertical position as the logo
    const siteNameY = 10 + 40 / 2; // Assuming the logo is centered vertically
  
    // Add the site name text to the PDF
    doc.setFontSize(16); // Adjust the font size as needed
    doc.setFont('Bowlby One', 'bold'); // Set the font to 'helvetica' and style to 'bold'
    doc.text(siteName, siteNameX, siteNameY);
  
    doc.setFontSize(12); // Reset to default font size
    doc.setFont('helvetica', 'normal'); // Reset to default font style
  
    // Define the text to be centered
    const text = 'MY REQUESTS';
  
    // Calculate the width of the text
    const textWidth = doc.getStringUnitWidth(text) * doc.internal.getFontSize() / doc.internal.scaleFactor;
  
    // Calculate the X-coordinate to center the text
    const centerX = (doc.internal.pageSize.getWidth() - textWidth) / 2;
  
    // Add the centered text to the PDF below the logo and site name
    doc.text(text, centerX, siteNameY + 30); // Adjust the Y-coordinate for spacing
  
    // Define the table headers
    const headers = [['Request ID', 'Item Name', 'Req Date', 'Quantity', 'Price', 'Status']];
  
    // Extract the data from mergedData
    const data = mergedData.map((row) => [
      row.requestId || row._id || row._id || row._id,
      row.productName || row.ricetype || row.type || row.seedtype || row.machineName,
      row.requestedDate || row.date || row.plantedDate || row.date || row.dateOfRequest,
      row.quantity || row.cultivatedamount || row.amount || row.reqamount || '1',
      row.totalPrice || row.totalPrice || row.payableAmount || row.Price || '-',
      row.status || row.status || row.isChecked ? 'Checked' : 'Pending' || row.status,
    ]);
  
    
    // Create a table with the headers and data
    doc.autoTable({
      head: headers,
      body: data,
      startY: siteNameY + 40, // Adjust the starting Y position as needed
    });
  
    // Save the PDF with a specific name
    doc.save('request_form.pdf');
  };
  

    const downloadRowDataAsPDF = (rowData) => {
  // Create a new jsPDF instance
  const doc = new jsPDF();

  doc.addImage(logoImage, 'PNG', 10, 10, 40, 40); // Adjust the coordinates and dimensions as needed
  
  // Calculate the X-coordinate for the site name to be positioned to the right of the logo
  const logoWidth = 40; // Adjust the width of the logo if needed
  const siteNameX = 10 + logoWidth + 10; // Adjust the spacing as needed

  // Calculate the Y-coordinate for the site name to be at the same vertical position as the logo
  const siteNameY = 10 + 40 / 2; // Assuming the logo is centered vertically

  // Add the site name text to the PDF
  doc.setFontSize(16); // Adjust the font size as needed
  doc.setFont('helvetica', 'bold'); // Set the font to 'helvetica' and style to 'bold'
  doc.text(siteName, siteNameX, siteNameY);

  doc.setFontSize(12); // Reset to default font size
  doc.setFont('helvetica', 'normal'); // Reset to default font style

  // Define the text to be centered
  const text = 'MY REQUESTS';

  // Calculate the width of the text
  const textWidth = doc.getStringUnitWidth(text) * doc.internal.getFontSize() / doc.internal.scaleFactor;

  // Calculate the X-coordinate to center the text
  const centerX = (doc.internal.pageSize.getWidth() - textWidth) / 2;

  // Add the centered text to the PDF below the logo and site name
  doc.text(text, centerX, siteNameY + 30); // Adjust the Y-coordinate for spacing

  // Define fields to exclude
  const excludedFields = ['_id', '__v'];

  Object.keys(rowData).forEach((key, index) => {
    // Check if the field is not in the excludedFields array
    if (!excludedFields.includes(key)) {
      const yPos = 60 + index * 10;
      doc.text(`${key}: ${rowData[key]}`, 10, yPos);
    }
  });

  // Save the PDF with a specific name
  doc.save('row_data.pdf');
};

  */

const downloadRequestFormAsPDF = () => {
  if (!Array.isArray(mergedData)) {
    return;
  }
  // Create a new jsPDF instance
  const doc = new jsPDF();

  // Add your logo without resizing it
  doc.addImage(logoImage, 'PNG', 10, 10, 40, 40); // Adjust the coordinates and dimensions as needed

  // Calculate the X-coordinate for the site name to be positioned to the right of the logo
  const logoWidth = 40; // Adjust the width of the logo if needed
  const siteNameX = 10 + logoWidth + 10; // Adjust the spacing as needed

  // Calculate the Y-coordinate for the site name to be at the same vertical position as the logo
  const siteNameY = 10 + 40 / 2; // Assuming the logo is centered vertically

  // Add the site name text to the PDF
  doc.setFontSize(20); // Adjust the font size as needed
  doc.setFont('Bowlby One', 'bold'); // Set the font to 'helvetica' and style to 'bold'
  doc.text(siteName, siteNameX, siteNameY);

  doc.setFontSize(16); // Reset to default font size
  doc.setFont('helvetica', 'normal'); // Reset to default font style

  // Define the text to be centered
  const text = 'MY REQUESTS';

  // Calculate the width of the text
  const textWidth = doc.getStringUnitWidth(text) * doc.internal.getFontSize() / doc.internal.scaleFactor;

  // Calculate the X-coordinate to center the text
  const centerX = (doc.internal.pageSize.getWidth() - textWidth) / 2;

  // Add the centered text to the PDF below the logo and site name
  doc.text(text, centerX, siteNameY + 30); // Adjust the Y-coordinate for spacing

  // Define the table headers
  const headers = [['Item Name', 'Req Date', 'Quantity', 'Price (Rs.)', 'Status']];

  // Extract the data from mergedData
  const data = mergedData.map((row) => [
    /*row.requestId || row._id || row._id || row._id,*/
    row.productName || row.ricetype || row.type || row.seedtype || row.machineName,
    {/*row.requestedDate || row.date || row.plantedDate || row.date || row.dateOfRequest,*/}

    (row.requestedDate
      ? new Date(row.requestedDate).toLocaleDateString().split('T')[0] // Extract only the date part
      : row.date
      ? new Date(row.date).toLocaleDateString().split('T')[0]
      : row.plantedDate
      ? new Date(row.plantedDate).toLocaleDateString().split('T')[0]
      : row.dateOfRequest
      ? new Date(row.dateOfRequest).toLocaleDateString().split('T')[0]
      : '-'
    ),

    row.quantity || row.cultivatedamount || row.amount || row.reqamount || '1',
    row.totalPrice || row.totalPrice || row.payableAmount || row.Price || '-',
    row.status || row.status || row.isChecked ? 'Checked' : 'Pending' || row.status,
  ]);

  
  // Create a table with the headers and data
  doc.autoTable({
    head: headers,
    body: data,
    startY: siteNameY + 40, // Adjust the starting Y position as needed
  });

  const name = 'Sarathchandra H.M.S.D.'; // Replace with the actual name
  const department = 'Agricultural Department'; 
  const no = 'IT21213458';

  doc.setFontSize(12);
  doc.text(`${name}`, 20, doc.internal.pageSize.getHeight() - 50);
  doc.text(`${no}`, 20, doc.internal.pageSize.getHeight() - 40);
  doc.text(`${department}`, 20, doc.internal.pageSize.getHeight() - 30);

  // Get the current date
  const currentDate = new Date();
  const formattedDate = currentDate.toLocaleDateString(); 

  doc.text(`Date: ${formattedDate}`, 20, doc.internal.pageSize.getHeight() - 20);

    
  // Save the PDF with a specific name
  doc.save('request_form.pdf');
};








  const downloadRowDataAsPDF = (rowData) => {
// Create a new jsPDF instance
const doc = new jsPDF();

doc.addImage(logoImage, 'PNG', 10, 10, 40, 40); // Adjust the coordinates and dimensions as needed

// Calculate the X-coordinate for the site name to be positioned to the right of the logo
const logoWidth = 40; // Adjust the width of the logo if needed
const siteNameX = 10 + logoWidth + 10; // Adjust the spacing as needed

// Calculate the Y-coordinate for the site name to be at the same vertical position as the logo
const siteNameY = 10 + 40 / 2; // Assuming the logo is centered vertically

// Add the site name text to the PDF
doc.setFontSize(20); // Adjust the font size as needed
doc.setFont('helvetica', 'bold'); // Set the font to 'helvetica' and style to 'bold'
doc.text(siteName, siteNameX, siteNameY);

doc.setFontSize(16); // Reset to default font size
doc.setFont('helvetica', 'normal'); // Reset to default font style

// Define the text to be centered
const text = 'MY REQUESTS';

// Calculate the width of the text
const textWidth = doc.getStringUnitWidth(text) * doc.internal.getFontSize() / doc.internal.scaleFactor;

// Calculate the X-coordinate to center the text
const centerX = (doc.internal.pageSize.getWidth() - textWidth) / 2;

// Add the centered text to the PDF below the logo and site name
doc.text(text, centerX, siteNameY + 30); // Adjust the Y-coordinate for spacing

// Define fields to exclude
const excludedFields = ['_id', '__v'];

Object.keys(rowData).forEach((key, index) => {
  // Check if the field is not in the excludedFields array
  if (!excludedFields.includes(key)) {
    const yPos = 60 + index * 10;
    doc.text(`${key}: ${rowData[key]}`, 10, yPos);
  }
});

const name = 'Sarathchandra H.M.S.D.'; // Replace with the actual name
  const department = 'Agricultural Department'; 
  const no = 'IT21213458';

  doc.setFontSize(12);
  doc.text(`${name}`, 20, doc.internal.pageSize.getHeight() - 50);
  doc.text(`${no}`, 20, doc.internal.pageSize.getHeight() - 40);
  doc.text(`${department}`, 20, doc.internal.pageSize.getHeight() - 30);

  // Get the current date
  const currentDate = new Date();
  const formattedDate = currentDate.toLocaleDateString(); 

  doc.text(`Date: ${formattedDate}`, 20, doc.internal.pageSize.getHeight() - 20);


// Save the PDF with a specific name
doc.save('row_data.pdf');
};



  return (
    <div>
     <HeaderMain/>
     <br></br><br></br><br/><br/><br/>
    <div>
      <h2 className="all-requests-heading-sachini">MY REQUESTS</h2>
      <div className="search-container-sachini">
        <p className="searchPara-sachini">Search by date</p>
        <div className="search-bar2-sachini">    {/*if you want you can get the removed search bar's container from here by removing 2*/}
          <input
            type="date"
            value={searchDate}
            onChange={(e) => {
              const selectedDate = new Date(e.target.value);
              const year = selectedDate.getFullYear();
              const month = String(selectedDate.getMonth() + 1).padStart(2, '0'); // Month is 0-based
              const day = String(selectedDate.getDate()).padStart(2, '0');
              setSearchDate(`${year}-${month}-${day}`);
            }}
            placeholder="Search by Date"
            className="reqSearchBar-sachini"
          />
          <button onClick={filterRequestsByDate} className="reqSearchButton-sachini">
            Search
          </button>
        </div>
        {loading ? (
          <p>Loading...</p>
        ) : null}
        {noResultsMessage && !loading && (
          <p className="no-results-message-sachini">{noResultsMessage}</p>
        )}
      </div>
      {Array.isArray(mergedData) && mergedData.length > 0 ? (
        <table className="all-requests-table-sachini">
          <thead>
            <tr>
              {/*<th>Request ID</th>*/}
              {/*<th>NIC</th>*/}
              <th>Item Name</th>
              <th>Req Date</th>
              <th>Quantity</th>
              <th>Price</th>
              <th>Status</th>
              <th>Action</th>
            </tr>
          </thead>
          <tbody>
            {mergedData.map((data, index) => (
              <tr key={index} className={highlightedRows.includes(data) ? 'highlight-sachini' : ''}>
                {/*<td>{data.requestId || data._id || data._id || data._id || data._id}</td>*/}
                {/*<td>{data.nic || data.NIC || data.nic || data.farmerid}</td>*/}
                <td>{data.productName || data.ricetype || data.type || data.seedtype || data.machineName}</td>
                {/*<td>{data.requestedDate || data.date || data.plantedDate || data.date || data.dateOfRequest}</td>*/}
                <td>
                  {data.requestedDate
                    ? new Date(data.requestedDate).toLocaleDateString()
                    : data.date
                    ? new Date(data.date).toLocaleDateString()
                    : data.plantedDate
                    ? new Date(data.plantedDate).toLocaleDateString()
                    : data.dateOfRequest
                    ? new Date(data.dateOfRequest).toLocaleDateString()
                    : '-'}
                </td>
                <td>{data.quantity || data.cultivatedamount || data.amount || data.reqamount || '1'}</td>
                <td>{data.totalPrice || data.totalPrice || data.payableAmount || data.Price || '-'}</td>
                <td>{data.status || data.status || data.status || data.isChecked ? 'Checked' : 'Pending' ||'-'}</td>
                <td>
                  <button onClick={() => downloadRowDataAsPDF(data)} className="download-row-button-sachini">Download</button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      ) : (
        !loading && <p className="noreq-sachini">You have not made any request yet</p>
      )}

<button onClick={downloadRequestFormAsPDF} className="download-button-sachini">
        Download Requests PDF
      </button>
    </div></div>
  );
}

export default AllRequests;