import React, { useState, useEffect } from "react";
import axios from "axios";
import { Link } from 'react-router-dom';


function FertilizerStock() {

    const [fertilizer, setFertilizer] = useState([]);
    const [searchQuery, setSearchQuery] = useState("");

    useEffect(() => {
        function getFertilizer() {
            axios.get("http://localhost:8070/FertilizerStock/getStockDetails").then((res) => {
                setFertilizer(res.data)
            }).catch((err) => {
                alert(err.message);
            })
        }
        getFertilizer();
    }, []);

    // Filter the item based on the search query
    const filteredItems = fertilizer.filter((fertilizer) => {
        const fertilizerName = fertilizer.fertilizerName.toLowerCase();
        return fertilizerName.includes(searchQuery.toLowerCase());
    });

    return (
        <div className="container">
            <div className="row">
                <div className="col-sm">
                    <br/>
                    <a href="/admin"><button type="submit" className="btn btn-outline-warning rounded-circle"><i class="fa-solid fa-arrow-left"></i></button></a>
                    <br/><br/><br/><br/>
                    <h3 style={{color: '#005b42' }}>Stock Details</h3>
                    <hr className="border border-success border-2 opacity-50" /><br/>
                </div>
                {/* <div className="col-sm">
                    <img src="./components/images/undraw_access_denied_re_awnf.png" alt="Dashboard Icon" style={{ width: '30px', marginLeft: '10px' }} />
                </div> */}
                
            </div>
            <div>
                <input
                    type="text"
                    placeholder="Search by Fertilizer Name" 
                    value={searchQuery}
                    onChange={(e) => setSearchQuery(e.target.value)}
                    className="form-control mb-2"
                    style={{color: "black"}}
                /><br/>
            </div> 
            <table className="table">
                <thead>
                    <tr className="table-success">  
                        <th scope="col" style={{ fontSize: '16px' }}>No</th>
                        <th scope="col" style={{ fontSize: '16px' }}>Fertilizer Name</th>
                        <th scope="col" style={{ fontSize: '16px' }}>Fertilizer Quantity (kg)</th>
                        <th scope="col" style={{ fontSize: '16px' }}>Unit Price (Rs)</th>
                        <th scope="col" style={{ fontSize: '16px' }}>Action</th>
                    </tr>
                </thead>
                <tbody>
                    {filteredItems.map((fertilizer, index) => (
                        <tr key={fertilizer._id}>
                            <th scope="row" style={{ fontSize: '16px' }}>{index + 1}</th>
                            <td style={{ fontSize: '16px' }}>{fertilizer.fertilizerName}</td>
                            <td style={{ fontSize: '16px' }}>{fertilizer.fertilizerQuantity}</td>
                            <td style={{ fontSize: '16px' }}>{fertilizer.unitPrice}</td>
                            <td className="d-flex justify-content-between">
                                <Link to={`/admin/stock/updateStockDetails/${fertilizer._id}`} className="btn btn-success">
                                    <i className="fas fa-pen" /> Update
                                </Link>
                                <Link to={`/admin/stock/deleteStockDetails/${fertilizer._id}`} className="btn btn-danger">
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


export default FertilizerStock;