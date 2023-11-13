import React, { useState, useEffect } from "react";
import axios from "axios";
import { Link } from 'react-router-dom';
import jsPDF from "jspdf";
import "jspdf-autotable";

function AllSociety() {
    const [societys, setSocieties] = useState([]);
    const [searchQuery, setSearchQuery] = useState("");

    useEffect(() => {
        function getSocieties() {
            axios.get("http://localhost:8070/society/Society").then((res) => {
                setSocieties(res.data)
            }).catch((err) => {
                alert(err.message);
            })
        }
        getSocieties();
    }, []);

    // Filter the societies based on the search query
    const filteredSocieties = societys.filter((society) => {
        const societyName = society.societyname.toLowerCase();
        return societyName.includes(searchQuery.toLowerCase());
    });

    const generatePDF = () => {

        const pdfDoc = new jsPDF();

        pdfDoc .text('Registed Society Report',15,15);

        const headers = ['No','Society Name','Reg ID','Address','President Name','President NIC','Contact No'];

        const data = filteredSocieties.map((society, index)=>[
            index + 1,
            society.societyname,
            society.regid,
            society.address,
            society.presidentname,
            society.presidentnic,
            society.contactno
        ]);

        const autotableConfig={
            startY:25,
            head:[headers],
        };
        pdfDoc.autoTable({...autotableConfig, body:data});

        pdfDoc.save('RegistedSocietyReport.pdf');
    };

    return (
        <div className="container">
            <div className="row">
                <div className="col-sm">
                    <br/>
                    <a href="/ssdashboard"><button type="submit" className="btn btn-outline-warning rounded-circle"><i class="fa-solid fa-arrow-left"></i></button></a>
                    <br/><br/><br/><br/><br/><br/><br/><br/>
                    <h3>All Society Details</h3><br/>
                </div>
                <div className="col-sm">
                    <img className="img-fluid px-3 px-sm-4 mt-3 mb-4 a6"
                        src="imgLakmal/undraw_interview_re_e5jn.svg" alt="..." />
                </div>
            </div>
            <div>
                <input
                    type="text"
                    placeholder="Search by Society Name" 
                    value={searchQuery}
                    onChange={(e) => setSearchQuery(e.target.value)}
                    className="form-control mb-2"
                    style={{color: "black"}}
                /><br/>
                <button className="btn btn-outline-success" onClick={generatePDF}>Generate PDF Report</button>
            </div> 
            <br/>
            <table className="table" >
                <thead>
                    <tr className="table-success">  
                        <th scope="col" style={{ fontSize: '16px' }}>No</th>
                        <th scope="col" style={{ fontSize: '16px' }}>Society Name</th>
                        <th scope="col" style={{ fontSize: '16px' }}>Reg ID</th>
                        <th scope="col" style={{ fontSize: '16px' }}>Address</th>
                        <th scope="col" style={{ fontSize: '16px' }}>President Name</th>
                        <th scope="col" style={{ fontSize: '16px' }}>President NIC</th>
                        <th scope="col" style={{ fontSize: '16px' }}>Contact No</th>
                        <th scope="col" style={{ fontSize: '16px' }}>Action</th>
                    </tr>
                </thead>
                <tbody>
                    {filteredSocieties.map((society, index) => (
                        <tr key={society._id}>
                            <th scope="row" style={{ fontSize: '16px' }}>{index + 1}</th>
                            <td style={{ fontSize: '16px' }}>{society.societyname}</td>
                            <td style={{ fontSize: '16px' }}>{society.regid}</td>
                            <td style={{ fontSize: '16px' }}>{society.address}</td>
                            <td style={{ fontSize: '16px' }}>{society.presidentname}</td>
                            <td style={{ fontSize: '16px' }}>{society.presidentnic}</td>
                            <td style={{ fontSize: '16px' }}>{society.contactno}</td>
                            <td className="d-flex justify-content-between">
                                <Link to={`/editSociety/${society._id}`} className="btn btn-success">
                                    <i className="fas fa-pen" /> Edit
                                </Link>
                                <Link to={`/deleteSociety/${society._id}`} className="btn btn-danger">
                                    <i className="fas fa-trash" /> Delete
                                </Link>
                            </td>
                        </tr>
                    ))}
                </tbody>
            </table>
        </div>
    )
}

export default AllSociety;
