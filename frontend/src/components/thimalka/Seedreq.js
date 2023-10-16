import React, { useState } from 'react';
import axios from 'axios';

export default function Seedreq() {
  // Setting variables
  const [farmerid, setFarmerID] = useState('');
  const [seedtype, setSeedtype] = useState('');
  const [nic, setNic] = useState('');
  const [contactNo, setContactNo] = useState('');
  const [feildsize, setFsize] = useState('');
  const [reqamount, setAmnt] = useState('');
  const [date, setDate] = useState('');
  const [Price, setSeedpay] = useState('');
  const [nicError, setNicError] = useState('');
  const [Error, setNError] = useState(false);
  const [contactNoError, setContactNoError] = useState('');

  // Validate functions
  const validateNic = () => {
    if (!nic.match(/^\d{9}[vVxX]|\d{11}$/)) {
      setNicError("Invalid NIC format (e.g., 123456789V or 123456789000)");
      setNError(true);
    } else {
      setNicError("");
      setNError(false);
    }
  };

  const validateContactNo = () => {
    if (!contactNo.match(/^\d{9}$/)) {
      setContactNoError("Invalid Contact No format (e.g., 1234567890)");
    } else {
      setContactNoError("");
    }
  }

  // Calculate Price based on the amount
  const handeSizeChange = (value) => {
    console.log("Field Size:", value);
    let ammout = value * 40;
    setAmnt(ammout);
    let Price = ammout * 120; // Calculate price
    setSeedpay(Price); // Set the price
  }

  // Sending data
  function sendData(e) {
    e.preventDefault();

    // Call the validation functions here
    validateNic();
    validateContactNo();

    // Check if there are any validation errors before sending the data
    if (!nicError && !contactNoError) {
      const newSeedreq = {
        farmerid,
        seedtype,
        nic,
        contactNo,
        feildsize,
        reqamount,
        Price,
        date
      };

      axios.post('http://localhost:8070/seedreq/addSeedreq', newSeedreq)
        .then(() => {
          alert('Request sent');
        })
        .catch((err) => {
          alert(err);
        });
    }
  }

  return (
    <div className="container">
      <form className='container' onSubmit={sendData}>
        <br />
        <h2>Request Seeds</h2>
        <hr className="border border-success border-2 opacity-50" />
        <div className="mb-3">
          <label htmlFor="farmerID" className="form-label">
            Farmer ID:
          </label>
          <input
            type="text"
            className="form-control"
            id="farmerid"
            aria-describedby=""
            onChange={(e) => {
              setFarmerID(e.target.value);
            }}
            required
          />
        </div>
        <div className="mb-3">
          <label htmlFor="nic" className="form-label">
            Farmer NIC:
          </label>
          <input
            type="text"
            className={`form-control ${nicError ? 'is-invalid' : ''}`}
            id="nic"
            aria-describedby=""
            onChange={(e) => {
              setNic(e.target.value);
              validateNic();
            }}
            required
            Maxlength={12}
          />
          {nicError && (
            <div className="invalid-feedback">
              {nicError}
            </div>
          )}
        </div>
        <div className="mb-3">
          <label htmlFor="contactNo" className="form-label">
            Contact No:
          </label>
          <input
            type="text"
            className={`form-control ${contactNoError ? 'is-invalid' : ''}`}
            id="contactNo"
            aria-describedby=""
            onChange={(e) => {
              setContactNo(e.target.value);
              validateContactNo()
            }}
            required
            Maxlength={10}
          />
          {contactNoError && (
            <div className="invalid-feedback">
              {contactNoError}
            </div>
          )}
        </div>
        <div className="mb-3">
          <label htmlFor="seedtype" className="form-label">
            Seed Type:
          </label>
          <select
            className="form-select"
            id="seedtype"
            onChange={(e) => {
              setSeedtype(e.target.value);
            }}
            required
          >
            <option value="">Select Seed Type</option>
            <option value="BG 300">BG 300</option>
            <option value="BG 338">BG 338</option>
            <option value="BG 334">BG 334</option>
            <option value="BG 364">BG 364</option>
            <option value="AT 144">AT 144</option>
            <option value="BG 367">BG 367</option>
          </select>
        </div>
        <div className="mb-3">
          <label htmlFor="fsize" className="form-label">
            Field size (Ar) :
          </label>
          <input
            type="text"
            className="form-control"
            id="fieldsize"
            aria-describedby=""
            onChange={(e) => {
              setFsize(e.target.value);
              handeSizeChange(e.target.value)
            }}
            required
          />
        </div>
        <div className="mb-3">
          <label htmlFor="amnt" className="form-label">
            Amount (KG):
          </label>
          <input
            type="text"
            className="form-control"
            id="reqamount"
            aria-describedby=""
            value={reqamount}
            readOnly 
            required
          />
        </div>
        <div className="mb-3">
          <label htmlFor="Spay" className="form-label">
            Price(RS) :
          </label>
          <input
            type="text"
            className="form-control"
            id="Spay"
            aria-describedby=""
            value={Price} // Display the calculated payment ID
            readOnly 
            required
          />
        </div>
        <div className="mb-3">
          <label htmlFor="date" className="form-label">
            Date :
          </label>
          <input
            type="date"
            className="form-control"
            id="date"
            max={new Date().toISOString().split('T')[0]}
            aria-describedby=""
            onChange={(e) => {
              setDate(e.target.value);
            }}
            required
          />
        </div>

        <br /><br></br>
        <button type="submit" className="btn btn-primary">
          Request
        </button>
      </form>
    </div>
  );
}
