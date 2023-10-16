import React, { useState } from "react";
import axios from "axios";
import { Navigate, useNavigate } from "react-router-dom";

export default function AddTender() {
    const Navigate = useNavigate();

    const [PaddymillName, setPaddymillName] = useState("");
    const [pmNo, setpmNo] = useState("");
    const [district, setdistrict] = useState("");
    const [capacity, setcapacity] = useState("");
    const [lorryCount, setlorryCount] = useState("");
    const [riceType, setriceType] = useState("");
    const [grindPrice, setgrindPrice] = useState("");
    const [transportPrice, settransportPrice] = useState("");

    function sendData(e) {
        e.preventDefault();

        const newTender = {
            PaddymillName,
            pmNo,
            district,
            capacity,
            lorryCount,
            riceType,
            grindPrice,
            transportPrice

        }

        axios.post("http://localhost:8070/tender/addtender", newTender).then(() => {
            alert("Tender Submitted")
            Navigate("/pmhome")

        }).catch(() => {
            alert("Error")
        })
    }

    return (
        <div>
            <form className="container" onSubmit={sendData}>
                <br />
                <h2>Tender</h2><br />
                <div className="mb-3">
                    <label className="form-label"><h5>Paddymill Name</h5></label>
                    <input type="text" className="form-control" id="PaddymillName" placeholder="Enter Paddymill Name" onChange={(e) => { setPaddymillName(e.target.value); }} required style={{color: "black"}}/>
                </div>
                <div className="mb-3">
                    <label className="form-label"><h5>Paddymill Registration Number</h5></label>
                    <input type="number" className="form-control" id="pmNo" placeholder="Enter Paddymill Registration Number" onChange={(e) => { setpmNo(e.target.value); }} required style={{color: "black"}}/>
                </div>
                <div className="mb-3">
                    <label className="form-label"><h5>District</h5></label>
                    <select className="form-select" id="district" onChange={(e) => { setdistrict(e.target.value); }} required>
                        <option value="">Select District</option>
                        <option value="Colombo">Colombo </option>
                        <option value="Anuradhapura">Anuradhapura</option>
                        <option value="Kandy">Kandy </option>
                        <option value="Gampaha">Gampaha</option>
                        <option value="Kalutara">Kalutara</option>
                        <option value="Matale">Matale</option>
                        <option value="NuwaraEliya">Nuwara Eliya</option>
                        <option value="Galle">Galle</option>
                        <option value="Matara">Matara</option>
                        <option value="Hambantota">Hambantota</option>
                        <option value="Jaffna">Jaffna</option>
                        <option value="Kilinochchi">Kilinochchi</option>
                        <option value="Mannar">Mannar</option>
                        <option value="Vavuniya">Vavuniya</option>
                        <option value="Mullaitivu">Mullaitivu</option>
                        <option value="Batticaloa">Batticaloa</option>
                        <option value="Ampara">Ampara</option>
                        <option value="Trincomalee">Trincomalee</option>
                        <option value="Kurunegala">Kurunegala</option>
                        <option value="Puttalam">Puttalam</option>
                        <option value="Anuradhapura">Anuradhapura</option>
                        <option value="Polonnaruwa">Polonnaruwa</option>
                        <option value="Badulla">Badulla</option>
                        <option value="Moneragala">Moneragala</option>
                        <option value="Ratnapura">Ratnapura</option>
                        <option value="Kegalle">Kegalle</option>
                    </select>
                </div>

                <div className="mb-3">
                    <label className="form-label"><h5>Maximum Storage Capacity</h5></label>
                    <input type="text" className="form-control" id="capacity" placeholder="Enter Storage Capacity" onChange={(e) => { setcapacity(e.target.value); }} required style={{color: "black"}}/>
                </div>
                <div className="mb-3">
                    <label className="form-label"><h5>Number of vehicals</h5></label>
                    <input type="text" className="form-control" id="lorryCount " placeholder="Enter Vehicale Cepability " onChange={(e) => { setlorryCount(e.target.value); }} required style={{color: "black"}}/>
                </div>
                <div className="mb-3">
                    <label className="form-label"><h5>Rice Type</h5></label>
                    <select className="form-select" id="riceType" onChange={(e) => { setriceType(e.target.value); }} required>
                        <option value="">Select Rice Type</option>
                        <option value="KiriSamba">Kiri Samba</option>
                        <option value="WhiteRice">White Rice</option>
                        <option value="RedRice">Red Rice</option>
                    </select>
                </div>

                <div className="mb-3">
                    <label className="form-label"><h5>Total price for grinding</h5></label>
                    <input type="text" className="form-control" id="grindPrice" placeholder="Enter total price for grinding" onChange={(e) => { setgrindPrice(e.target.value); }} required style={{color: "black"}}/>
                </div>
                <div className="mb-3">
                    <label className="form-label"><h5>Total price for transportation</h5></label>
                    <input type="text" className="form-control" id="transportPrice" placeholder="Enter total price for transporataion" onChange={(e) => { settransportPrice(e.target.value); }} required style={{color: "black"}}/>
                </div>
                <button type="submit" className="btn btn-success">Submit</button>
            </form>
        </div>
    )
}

