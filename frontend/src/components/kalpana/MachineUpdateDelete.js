import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { Link } from 'react-router-dom';
import jsPDF from 'jspdf';
import 'jspdf-autotable';
import headerImageURL from './images/GreenfieldPro Logo.png';

function MachineUpdateDelete() {
  const [machineData, setMachineData] = useState([]);
  const [filteredMachineData, setFilteredMachineData] = useState([]);
  const [loading, setLoading] = useState(true);
  const [searchQuery, setSearchQuery] = useState('');

  useEffect(() => {
    // Fetch machine data from the backend API
    axios.get('http://localhost:8070/machineReg/displayMachine')
      .then((response) => {
        setMachineData(response.data);
        setFilteredMachineData(response.data); // Initialize filtered data with all machines
        setLoading(false);
      })
      .catch((error) => {
        console.error('Error fetching machine data:', error);
        setLoading(false);
      });
  }, []);

  const handleDelete = async (id) => {
    try {
      // Send a DELETE request to your backend to delete the machine registration data
      await axios.delete(`http://localhost:8070/machineReg/deleteMachine/${id}`);

      // Update the machineData state by filtering out the deleted item
      setMachineData((prevData) => prevData.filter((machine) => machine._id !== id));
      setFilteredMachineData((prevData) => prevData.filter((machine) => machine._id !== id));
    } catch (error) {
      console.error('Error deleting machine data:', error);
    }
  };

  const handleSearch = (query) => {
    setSearchQuery(query);
    // Filter the machine data based on the search query
    const filteredData = machineData.filter((machine) =>
      machine.machineOwnerName.toLowerCase().includes(query.toLowerCase())
    );
    setFilteredMachineData(filteredData);
  };

  // Report generating
  const generatePDF = () => {
    // Create a new jsPDF instance
    const pdfDoc = new jsPDF();

    const imgWidth = 40;
    const imgHeight = 40;
    pdfDoc.addImage(headerImageURL, 'PNG', 85, 15, imgWidth, imgHeight);

    // Add a title to the PDF
    pdfDoc.text('Machine Registration List', 15, 65);

    // Define table headers
    const headers = ['Machine Owner Name', 'Machine Type', 'Engine Number', 'Date of Registration', 'Contact Number'];

    const data = filteredMachineData.map((machine) => [
      machine.machineOwnerName,
      machine.machineType,
      machine.engineNumber,
      machine.dateOfRegistration,
      machine.contactNumber,
    ]);

    // Generate the table using autotable
    pdfDoc.autoTable({
      head: [headers],
      body: data,
      startY: 70, // Adjust this value as needed
    });

    // Print the date in the footer
  const printedDate = new Date().toLocaleDateString();
  pdfDoc.setFontSize(12);
  pdfDoc.setTextColor(0, 0, 0);
  pdfDoc.text(`Printed on: ${printedDate}`, 15, pdfDoc.internal.pageSize.height - 15);


    pdfDoc.save('MachineRegistrationList.pdf');
  };

  return (
    <div>
      <h1>Machine Registration Data</h1>
      <input
        type="text"
        placeholder="Search by Machine Owner Name"
        value={searchQuery}
        onChange={(e) => handleSearch(e.target.value)}
      />
      <button className="btn btn-outline-success" onClick={generatePDF}>
        Generate PDF Report
      </button>
      {loading ? (
        <div>Loading...</div>
      ) : (
        <div>
          <table>
            <thead>
              <tr>
                <th>Machine Owner Name</th>
                <th>Machine Type</th>
                <th>Engine Number</th>
                <th>Date of Registration</th>
                <th>Contact Number</th>
                <th>Actions</th>
              </tr>
            </thead>
            <tbody>
              {filteredMachineData.map((machine, index) => (
                <tr key={index}>
                  <td>{machine.machineOwnerName}</td>
                  <td>{machine.machineType}</td>
                  <td>{machine.engineNumber}</td>
                  <td>{machine.dateOfRegistration}</td>
                  <td>{machine.contactNumber}</td>
                  <td>
                    <Link to={`/viewMachine/${machine._id}`}>View</Link>
                    <button onClick={() => handleDelete(machine._id)}>Delete</button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      )}
    </div>
  );
}

export default MachineUpdateDelete;
