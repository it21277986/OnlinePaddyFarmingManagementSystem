//report generating
const generatePDF = () => {
    // Create a new jsPDF instance
    const pdfDoc = new jsPDF();
  
    // Add a title to the PDF
    pdfDoc.text('Fertilizer Request List', 15, 15);
  
    // Define table headers
    const headers = ['NIC', 'Name', 'Contact No', 'Planted Date', 'Type', 'Amount (kg)','Total Price (Rs)', 'Checked'];
  
    const data = filteredRequests.map((item) => [
      item.nic,
      item.name,
      item.contactNo,
      item.plantedDate,
      item.type,
      item.amount,
      item.totalPrice,
      item.isChecked ? 'Yes' : 'No',
    ]);
  
    // AutoTable configurations
    const autoTableConfig = {
      startY: 25,
      head: [headers],
    };
  
    pdfDoc.autoTable({ ...autoTableConfig, body: data });
  
    pdfDoc.save('FertilizerRequestList.pdf');
  };







  <button className="btn btn-outline-success" onClick={generatePDF}>Generate Report</button>