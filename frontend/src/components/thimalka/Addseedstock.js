import React, { useState } from 'react';
import axios from 'axios';

export default function Addseedstock() {

  //setting veriables
  const [seedtype, setSeedtype] = useState('');
  const [quantity, setQuantity] = useState('');
  const [date, setDate] = useState('');
  const [rol, setRol] = useState('');

  //store data into variables
  function sendData(e) {
    e.preventDefault();

    //creact object from variables
    const newAddseedstock = {
      seedtype,
      quantity,
      date,
      rol
    };

    //path
    axios.post('http://localhost:8070/seed/addSeed', newAddseedstock)
      .then(() => {
        alert('Request sent')
      })
      .catch((err) => {
        alert(err);
      });
  }

  return (
    <div className="container">
      <form onSubmit={sendData}>
        <div className="row">
          <div className="col-sm">
            <br /><br /><br /><br /><br /><br /><br /><br />
            <h2>Add Seed Stock</h2>
            <hr className="border border-success border-2 opacity-50" />
          </div>
          <div className="col-sm">
            <img className="img-fluid px-3 px-sm-4 mt-3 mb-4 a6"
              src="thimalkaimg/undraw_sorting_thoughts_re_fgli.svg" alt="..." />
          </div>
        </div>
        <div className="mb-3">
          <label htmlFor="seedtype" className="form-label">
            <h5>Seed Type:</h5>
          </label>
          <select
            className="form-select"
            id="seedtype"
            onChange={(e) => {
              setSeedtype(e.target.value);
            }}
            required
            style={{color: "black"}}
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
          <label htmlFor="quantity" className="form-label">
          <h5>Quantity(KG) :</h5>
          </label>
          <input
            type="text"
            className="form-control"
            id="quantity"
            aria-describedby=""
            onChange={(e) => {
              setQuantity(e.target.value);
            }}
            required
            style={{color: "black"}}
          />
        </div>
        <div className="mb-3">
          <label htmlFor="date" className="form-label">
          <h5>Date :</h5>
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
            style={{color: "black"}}
          />
        </div>
        <div className="mb-3">
          <label htmlFor="rol" className="form-label">
          <h5>ROL :</h5>
          </label>
          <input
            type="text"
            className="form-control"
            id="rol"
            aria-describedby=""
            onChange={(e) => {
              setRol(e.target.value);
            }}
            required
            style={{color: "black"}}
          />
        </div>
        <br></br>
        <button type="submit" className="btn btn-success">ADD</button>
      </form>
      <br/><br/>
    </div>
  );
}
