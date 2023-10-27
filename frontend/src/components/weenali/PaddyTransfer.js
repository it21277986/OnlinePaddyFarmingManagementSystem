import React, { useState, useEffect } from "react";
import axios from "axios";
import { Link } from 'react-router-dom';
import HarvestMenu from './HarvestMenu';


function PaddyTransfer() {
    const [riceTypes, setRiceTypes] = useState([]);
    const [searchQuery, setSearchQuery] = useState("");
  
    useEffect(() => {
      function getRiceType() {
        axios
          .get("http://localhost:8070/ricetype/ricetype")
          .then((res) => {
            setRiceTypes(res.data);
          })
          .catch((err) => {
            alert(err.message);
          });
      }
      getRiceType();
    }, []);
  
    const filteredType = riceTypes.filter((riceType) => {
      const name = riceType.ricetypename.toLowerCase();
      return name.includes(searchQuery.toLowerCase());
    });

    return (
        
        //     <HarvestMenu/>
        <div className="container" align = "left">
            
            <div className="row">
                <div className="col-sm">
                    <br/>
                    <a href="/getDashboard"><button type="submit" className="btn btn-outline-warning rounded-circle"><i class="fa-solid fa-arrow-left"></i></button></a>
                    <br/><br/><br/><br/><br/><br/><br/><br/>
                    <h3>Paddy Transfer Details</h3><br/>
                </div>
               
            </div>
            <div>
                <input
                    type="text"
                    placeholder="Search by Name" 
                    value={searchQuery}
                    onChange={(e) => setSearchQuery(e.target.value)}
                    className="form-control mb-2"
                /><br/>
            </div> 
            <div className="container" align="left" >
                <table className="table" align="left">
                    <thead>
                        <tr className="table-success">  
                            <th scope="col">No</th>
                            <th scope="col">rice type</th>
                            <th scope="col">amount</th>
                            <th scope="col">Action</th>
                    </tr>
                </thead>
                <tbody>
                    {filteredType.map((riceType, index) => (
                        <tr key={riceType._id}>
                            <th scope="row">{index + 1}</th>
                <td>{riceType.ricetypename}</td>
                <td>{riceType.quantity}</td>
                
                <td className="d-flex justify-content-between">
                                    <Link to={`/UpdatePaddyTransfer/${riceType._id}`} className="btn btn-success">
                                        <i className="fas fa-pen" /> Edit
                                    </Link>
                                    
                                </td>
                            </tr>
                        ))}
                </tbody>
                </table>
            </div>
        </div>
    )
}

export default PaddyTransfer;