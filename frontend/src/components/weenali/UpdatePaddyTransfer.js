import React, { useState, useEffect , initialValue} from "react";
import axios from "axios";
import { useParams,useNavigate } from "react-router-dom"; //Import useParams to get the ID parameter from the URL

function UpdatePaddyTransfer() {
    const { id } = useParams(); //Get the ID parameter from the URL
    const navigate = useNavigate(); //Initialize the navigate function

    const [ricetypename, setRicetype] = useState("");
    const [quantity, setAmount] = useState("");
    

    useEffect(() => {
        axios.get(`http://localhost:8070/ricetype/getRicetype/${id}`).then((res) => { //Fetch the society details using the ID
            const ricetypeData = res.data.riceTypes;
            
            setRicetype(ricetypeData.ricetypename);
            setAmount(ricetypeData.quantity);
           
        }).catch((err) => {
            alert(err.message);
        });
    }, [id]);

    const handleUpdate = () => {
        
        const updateRiceType = { ricetypename,quantity };
        axios.put(`http://localhost:8070/ricetype/updateRicetype/${id}`, updateRiceType).then((res) => {
            //Handle success, you might want to redirect or perform other actions
            alert("Paddy amount updated successfully");
            navigate('/transfer'); //Redirect to the AllSociety component
        }).catch((err) => {
            alert(err.message);
        });
    };

    return (
        <div className="container">
        <br/>
        <a href="/Harvest"><button type="submit" className="btn btn-outline-warning rounded-circle"><i class="fa-solid fa-arrow-left"></i></button></a>
            <br/><br/>
            <h2>Update Current Amount After Passing to Paddy Mill</h2><br/>
            <form>
                <div className="form-group">
                    <label>Rice Type</label>
                    <input
                        type="text"
                        className="form-control"
                        value={ricetypename}
                        onChange={(e) => setRicetype(e.target.value)}
                    />
                </div>
                <div className="form-group">
                    <label>Current Quantity (kg)</label>
                    <input
                        type="text"
                        className="form-control"
                        id = "avialable"
                        value={quantity}
                        onChange={(e) => setAmount(e.target.value)}
                    />
                </div>
                <div className="form-group">
                    <label>Paddy Mill Transfer Quantity (kg)</label>
                    <input
                        type="text"
                        className="form-control"
                        id = "transfer"    
                    />   
                </div>
                
                <br/>
                <button type="button" className="btn btn-success" onClick={Subtract}>
                    Calculate 
                </button>
                <br></br>
                <br></br>

                <button type="button" className="btn btn-success" onClick={handleUpdate}>
                    Update Paddy Transfer
                </button>

            </form>
        </div>
    );

    function Subtract() {
        var a = document.getElementById("avialable").value;
        var b = document.getElementById("transfer").value;
        var result = parseFloat(a) - parseFloat(b);
        document.getElementById("avialable").value = result;
        return result;
    };
}

export default UpdatePaddyTransfer;