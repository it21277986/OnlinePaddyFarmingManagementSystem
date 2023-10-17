import React, { useEffect, useState } from 'react';
import axios from 'axios';
import './styles/CustomerList.css';
import jsPDF from 'jspdf';
import 'jspdf-autotable'; 
import logoImage from "./images/siteLogo.jpg";
import HeaderMain from "./HeaderAllCus";

function DeletedCustomerList() {
  const siteName = "Green Feild Pro";
  const [deletedCustomers, setDeletedCustomers] = useState([]);
  const [searchQuery, setSearchQuery] = useState('');
  const [filteredDeletedCustomers, setFilteredDeletedCustomers] = useState([]);

  useEffect(() => {
    // Fetch deleted customer list from the server
    axios
      .get('http://localhost:8070/customer/fetchDeletedCustomers')
      .then((response) => {
        setDeletedCustomers(response.data);
      })
      .catch((error) => {
        console.error('Error fetching deleted customer list', error);
      });
  }, []);

  useEffect(() => {
    // Filter deleted customers based on the search query
    const filtered = deletedCustomers.filter((customer) =>
      customer.nic.toLowerCase().includes(searchQuery.toLowerCase())
    );
    setFilteredDeletedCustomers(filtered);
  }, [searchQuery, deletedCustomers]);

  // Function to handle changes to the search query
  const handleSearchChange = (event) => {
    setSearchQuery(event.target.value);
  };

  // Function to download deleted customer list as PDF
  const downloadDeletedCustomerList = () => {
    const doc = new jsPDF();

    doc.addImage(logoImage, 'PNG', 10, 10, 40, 40); // Adjust the coordinates and dimensions as needed
  
    // Calculate the X-coordinate for the site name to be positioned to the right of the logo
    const logoWidth = 40; // Adjust the width of the logo if needed
    const siteNameX = 10 + logoWidth + 10; // Adjust the spacing as needed
  
    // Calculate the Y-coordinate for the site name to be at the same vertical position as the logo
    const siteNameY = 10 + 40 / 2; // Assuming the logo is centered vertically
  
    // Add the site name text to the PDF
    doc.setFontSize(30); // Adjust the font size as needed
    doc.setFont('helvetica', 'bold'); // Set the font to 'helvetica' and style to 'bold'
    doc.text(siteName, siteNameX, siteNameY);
  
    doc.setFontSize(20); // Reset to default font size
    doc.setFont('helvetica', 'normal'); 

    const text = 'All Deleted Customers';

  // Calculate the width of the text
  const textWidth = doc.getStringUnitWidth(text) * doc.internal.getFontSize() / doc.internal.scaleFactor;

  // Calculate the X-coordinate to center the text
  const centerX = (doc.internal.pageSize.getWidth() - textWidth) / 2;

  // Add the centered text to the PDF
  doc.text(text, centerX, 60);

    // Define the header row with column names
    const header = ['Name', 'NIC', 'Username', 'Phone', 'Address', 'LandOwner Name', 'Size'];

    // Define an empty array to hold the table data
    const data = [];

    // Push deleted customer data to the data array
    filteredDeletedCustomers.forEach((customer) => {
      // Combine the address fields into one column
      const address = `${customer.no}, ${customer.street}, ${customer.city}`;
      const name = `${customer.fname} ${customer.lname}`

      const rowData = [
        name,
        customer.nic,
        customer.username,
        customer.phone,
        address, // Use the combined address field
        customer.landOwnerName,
        customer.feildSize,
      ];

      data.push(rowData);
    });

    // Auto-generate the table based on the data
    doc.autoTable({
      head: [header], // Add the header row only once
      body: data,
      startY: siteNameY + 40,
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
    doc.save('deleted_customer_list.pdf');
  };


  /*
  // Function to download deleted customer list as PDF
  const downloadDeletedCustomerList = () => {
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
    doc.setFont('helvetica', 'normal'); 

    const text = 'All Deleted Customers';

  // Calculate the width of the text
  const textWidth = doc.getStringUnitWidth(text) * doc.internal.getFontSize() / doc.internal.scaleFactor;

  // Calculate the X-coordinate to center the text
  const centerX = (doc.internal.pageSize.getWidth() - textWidth) / 2;

  // Add the centered text to the PDF
  doc.text(text, centerX, 60);

    // Define the header row with column names
    const header = ['Name', 'NIC', 'Username', 'Phone', 'Address', 'LandOwner Name', 'Size'];

    // Define an empty array to hold the table data
    const data = [];

    // Push deleted customer data to the data array
    filteredDeletedCustomers.forEach((customer) => {
      // Combine the address fields into one column
      const address = `${customer.no}, ${customer.street}, ${customer.city}`;
      const name = `${customer.fname} ${customer.lname}`

      const rowData = [
        name,
        customer.nic,
        customer.username,
        customer.phone,
        address, // Use the combined address field
        customer.landOwnerName,
        customer.feildSize,
      ];

      data.push(rowData);
    });

    // Auto-generate the table based on the data
    doc.autoTable({
      head: [header], // Add the header row only once
      body: data,
      startY: siteNameY + 40,
    });

    // Save the PDF with a specific name
    doc.save('deleted_customer_list.pdf');
  };
  */

  return (
    <div>
     <HeaderMain/>
     <br></br><br></br><br/><br/><br/>
    <div></div>
    <div className="customer-list-table-container-sachini">
      <h1>Removed Customer List</h1>
      <input
        type="text"
        placeholder="Search by NIC"
        value={searchQuery}
        onChange={handleSearchChange}
        className="search-bar-sachini"
        maxLength={13}
      />
      <table className="customer-list-table-sachini">
        <thead>
          <tr>
            <th>First Name</th>
            <th>Last Name</th>
            <th>NIC</th>
            <th>Username</th>
            <th>Phone</th>
            <th>Address</th>
            <th>LandOwner Name</th>
            {/*<th>District Code</th>*/}
            <th>Division Code</th>
            <th>Block No</th>
            <th>Size</th>
          </tr>
        </thead>
        <tbody>
          {filteredDeletedCustomers.length === 0 ? (
            <tr>
              <td colSpan="11">No records found</td>
            </tr>
          ) : (
            filteredDeletedCustomers.map((customer, index) => (
              <tr key={index}>
                <td>{customer.fname}</td>
                <td>{customer.lname}</td>
                <td>{customer.nic}</td>
                <td>{customer.username}</td>
                <td>{customer.phone}</td>
                <td>
                  {customer.no}, {customer.street}, {customer.city}
                </td>
                <td>{customer.landOwnerName}</td>
                {/*<td>{customer.districtCode}</td>*/}
                <td>{customer.devisionCode}</td>
                <td>{customer.blockNo}</td>
                <td>{customer.feildSize}</td>
              </tr>
            ))
          )}
        </tbody>
      </table>
      <button className="download-button-sachini" onClick={downloadDeletedCustomerList}>
        Download List from Here
      </button>
    </div></div>
  );
}

export default DeletedCustomerList;
