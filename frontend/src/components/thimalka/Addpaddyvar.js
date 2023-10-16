import React, { useState } from 'react';
import axios from 'axios';

export default function Addpaddyvar() {

  //setting veriables
  const [Varietyname, setVariety] = useState('');
  const [yor, setYor] = useState('');
  const [Maturity, setMaturity] = useState('');
  const [Plantheight, setPlant] = useState('');
  const [colour, setClr] = useState('');
  const [Recommendation, setRec] = useState('');

  //store data into variables
  function sendData(e) {
    e.preventDefault();

    //creact object from variables
    const newAddpaddyvar = {
      Varietyname,
      yor,
      Maturity,
      Plantheight,
      colour,
      Recommendation
    };

    //path
    axios.post('http://localhost:8070/paddyvar/addPaddyvar', newAddpaddyvar)
      .then(() => {
        alert('Added')

      })
      .catch((err) => {
        alert(err);
      });
  }

  return (
    <div className="container" >
      <form onSubmit={sendData}>
        <div className="mb-3">
          <div className="row">
            <div className="col-sm">
              <br /><br /><br /><br /><br /><br /><br></br>
              <h2>Add Paddy Varieties</h2>
              <hr className="border border-success border-2 opacity-50" />
            </div>
            <div className="col-sm">
              <img className="img-fluid px-3 px-sm-4 mt-3 mb-4 a6"
                src="thimalkaimg/undraw_add_files_re_v09g.svg" alt="..." />
            </div>
          </div>
          <br></br><br></br>
          <label htmlFor="Varietyname" className="form-label">
          <h5>Variety name :</h5>
          </label>
          <input
            type="text"
            className="form-control"
            id="Varietyname"
            aria-describedby=""
            onChange={(e) => {
              setVariety(e.target.value);
            }}
            style={{color: "black"}}
          />
        </div>
        <div className="mb-3">
          <label htmlFor="yor" className="form-label">
          <h5>YOR :</h5>
          </label>
          <input
            type="text"
            className="form-control"
            id="yor"
            aria-describedby=""
            onChange={(e) => {
              setYor(e.target.value);
            }}
            style={{color: "black"}}
          />
        </div>
        <div className="mb-3">
          <label htmlFor="Maturity" className="form-label">
          <h5>Maturity :</h5>
          </label>
          <input
            type="text"
            className="form-control"
            id="Maturity"
            aria-describedby=""
            onChange={(e) => {
              setMaturity(e.target.value);
            }}
            style={{color: "black"}}
          />
        </div>
        <div className="mb-3">
          <label htmlFor="Plantheight" className="form-label">
          <h5>Plant height :</h5>
          </label>
          <input
            type="text"
            className="form-control"
            id="Plantheight"
            aria-describedby=""
            onChange={(e) => {
              setPlant(e.target.value);
            }}
            style={{color: "black"}}
          />
        </div>
        <div className="mb-3">
          <label htmlFor="colour" className="form-label">
          <h5>colour :</h5>
          </label>
          <input
            type="text"
            className="form-control"
            id="colour"
            aria-describedby=""
            onChange={(e) => {
              setClr(e.target.value);
            }}
            style={{color: "black"}}
          />
        </div>
        <div className="mb-3">
          <label htmlFor="Recommendation" className="form-label">
            <h5>Recommendation :</h5>
          </label>
          <input
            type="text"
            className="form-control"
            id="Recommendation"
            aria-describedby=""
            onChange={(e) => {
              setRec(e.target.value);
            }}
            style={{color: "black"}}
          />
        </div>
        <br></br>
        <button type="submit" className="btn btn-success">ADD</button>
      </form>
      <br></br>
    </div>
  );
}
