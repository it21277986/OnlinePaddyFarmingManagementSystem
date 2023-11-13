import React, { useState, useEffect } from "react";
import axios from "axios";
import { Link } from 'react-router-dom';

function AllBreakdown() {

    const [breakdowns, setBreakdowns] = useState([]);
    useEffect(() => {
        function getBreakdowns() {
            axios.get("http://localhost:8070/breakdown/Breakdown").then((res) => {
                setBreakdowns(res.data)
                console.log(res);
            }).catch((err) => {
                alert(err.massage);
            })
        }
        getBreakdowns();
    }, []);

    return (

        <div className="container">
            <div className="row">
                <div className="col-sm">
                <br />
                    <a href="/ssdashboard"><button type="submit" className="btn btn-outline-warning rounded-circle"><i class="fa-solid fa-arrow-left"></i></button></a>
                    <br /><br /><br /><br /><br /><br /><br /><br />
                    <h3>All Informed Breakdown</h3>
                </div>
                <div className="col-sm">
                    <img className="img-fluid px-3 px-sm-4 mt-3 mb-4 a6"
                        src="imgLakmal/undraw_questions_re_1fy7.svg" alt="..." />
                </div>
            </div>
            <div>
                <br />
                <dev>
                    <table className="table">
                        <thead>
                            <tr className="table-success">
                                <th scope="col" style={{ fontSize: '16px' }}>No</th>
                                <th scope="col" style={{ fontSize: '16px' }}>Breakdown Page</th>
                                <th scope="col" style={{ fontSize: '16px' }}>Description</th>
                                <th scope="col" style={{ fontSize: '16px' }}>Contact No</th>
                            </tr>
                        </thead>
                        <tbody>

                            {breakdowns.map((breakdown, index) => (
                                <tr key={breakdown._id}>
                                    <th scope="row" style={{ fontSize: '16px' }}>{index + 1}</th>
                                    <td style={{ fontSize: '16px' }}>{breakdown.breakdown}</td>
                                    <td style={{ fontSize: '16px' }}>{breakdown.description}</td>
                                    <td style={{ fontSize: '16px' }}>{breakdown.contactno}</td>
                                </tr>
                            ))}
                        </tbody>
                    </table>
                </dev>
            </div>
        </div>
    )
}
export default AllBreakdown;