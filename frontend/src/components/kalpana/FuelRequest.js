import React, { useState, useEffect } from "react";
import axios from "axios";
//import QRCode from 'react-qr-code'; Wrong import

// Newly added //
import QRCode from "qrcode";

function FuelRequest() {
  const [formData, setFormData] = useState({
    farmerId: "",
    machineName: "tractor", // Default machine name
    sizeOfLand: "",
    volume: 0,
    qrcode: "",
    // Newly added
    // Form eke mewa collect krgnne na
    // Ewa backend model eke required kiyla dla thyna nsa ewa nthi unoth error enwa
    noOfDays: 10, // hard coded
    price: 1000, // hard coded
  });

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: value });
  };

  // Newly added //
  // Modified handleCalculateVolume function
  const handleCalculateVolume = () => {
    setFormData((prevData) => {
      const { machineName, sizeOfLand } = prevData;
      let volume = 0;

      if (machineName === "tractor") {
        volume = 35 * parseFloat(sizeOfLand);
      } else if (machineName === "combine") {
        volume = 15 * parseFloat(sizeOfLand);
      } else if (machineName === "harvest") {
        volume = 20 * parseFloat(sizeOfLand);
      } else if (machineName === "seeder") {
        volume = 15 * parseFloat(sizeOfLand);
      }

      return { ...prevData, volume };
    });
  };

  // Newly added //
  useEffect(() => {
    // Generate QR code
    const generateQRCode = () => {
      let stringfyData = JSON.stringify(`Volume: ${formData.volume}`);

      QRCode.toDataURL(stringfyData, async function (err, code) {
        if (err) return console.log("Error occurred");

        setFormData({ ...formData, qrcode: code });
      });
    };

    // Generate QR code whenever the volume changes
    generateQRCode();
    console.log(formData);
  }, [formData.volume]);

  // end of newly added //

  const handleSubmit = async (e) => {
    e.preventDefault();
    // Calculate the volume before submitting
    handleCalculateVolume();

    // Newly added //
    // Checked whether data is being sent to the backend
    // Works fine
    axios
      .post("http://localhost:5000/fuel/addFuelReq", formData) // Path ek oylge wdihata wens krgnna
      .then((res) => {
        console.log(res.data);
      })
      .catch((err) => {
        console.log(err);
      });

    // Commented out the following code
    // This cause an bug in the frontend not allowing the QR code to be displayed
    // Clear the form fields
    // setFormData({
    //   farmerId: "",
    //   machineName: "tractor", // Default machine name
    //   sizeOfLand: "",
    //   volume: 0,
    //   qrcode: "",
    // });
  };

  const centerFormStyle = {
    display: "flex",
    flexDirection: "column",
    alignItems: "center",
    justifyContent: "center",
    minHeight: "100vh",
  };



  return (
    <div className="App" style={centerFormStyle}>
      <h1>Farm Machine Request Form</h1>
      <form onSubmit={handleSubmit}>
        <div className="form-group">
          <label htmlFor="farmerId">Farmer ID:</label>
          <input
            type="text"
            id="farmerId"
            name="farmerId"
            value={formData.farmerId}
            onChange={handleChange}
            required
          />
        </div>
        <div className="form-group">
          <label htmlFor="machineName">Machine Name:</label>
          <select
            id="machineName"
            name="machineName"
            value={formData.machineName}
            onChange={handleChange}
          >
            <option value="tractor">Tractor</option>
            <option value="combine">Combine</option>
            <option value="harvest">Harvest</option>
            <option value="seeder">Seeder</option>
          </select>
        </div>
        <div className="form-group">
          <label htmlFor="sizeOfLand">Size of Land (in acres):</label>
          <input
            type="number"
            id="sizeOfLand"
            name="sizeOfLand"
            value={formData.sizeOfLand}
            onChange={handleChange}
            required
          />
        </div>
        <button type="submit"
        style={{
          backgroundColor: "#2B8721",
          color: "#fff",
          padding: "10px 20px",
          border: "none",
          borderRadius: "5px",
          cursor: "pointer",
          fontSize: "16px",
          transition: "background-color 0.3s ease",
        }}
        >Submit</button>
      </form>
      {formData.qrcode && formData.volume > 0 && (
        <div className="qr-code">
          <h2>QR Code</h2>
          {/* Wrong implementation */}
          {/* <QRCode value={formData.qrCodeData} /> */}
          {/* Newly added */}
          <img src={formData.qrcode} alt="QR Code" />
        </div>
      )}
    </div>
  );
}

export default FuelRequest;
