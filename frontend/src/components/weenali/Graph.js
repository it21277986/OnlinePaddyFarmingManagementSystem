import React, { useState, useEffect, useRef } from "react";
import axios from "axios";
import HarvestMenu from './HarvestMenu';
import { BarChart, Bar, XAxis, YAxis, Tooltip, Legend, CartesianGrid, Cell, LineChart, Line, ResponsiveContainer } from 'recharts';
import jsPDF from "jspdf";
import "jspdf-autotable";
import * as htmlToImage from 'html-to-image';
import headerImageURL from './images/Logo2.png'; // Import your header image

export default function Graph() {
  const [riceData, setRiceData] = useState([]);
  const [sellingData, setSellingData] = useState([]);
  const [data, setData] = useState([]);
  const [searchedNIC, setSearchedNIC] = useState("");
  const COLORS = ['#008000', '#4CBB17', '#32CD32', '#7CFC00']; // Define COLORS array

  const chartRef = useRef(null);

  useEffect(() => {
    // Fetch rice type and quantity data from your API endpoint
    axios.get("http://localhost:8070/ricetype/ricetype") // Replace with your actual API endpoint
      .then((response) => {
        // Convert "quantity" to numbers
        const riceDataWithNumericQuantity = response.data.map((item) => ({
          ricetypename: item.ricetypename,
          quantity: parseFloat(item.quantity), // Convert quantity to a float or parseInt(item.quantity) for an integer
        }));
        setRiceData(riceDataWithNumericQuantity);
      })
      .catch((error) => {
        console.error("Error fetching rice data:", error);
      });
  }, []);

  const handleSearch = () => {
    // Fetch data for the searched NIC from your API endpoint
    axios.get(`http://localhost:8070/farmerbuyingprice/getFarmerbuyingprice/${searchedNIC}`)
      .then((response) => {
        setData(response.data);
      })
      .catch((error) => {
        console.error("Error fetching data:", error);
      });
  };

  const generatePdf = (title) => {
    if (chartRef.current && riceData.length > 0) {
      const doc = new jsPDF();

      // Add the header image
      const imgWidth = 40;
      const imgHeight = 40;
      doc.addImage(headerImageURL, 'PNG', 80, 10, imgWidth, imgHeight);

      // Add title
      doc.setFontSize(12);
      doc.text(title, 10, 60);

      // Capture the chart as an image
      htmlToImage.toPng(chartRef.current)
        .then((chartImage) => {
          doc.addImage(chartImage, 'PNG', 10, 90, 190, 100);

          // Add a table for the data
          const tableData = riceData.map(({ ricetypename, quantity }) => [ricetypename, quantity]);
          doc.autoTable({
            head: [['Rice Type', 'Quantity']],
            body: tableData,
            startY: 210,
          });

          // Add the printed date in the footer
          const printedDate = new Date().toLocaleDateString();
          doc.setFontSize(12);
          doc.setTextColor(0, 0, 0);
          doc.text(`Printed on: ${printedDate}`, 10, 285); // Adjust the Y-coordinate as needed

          // Save the PDF or open it in a new tab
          doc.save('chart_and_data.pdf');
        })
        .catch((error) => {
          console.error('Error capturing chart image:', error);
        });
    }
  };

  const generatePdfCost = (title) => {
    if (chartRef.current && riceData.length > 0) {
      const doc = new jsPDF();

      // Add the header image
      const imgWidth = 180;
      const imgHeight = 40;
      doc.addImage(headerImageURL, 'PNG', 10, 10, imgWidth, imgHeight);

      // Add title
      doc.setFontSize(12);
      doc.text(title, 10, 60);

      // Capture the chart as an image
      htmlToImage.toPng(chartRef.current)
        .then((chartImage) => {
          doc.addImage(chartImage, 'PNG', 10, 90, 190, 100);

          // Add table 1
          const tableData = riceData.map(({ date, sellingprice }) => [date, sellingprice]);
          doc.autoTable({
            head: [['date', 'sellingprice']],
            body: tableData,
            startY: 210,
          });

          // Add table 2
          const tableData1 = riceData.map(({ date, profit }) => [date, profit]);
          doc.autoTable({
            head: [['date', 'profit']],
            body: tableData1,
            startY: 210,
          });

          // Add table 3
          const tableData2 = riceData.map(({ date, total }) => [date, total]);
          doc.autoTable({
            head: [['date', 'total']],
            body: tableData2,
            startY: 210,
          });

          // Add table 4
          const tableData3 = riceData.map(({ date, wastage }) => [date, wastage]);
          doc.autoTable({
            head: [['date', 'wastage']],
            body: tableData3,
            startY: 210,
          });

          // Add the printed date in the footer
          const printedDate = new Date().toLocaleDateString();
          doc.setFontSize(12);
          doc.setTextColor(0, 0, 0);
          doc.text(`Printed on: ${printedDate}`, 10, 285); // Adjust the Y-coordinate as needed

          // Save the PDF or open it in a new tab
          doc.save('chart_and_data.pdf');
        })
        .catch((error) => {
          console.error('Error capturing chart image:', error);
        });
    }
  };

  return (
    <div>
      <HarvestMenu />
      <div className="container">
        <div className="row">
          <div className="col-md-12">
            <div className="card shadow mb-4 rounded-4">
              <div className="card-header py-3 d-flex flex-row align-items-center justify-content-between rounded-4">
                <h6 className="m-0 font-weight-bold text-success">Remainnig Quantity Against Rice Type</h6>
                <button type="submit" onClick={() => generatePdf("Remainnig Quantity Against Rice Type")}>Generate PDF</button>
              </div>
              <div className="card-body" ref={chartRef}>
                <BarChart
                  width={800}
                  height={400}
                  data={riceData}
                  margin={{
                    top: 5,
                    right: 30,
                    left: 20,
                    bottom: 5,
                  }}
                  barSize={20}
                >
                  <XAxis dataKey="ricetypename" scale="point" padding={{ left: 10, right: 10 }} />
                  <YAxis />
                  <Tooltip />
                  <Legend />
                  <CartesianGrid strokeDasharray="3 3" />
                  <Bar dataKey="quantity" fill="#8884d8">
                    {riceData.map((entry, index) => (
                      <Cell key={`cell-${index}`} fill={COLORS[index % COLORS.length]} />
                    ))}
                  </Bar>
                </BarChart>
              </div>
            </div>
          </div>
        </div>
        <div className="row">
          <div>
            <div className="container">
              <div className="card shadow mb-3 rounded-3">
                <div className="card-header py-3 d-flex flex-row align-items-center justify-content-between rounded-4">
                  <label htmlFor="nicInput">Search NIC:</label>
                  <input
                    type="text"
                    id="nicInput"
                    value={searchedNIC}
                    onChange={(e) => setSearchedNIC(e.target.value)}
                  />
                  <br></br>
                  <button onClick={handleSearch}>Search</button>
                  <br></br>
                  <h4 className="m-0 font-weight-bold text-success">Graphs for NIC: {searchedNIC}</h4>
                  <button type="submit" onClick={() => generatePdfCost("Cost of " + searchedNIC)}>Generate PDF</button>
                </div>
              </div>
            </div>
            <br></br>
            {data.length > 0 && (
              <div className="row">
                <div className="col-md-6">
                  <h6 className="m-0 font-weight-bold text-success">Date vs. Selling Price</h6>
                  <LineChart width={500} height={300} data={data}>
                    <XAxis dataKey="date" />
                    <YAxis />
                    <Tooltip />
                    <CartesianGrid stroke="#f5f5f5" />
                    <Legend />
                    <Line type="monotone" dataKey="sellingprice" stroke="#8884d8" />
                  </LineChart>
                </div>
                <div className="col-md-6">
                  <h6 className="m-0 font-weight-bold text-success">Date vs. Profit</h6>
                  <LineChart width={500} height={300} data={data}>
                    <XAxis dataKey="date" />
                    <YAxis />
                    <Tooltip />
                    <CartesianGrid stroke="#f5f5f5" />
                    <Legend />
                    <Line type="monotone" dataKey="profit" stroke="#8884d8" />
                  </LineChart>
                </div>
                <div className="col-md-6">
                  <h6 className="m-0 font-weight-bold text-success">Date vs. Total Cost</h6>
                  <LineChart width={500} height={300} data={data}>
                    <XAxis dataKey="date" />
                    <YAxis />
                    <Tooltip />
                    <CartesianGrid stroke="#f5f5f5" />
                    <Legend />
                    <Line type="monotone" dataKey="total" stroke="#82ca9d" />
                  </LineChart>
                </div>
                <div className="col-md-6">
                  <h6 className="m-0 font-weight-bold text-success">Date vs. Wastage</h6>
                  <LineChart width={500} height={300} data={data}>
                    <XAxis dataKey="date" />
                    <YAxis />
                    <Tooltip />
                    <CartesianGrid stroke="#f5f5f5" />
                    <Legend />
                    <Line type="monotone" dataKey="wastage" stroke="#32CD32" />
                  </LineChart>
                </div>
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
}
