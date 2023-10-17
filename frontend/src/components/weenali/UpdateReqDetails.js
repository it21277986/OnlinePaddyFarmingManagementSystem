import React, { useState, useEffect } from "react";
import axios from "axios";
import { useParams,useNavigate } from "react-router-dom"; //Import useParams to get the ID parameter from the URL

function UpdateReqDetails() {
    const { id } = useParams(); //Get the ID parameter from the URL
    const navigate = useNavigate(); //Initialize the navigate function

    const [name, setName] = useState("");
   
    const [date, setDate] = useState("");
    const [address, setAddress] = useState("");
    const [email, setEmail] = useState("");
    const [NIC, setNIC] = useState("");
    const [area, setArea] = useState("");
    const [ricetype, setRicetype] = useState("");
    const [cultivatedamount, setCultivatedamount] = useState("");
    const [agreedamount, setAgreedamount] = useState("");
    const [contactNumber, setContactNumber] = useState("");
    // const [NicError, setNicError] = useState("");
    const [status, setStatus] = useState("");
    // const [contactNumberError, setContactNumberError] = useState("");

    useEffect(() => {
        axios.get(`http://localhost:8070/harvest/getHarvest/${id}`).then((res) => { //Fetch the society details using the ID
            const harvestsData = res.data.harvest;
            
            setName(harvestsData.name);
            
            setDate(harvestsData.date);
            setAddress(harvestsData.address);
            setEmail(harvestsData.email);
            setNIC(harvestsData.NIC);
            setArea(harvestsData.area);
            setRicetype(harvestsData.ricetype);
            setCultivatedamount(harvestsData.cultivatedamount);
            setAgreedamount(harvestsData.agreedamount);
            setContactNumber(harvestsData.contactNumber);
            setStatus(harvestsData.status);
        }).catch((err) => {
            alert(err.message);
        });
    }, [id]);

    const handleUpdate = () => {
        const updatedFarmer = { name,id,date,address,email,NIC,area,ricetype,cultivatedamount,agreedamount,contactNumber,status };
        axios.put(`http://localhost:8070/harvest/updateHarvest/${id}`, updatedFarmer).then((res) => {
            //Handle success, you might want to redirect or perform other actions
            alert("Society updated successfully");
            navigate('/Harvest'); //Redirect to the AllSociety component
        }).catch((err) => {
            alert(err.message);
        });
    };

    return (
        <div className="container">
        <br/>
        <a href="/Harvest"><button type="submit" className="btn btn-outline-warning rounded-circle"><i class="fa-solid fa-arrow-left"></i></button></a>
            <br/><br/>
            <h2>Edit Harvest Details</h2><br/>
            <form>
                <div className="form-group">
                    <label>Farmer Name</label>
                    <input
                        type="text"
                        className="form-control"
                        value={name}
                        onChange={(e) => setName(e.target.value)}
                    />
                </div>
               
                <div className="form-group">
                    <label>Date</label>
                    <input
                        type="text"
                        className="form-control"
                        value={date}
                        onChange={(e) => setDate(e.target.value)}
                    />
                </div>
                <div className="form-group">
                    <label>Address</label>
                    <input
                        type="text"
                        className="form-control"
                        value={address}
                        onChange={(e) => setAddress(e.target.value)}
                    />
                </div>
                <div className="form-group">
                    <label>Email</label>
                    <input
                        type="text"
                        className="form-control"
                        value={email}
                        onChange={(e) => setEmail(e.target.value)}
                    />
                </div>
                <div className="form-group">
                    <label>NIC</label>
                    <input
                        type="text"
                        className="form-control"
                        value={NIC}
                        onChange={(e) => setNIC(e.target.value)}
                    />
                </div>
                <div className="form-group">
                    <label>Area</label>
                    <input
                        type="text"
                        className="form-control"
                        value={area}
                        onChange={(e) => setArea(e.target.value)}
                    />
                </div>
                <div className="form-group">
                    <label>Rice Type</label>
                    <input
                        type="text"
                        className="form-control"
                        value={ricetype}
                        onChange={(e) => setRicetype(e.target.value)}
                    />
                </div>
                <div className="form-group">
                    <label>Cultivated-Kg</label>
                    <input
                        type="text"
                        className="form-control"
                        value={cultivatedamount}
                        onChange={(e) => setCultivatedamount(e.target.value)}
                    />
                </div>
                <div className="form-group">
                    <label>Agreed-Kg</label>
                    <input
                        type="text"
                        className="form-control"
                        value={agreedamount}
                        onChange={(e) => setAgreedamount(e.target.value)}
                    />
                </div>
                <div className="form-group">
                    <label>Status</label>
                    <input
                        type="text"
                        className="form-control"
                        value={status}
                        onChange={(e) => setStatus(e.target.value)}
                    />
                </div>
                <div className="form-group">
                    <label>Contact No</label>
                    <input
                        type="text"
                        className="form-control"
                        value={contactNumber}
                        onChange={(e) => setContactNumber(e.target.value)}
                    />
                </div>
                <br/>
                <button type="button" className="btn btn-success" onClick={handleUpdate}>
                    Update Request
                </button>
            </form>
        </div>
    );
}

export default UpdateReqDetails;