import React, { useState } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";

export default function NewBreakdown() {
  const navigate = useNavigate();

  const [breakdown, setBreakdown] = useState("");
  const [description, setDescription] = useState("");
  const [contactno, setContactno] = useState("");

  function sendData(e) {
    e.preventDefault();


      const newBreakdown = {
        breakdown,
        description,
        contactno
      };

      axios
        .post("http://localhost:8070/breakdown/addBreakdown", newBreakdown)
        .then(() => {
          alert("Breakdown Inform Successfully");
          navigate("/"); // Redirect to the AllSociety component
        })
        .catch((err) => {
          alert(err.message); // Display the error message
        });
    }

  return (
    <div>
      <form className="container" onSubmit={sendData}>
      <br/>
        <div className="row">
            <div className="col-sm">
                <br/><br/><br/><br/><br/><br/><br/><br/><br/>
                <h2>Inform Breakdown</h2>
                <hr className="border border-success border-2 opacity-50"/>
            </div>
            <div className="col-sm">
                <img className="img-fluid px-3 px-sm-4 mt-3 mb-4 a6"
                src="imgLakmal/undraw_questions_re_1fy7.svg" alt="..." />
            </div>
        </div>
        <div className="mb-3">
          <label className="form-label"><h5>Breakdown Page</h5></label>
          <input
            type="text"
            className="form-control"
            id="breakdown"
            placeholder="Enter Breakdown Page"
            value={breakdown}
            style={{color: "black"}}
            onChange={(e) => {
              setBreakdown(e.target.value);
            }}
            required
          />
        </div>
        <div className="mb-3">
          <label className="form-label"><h5>Description</h5></label>
          <textarea 
            type="text"
            className="form-control form-floating-height"
            id="description"
            placeholder="Enter Breakdown Description"
            value={description}
            style={{color: "black"}}
            onChange={(e) => {
              setDescription(e.target.value);
            }}
            rows="10"
            required
          />
        </div>
        <div className="mb-3">
          <label className="form-label"><h5>Contact No</h5></label>
          <input
            type="tel"
            className="form-control"
            id="contactno"
            placeholder="Enter Contact No"
            value={contactno}
            style={{color: "black"}}
            onChange={(e) => {
              setContactno(e.target.value);
            }}
            required
          />
        </div>
        <br/>
        <button type="submit" className="btn btn-success">
          Submit
        </button>
      </form>
    </div>
  );
}
