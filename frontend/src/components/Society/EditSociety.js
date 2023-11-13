import React, { useState, useEffect } from "react";
import axios from "axios";
import { useParams,useNavigate } from "react-router-dom"; //Import useParams to get the ID parameter from the URL

function EditSociety() {
    const { id } = useParams(); //Get the ID parameter from the URL
    const navigate = useNavigate(); //Initialize the navigate function

    const [societyname, setSocietyname] = useState("");
    const [regid, setRegid] = useState("");
    const [address, setAddress] = useState("");
    const [presidentname, setPresidentname] = useState("");
    const [presidentnic, setPresidentnic] = useState("");
    const [contactno, setContactno] = useState("");

    useEffect(() => {
        axios.get(`http://localhost:8070/society/getSociety/${id}`).then((res) => { //Fetch the society details using the ID
            const societyData = res.data.society;
            setSocietyname(societyData.societyname);
            setRegid(societyData.regid);
            setAddress(societyData.address);
            setPresidentname(societyData.presidentname);
            setPresidentnic(societyData.presidentnic);
            setContactno(societyData.contactno);
        }).catch((err) => {
            alert(err.message);
        });
    }, [id]);

    const handleUpdate = () => {
        const updatedSociety = { societyname,regid,address,presidentname,presidentnic,contactno };
        axios.put(`http://localhost:8070/society/updateSociety/${id}`, updatedSociety).then((res) => {
            //Handle success, you might want to redirect or perform other actions
            alert("Society updated successfully");
            navigate('/Society'); //Redirect to the AllSociety component
        }).catch((err) => {
            alert(err.message);
        });
    };

    return (
        <div className="container">
        <br/>
        <a href="/Society"><button type="submit" className="btn btn-outline-warning rounded-circle"><i class="fa-solid fa-arrow-left"></i></button></a>
            <br/><br/>
            <h2>Edit Society Details</h2><br/>
            <form>
                <div className="form-group">
                    <label><h5>Society Name</h5></label>
                    <input
                        type="text"
                        className="form-control"
                        value={societyname}
                        onChange={(e) => setSocietyname(e.target.value)}
                        style={{color: "black"}}
                    />
                </div>
                <div className="form-group">
                    <label><h5>Registration No</h5></label>
                    <input
                        type="text"
                        className="form-control"
                        value={regid}
                        onChange={(e) => setRegid(e.target.value)}
                        style={{color: "black"}}
                    />
                </div>
                <div className="form-group">
                    <label><h5>Address</h5></label>
                    <input
                        type="text"
                        className="form-control"
                        value={address}
                        onChange={(e) => setAddress(e.target.value)}
                        style={{color: "black"}}
                    />
                </div>
                <div className="form-group">
                    <label><h5>President Name</h5></label>
                    <input
                        type="text"
                        className="form-control"
                        value={presidentname}
                        onChange={(e) => setPresidentname(e.target.value)}
                        style={{color: "black"}}
                    />
                </div>
                <div className="form-group">
                    <label><h5>President NIC</h5></label>
                    <input
                        type="text"
                        className="form-control"
                        value={presidentnic}
                        onChange={(e) => setPresidentnic(e.target.value)}
                        style={{color: "black"}}
                    />
                </div>
                <div className="form-group">
                    <label><h5>Contact No</h5></label>
                    <input
                        type="text"
                        className="form-control"
                        value={contactno}
                        onChange={(e) => setContactno(e.target.value)}
                        style={{color: "black"}}
                    />
                </div>
                <br/>
                <button type="button" className="btn btn-success" onClick={handleUpdate}>
                    Update Society
                </button>
            </form>
        </div>
    );
}

export default EditSociety;