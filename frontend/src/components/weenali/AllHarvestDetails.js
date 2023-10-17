import React, { useState, useEffect } from "react";
import axios from "axios";
import { Link } from 'react-router-dom';
import HarvestMenu from './HarvestMenu';


function AllHarvestDetails() {
    const [harvests, setHarvests] = useState([]);
    const [searchQuery, setSearchQuery] = useState("");
  
    useEffect(() => {
      function getHarvests() {
        axios
          .get("http://localhost:8070/harvest/Harvest")
          .then((res) => {
            setHarvests(res.data);
          })
          .catch((err) => {
            alert(err.message);
          });
      }
      getHarvests();
    }, []);
  
    const filteredHarvests = harvests.filter((harvest) => {
      const name = harvest.name.toLowerCase();
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
                    <h3>All Harvest Details</h3><br/>
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
                            <th scope="col">name</th>
                            <th scope="col">date</th>
                            <th scope="col">address</th>
                            <th scope="col">email</th>
                            <th scope="col">NIC</th>
                            <th scope="col">area</th>
                            <th scope="col">ricetype</th>
                            <th scope="col">Cultivated-Kg</th>
                            <th scope="col">Agreed-Kg</th>
                            <th scope="col">status</th>
                            <th scope="col">contactNumber</th>
                            <th scope="col">Action</th>
                    </tr>
                </thead>
                <tbody>
                    {filteredHarvests.map((harvest, index) => (
                        <tr key={harvest._id}>
                            <th scope="row">{index + 1}</th>
                <td>{harvest.name}</td>
                <td>{harvest.date}</td>
                <td>{harvest.address}</td>
                <td>{harvest.email}</td>
                <td>{harvest.NIC}</td>
                <td>{harvest.area}</td>
                <td>{harvest.ricetype}</td>
                <td>{harvest.cultivatedamount}</td>
                <td>{harvest.agreedamount}</td>
                <td>{harvest.status}</td>
                <td>{harvest.contactNumber}</td>
                <td className="d-flex justify-content-between">
                                    <Link to={`/UpdateReqDetails/${harvest._id}`} className="btn btn-success">
                                        <i className="fas fa-pen" /> Edit
                                    </Link>
                                    <Link to={`/DeleteReqDetails/${harvest._id}`} className="btn btn-danger">
                                        <i className="fas fa-trash" /> Delete
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

export default AllHarvestDetails;