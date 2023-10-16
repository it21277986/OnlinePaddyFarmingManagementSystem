import React, { useState, useEffect } from "react";
import axios from "axios";
import { useParams,useNavigate } from "react-router-dom"; //Import useParams to get the ID parameter from the URL

function EditPaddymill() {
    const { id } = useParams(); //Get the ID parameter from the URL
    const navigate = useNavigate(); //Initialize the navigate function

    const [ownerName, setOwnerName] = useState("");
    const [NIC, setNIC] = useState("");
    const [contactNo, setContactNo] = useState("");
    const [address, setAddress] = useState("");
    const [district, setDistrict] = useState("");
    const [paddymillRegNo, setPaddymillRegNo] = useState("");
    const [password, setPassword] = useState("");
    const [cnfrmpassword, setCnfrmpassword] = useState("");

    useEffect(() => {
        axios.get(`http://localhost:8070/paddymill/getpm/${id}`)
            .then((res) => {
                const paddymillData = res.data.paddymill;
                setOwnerName(paddymillData.ownerName);
                setAddress(paddymillData.address);
                setDistrict(paddymillData.district);
                setNIC(paddymillData.NIC);
                setContactNo(paddymillData.contactNo);
                setPaddymillRegNo(paddymillData.paddymillRegNo);
                setPassword(paddymillData.password);
                setCnfrmpassword(paddymillData.cnfrmpassword);
            })
            .catch((error) => {
                console.error("Error fetching paddymill data:", error);
            });
    }, [id]);
    

    const handleUpdate = () => {
        const updatePaddymill = { ownerName, NIC, contactNo, address, district, paddymillRegNo, password, cnfrmpassword };
        axios.put(`http://localhost:8070/paddymill/updatepm/${id}`, updatePaddymill).then((res) => {
            //Handle success, you might want to redirect or perform other actions
            alert("Society updated successfully");
            navigate('/pm'); //Redirect to the AllSociety component
        }).catch((err) => {
            alert(err.message);
        });
    };

    return (
        <div className="container">
        <br/>
            <h2>Edit Paddymill Details</h2><br/>
            <form>
                <div className="form-group">
                    <label>Owner Name</label>
                    <input
                        type="text"
                        className="form-control"
                        value={ownerName}
                        onChange={(e) => setOwnerName(e.target.value)}
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
                    <label>Contact Number</label>
                    <input
                        type="text"
                        className="form-control"
                        value={contactNo}
                        onChange={(e) => setContactNo(e.target.value)}
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
                    <label>District</label>
                    <input
                        type="text"
                        className="form-control"
                        value={district}
                        onChange={(e) => setDistrict(e.target.value)}
                    />
                </div>
                <div className="form-group">
                    <label>Paddymill RegistrationNo</label>
                    <input
                        type="text"
                        className="form-control"
                        value={paddymillRegNo}
                        onChange={(e) => setPaddymillRegNo(e.target.value)}
                    />
                </div>
                <div className="form-group">
                    <label>Password</label>
                    <input
                        type="text"
                        className="form-control"
                        value={password}
                        onChange={(e) => setPassword(e.target.value)}
                    />
                </div>
                <div className="form-group">
                    <label>Confirm Password</label>
                    <input
                        type="text"
                        className="form-control"
                        value={cnfrmpassword}
                        onChange={(e) => setCnfrmpassword(e.target.value)}
                    />
            </div>
                <br/>
                <button type="button" className="btn btn-success" onClick={handleUpdate}>
                    Update
                </button>
            </form>
        </div>
    );
}

export default EditPaddymill;