import React, { useState, useEffect } from "react";
import axios from "axios";

export default function AllPaddyvar() {
  const [paddyvar, setPaddyvar] = useState([]);
  const [searchQuery, setSearchQuery] = useState("");

  useEffect(() => {
    function getPaddyvar() {
      axios.get("http://localhost:8070/paddyvar/Paddyvar").then((res) => {
        setPaddyvar(res.data);
      }).catch((err) => {
        alert(err.message);
      });
    }
    getPaddyvar();
  }, []);

  // Filter the paddyvar based on the search query
  const filteredPaddyvar = paddyvar.filter((paddy) => {
    const varietyName = paddy.Varietyname.toLowerCase();
    return varietyName.includes(searchQuery.toLowerCase());
  });

  return (
    <div className="container">
      <div className="row">
        <div className="row">
          <div className="col-sm">
            <br /><br /><br /><br /><br /><br /><br></br>
            <h2>Everthing About Paddy Varieties</h2>
            <hr className="border border-success border-2 opacity-50" />
          </div>
          <div className="col-sm">
            <img className="img-fluid px-3 px-sm-4 mt-3 mb-4 a6"
              src="thimalkaimg/undraw_all_the_data_re_hh4w.svg" alt="..." />
          </div>
        </div>
        <br></br><br></br>
      </div>
      <div>
        <input
          type="text"
          placeholder="Search by Variety Name"
          value={searchQuery}
          onChange={(e) => setSearchQuery(e.target.value)}
          className="form-control mb-2"
          style={{color: "black"}}
        /><br />
      </div>
      <table className="table">
        <thead>
          <tr className="table-success">
            <th scope="col" style={{ fontSize: '16px' }}>Variety Name</th>
            <th scope="col" style={{ fontSize: '16px' }}>Year of Release</th>
            <th scope="col" style={{ fontSize: '16px' }}>Maturity</th>
            <th scope="col" style={{ fontSize: '16px' }}>Plant Height</th>
            <th scope="col" style={{ fontSize: '16px' }}>Color</th>
            <th scope="col" style={{ fontSize: '16px' }}>Recommendation</th>
          </tr>
        </thead>
        <tbody>
          {filteredPaddyvar.map((paddy, index) => (
            <tr key={paddy._id}>
              <td style={{ fontSize: '14px' }}>{paddy.Varietyname}</td>
              <td style={{ fontSize: '14px' }}>{paddy.yor}</td>
              <td style={{ fontSize: '14px' }}>{paddy.Maturity}</td>
              <td style={{ fontSize: '14px' }}>{paddy.Plantheight}</td>
              <td style={{ fontSize: '14px' }}>{paddy.colour}</td>
              <td style={{ fontSize: '14px' }}>{paddy.Recommendation}</td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}
