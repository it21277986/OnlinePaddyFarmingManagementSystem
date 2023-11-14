import React, { useState, useEffect } from "react";
import axios from "axios";
import { Link } from 'react-router-dom';

function AllRaisedTicket() {

    const [tickets, setTickets] = useState([]);
    useEffect(() => {
        function getTickets() {
            axios.get("http://localhost:8070/ticket/ticket").then((res) => {
                setTickets(res.data)
                console.log(res);
            }).catch((err) => {
                alert(err.massage);
            })
        }
        getTickets();
    }, []);

    return (

        <div className="container">
            <div className="row">
                <div className="col-sm">
                <br />
                    <a href="/ssdashboard"><button type="submit" className="btn btn-outline-warning rounded-circle"><i class="fa-solid fa-arrow-left"></i></button></a>
                    <br /><br /><br /><br /><br /><br /><br /><br />
                    <h1>All Raised Tickets</h1>
                </div>
                <div className="col-sm">
                    <img className="img-fluid px-3 px-sm-4 mt-3 mb-4 a6"
                        src="imgLakmal/undraw_conference_re_2yld.svg" alt="..." />
                </div>
            </div>
            <div>
                <br />
                <dev>
                    <table className="table">
                        <thead>
                            <tr className="table-success"  >
                                <th scope="col" style={{ fontSize: '18px' }}>No</th>
                                <th scope="col" style={{ fontSize: '18px' }}>Farmer Name</th>
                                <th scope="col" style={{ fontSize: '18px' }}>NIC</th>
                                <th scope="col" style={{ fontSize: '18px' }}>Contact No</th>
                                <th scope="col" style={{ fontSize: '18px' }}>Fault</th>
                                <th scope="col" style={{ fontSize: '18px' }}>Fault Section</th>
                                <th scope="col" style={{ fontSize: '18px' }}>Action</th>
                            </tr>
                        </thead>
                        <tbody>

                            {tickets.map((ticket, index) => (
                                <tr key={ticket._id}>
                                    <th scope="row" style={{ fontSize: '18px' }}>{index + 1}</th>
                                    <td style={{ fontSize: '18px' }}>{ticket.farmerName}</td>
                                    <td style={{ fontSize: '18px' }}>{ticket.NIC}</td>
                                    <td style={{ fontSize: '18px' }}>{ticket.contactNo}</td>
                                    <td style={{ fontSize: '18px' }}>{ticket.fault}</td>
                                    <td style={{ fontSize: '18px' }}>{ticket.faultSection}</td>
                                    <td className="d-flex justify-content-between">
                                    <Link to={`/deleteticket/${ticket._id}`} className="btn btn-danger">
                                        <i className="fas fa-trash" /> Delete
                                    </Link>
                                    </td>
                                </tr>
                            ))}
                        </tbody>
                    </table>
                </dev>
            </div>
        </div>
    )
}
export default AllRaisedTicket;