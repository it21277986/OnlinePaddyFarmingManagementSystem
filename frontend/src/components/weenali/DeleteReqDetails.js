import React, { useEffect, useState } from "react";
import axios from "axios";
import { useParams, useNavigate } from "react-router-dom";

function DeleteReqDetails() {
    const { id } = useParams(); // Get the ID parameter from the URL
    const navigate = useNavigate();

    const [harvest, setHarvests] = useState(null);

    useEffect(() => {
        axios.get(`http://localhost:8070/harvest/getHarvest/${id}`)
            .then((res) => {
                setHarvests(res.data.harvest);
            })
            .catch((err) => {
                console.error("Error fetching society data:", err);
            });
    }, [id]);

    const handleDelete = () => {
        axios.delete(`http://localhost:8070/harvest/deleteHarvest/${id}`)
            .then((res) => {
                navigate('/Harvest'); // Use navigate instead of useHistory
            })
            .catch((err) => {
                alert("Error deleting society:", err);
            });
    };

    return (
        <div className="container">
        <br/>
            <a href="/Harvest"><button type="submit" className="btn btn-outline-warning rounded-circle"><i class="fa-solid fa-arrow-left"></i></button></a>
            <br/><br/>
            <h2>Delete Farmers Details</h2><br/>
            {harvest && (
                <div>
                    <p>Are you sure you want to delete the society: <b>{harvest.name} ?</b></p>
                    <button type="button" className="btn btn-danger" onClick={handleDelete}>
                    <i className="fas fa-trash" />  Delete
                    </button>
                </div>
            )}
        </div>
    );
}

export default DeleteReqDetails;