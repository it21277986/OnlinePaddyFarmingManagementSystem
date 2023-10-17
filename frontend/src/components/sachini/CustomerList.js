import React, { useEffect, useState, useRef } from 'react';
import axios from 'axios';
import './styles/CustomerList.css';
import jsPDF from 'jspdf';
import { Link } from 'react-router-dom'; 
import { useNavigate } from 'react-router-dom';
import logoImage from "./images/siteLogo.jpg";
import HeaderMain from "./HeaderAllCus";

function CustomerList() {
  const siteName = "Green Feild Pro";
  const [customers, setCustomers] = useState([]);
  const [searchQuery, setSearchQuery] = useState('');
  const [filteredCustomers, setFilteredCustomers] = useState([]);
  const [highlightedCustomerIndex, setHighlightedCustomerIndex] = useState(-1); // Initialize with -1
  const tableRef = useRef(null);
  const navigate = useNavigate();


  useEffect(() => {
    // Fetch customer list from the server
    axios.get('http://localhost:8070/customer/fetch')
      .then((response) => {
        setCustomers(response.data);
      })
      .catch((error) => {
        console.error('Error fetching customer list', error);
      });
  }, []);

  // Function to handle changes to the search query
  const handleSearchChange = (event) => {
    setSearchQuery(event.target.value);
  };

  // Function to filter customers based on the search query
  useEffect(() => {
    const filtered = customers.filter((customer) =>
      customer.nic.toLowerCase().includes(searchQuery.toLowerCase())
    );
    setFilteredCustomers(filtered);
  }, [searchQuery, customers]);

  // Function to handle Enter key press
  // Function to handle Enter key press


  // Function to handle Enter key press
const handleKeyPress = (event) => {
    if (event.key === 'Enter') {
      // Define a regular expression pattern for valid NICs
      const nicPattern = /^\d{12}$|^\d{12}[vV]$/;
  
      // Check if the search query matches the pattern
      if (nicPattern.test(searchQuery)) {
        // Convert the search query to lowercase
        const searchQueryLower = searchQuery.toLowerCase();
  
        console.log('Search Query:', searchQueryLower);
  
        // Find the customer with the matching NIC (case-insensitive)
        const matchingCustomerIndex = customers.findIndex((customer) => {
          const customerNicLower = customer.nic.toLowerCase();
          console.log('Customer NIC:', customerNicLower);
          return customerNicLower === searchQueryLower;
        });
  
        console.log('Matching Index:', matchingCustomerIndex);
  
        if (matchingCustomerIndex !== -1) {
          // Highlight the matching customer's row by setting the index
          setHighlightedCustomerIndex(matchingCustomerIndex);
  
          // Scroll to the matching customer's row
          if (tableRef.current && matchingCustomerIndex !== -1) {
            const row = tableRef.current.querySelectorAll('tbody tr')[matchingCustomerIndex];
            if (row) {
              row.scrollIntoView({ behavior: 'smooth', block: 'center' });
            }
          }
        } else {
          // Handle invalid input (e.g., show an error message)
          alert('No customer found with the provided NIC.');
        }
      } else {
        // Handle invalid input (e.g., show an error message)
        alert('Invalid NIC format. Please enter exactly 12 digits or 12 digits followed by "v" or "V".');
      }
    }
  };
  
  const confirmDelete = (nic) => {
    const confirmDeletion = window.confirm('Are you sure you want to delete this customer?');
    if (confirmDeletion) {
      handleDeleteCustomer(nic);
    }
  };


  const handleDeleteCustomer = (nic) => {
    // Make an API request to delete the customer
    axios
      .delete(`http://localhost:8070/customer/deleteCus/${nic}`)
      .then((response) => {
        // Check if the deletion was successful
        if (response.status === 200) {
          // Customer deleted successfully
          alert('Customer deleted successfully');
          // You can also update the state to remove the deleted customer from the list
          // Reload the customer list or update state as needed
        }
      })
      .catch((error) => {
        console.error('Error deleting customer', error);
        // Handle any errors and show an alert or message to the user
        alert('Error deleting customer');
      });
  };
  


  // Function to download customer list as CSV
  /*
  const downloadCustomerList = () => {
    // Define the CSV header row with column names
    const csvHeader = [
      'First Name', 'Last Name', 'NIC', 'Username', 'Phone', 'LandOwner Name', 'District Code', 'Division Code', 'Block No', 'Size'
    ].join(', ');
  
    // Convert customers to CSV format
    const csvData = customers.map((customer) => {
      // Format NIC as a string with a specific pattern
      const nic = customer.nic.toLocaleString('en-US', { minimumFractionDigits: 0, maximumFractionDigits: 0 });
  
      // Combine the address fields into one column
      //const address = ${customer.no}, ${customer.street}, ${customer.city};
  
      return [
        customer.fname, customer.lname, nic, customer.username, customer.phone,
        //address, // Use the combined address field
        customer.landOwnerName, customer.districtCode, customer.devisionCode,
        customer.blockNo, customer.feildSize
      ].join(', ');
    }).join('\n');
  
    // Create a Blob and download the CSV
    const csvContent = ${csvHeader}\n${csvData};
    const blob = new Blob([csvContent], { type: 'text/csv' });
    const url = window.URL.createObjectURL(blob);
    const a = document.createElement('a');
    a.href = url;
    a.download = 'customer_list.csv';
    a.click();
    window.URL.revokeObjectURL(url);
  };
  
  */


  // Function to download customer list as PDF
  const downloadCustomerList = () => {
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
  doc.setFont('helvetica', 'normal'); // Reset to default font style

    const text = 'All Registered Customers';

  // Calculate the width of the text
  const textWidth = doc.getStringUnitWidth(text) * doc.internal.getFontSize() / doc.internal.scaleFactor;

  // Calculate the X-coordinate to center the text
  const centerX = (doc.internal.pageSize.getWidth() - textWidth) / 2;

  // Add the centered text to the PDF
  doc.text(text, centerX, 60);

  // Define the header row with column names
  const header = ['Name', 'NIC', 'Username', 'Phone', 'Address', 'LandOwner Name', 'Size (acres)'];

  // Define an empty array to hold the table data
  const data = [];

  // Push customer data to the data array
  customers.forEach((customer) => {
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
      customer.blockNo,
      customer.feildSize,
    ];

    data.push(rowData);
  });

  // Specify column widths (in millimeters)
  const columnWidths = [30, 30, 25, 25, 45, 25, 15];

  // Auto-generate the table based on the data with custom column widths
  doc.autoTable({
    head: [header], // Add the header row only once
    body: data,
    startY: siteNameY + 40,
    columnStyles: {
      0: { columnWidth: columnWidths[0] },
      1: { columnWidth: columnWidths[1] },
      2: { columnWidth: columnWidths[2] },
      3: { columnWidth: columnWidths[3] },
      4: { columnWidth: columnWidths[4] },
      5: { columnWidth: columnWidths[5] },
      6: { columnWidth: columnWidths[6] },
      
    },
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
  doc.save('customer_list.pdf');
};



const handleUpdateCustomer = (nic) => {
  // Navigate to the edit page for the selected customer
  navigate(`/CustomerEditForm/${nic}`);
};





  
  return (
    <div>
     <HeaderMain/>
     <br></br><br></br><br/><br/><br/>
    <div className="customer-list-table-container-sachini">
  <h1>Customer List</h1>
  <input
        type="text"
        placeholder="Search by NIC"
        value={searchQuery}
        onChange={handleSearchChange}
        onKeyPress={handleKeyPress} 
        className="search-bar-sachini"
        maxLength={13}
      />
  <table className="customer-list-table-sachini" ref={tableRef}>
    <thead>
      <tr>
        <th>First Name</th>
        <th>Last Name</th>
        <th>NIC</th>
        <th>Username</th>
        <th>Phone</th>
        <th>Address</th>
        <th>LandOwner Name</th>
        <th>FeildNo</th>
        <th>Size (acres)</th>
        <th>Delete</th>
        <th>Update</th>
      </tr>
    </thead>
    <tbody>
      {customers.map((customer, index) => (
         <tr
         key={index}
         data-customer-id={customer.id}
         className={highlightedCustomerIndex === index ? 'highlighted-row-sachini' : ''}
        >
          <td>{customer.fname}</td>
          <td>{customer.lname}</td>
          <td>{customer.nic}</td>
          <td>{customer.username}</td>
          <td>{customer.phone}</td>
          <td>
            {customer.no}, {customer.street}, {customer.city}
          </td>
          <td>{customer.landOwnerName}</td>
          <td>{customer.districtCode}{customer.devisionCode}/{customer.blockNo}</td>
          <td>{customer.feildSize}</td>
          <td>
            <button className="dltbtn-sachini" onClick={() => confirmDelete(customer.nic)}>Delete</button>
          </td>
          <td>
          <button className="update-btn-sachini" onClick={() => handleUpdateCustomer(customer.nic)}>Update</button>
          </td>
        </tr>
      ))}
    </tbody>
  </table>
  <button className="download-button-sachini" onClick={downloadCustomerList}>
    Download from here
  </button>
</div></div>
  );
}

export default CustomerList;
