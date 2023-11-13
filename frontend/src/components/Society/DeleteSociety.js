import React, { useEffect, useState } from "react";
import axios from "axios";
import { useParams, useNavigate } from "react-router-dom";

function DeleteSociety() {
    const { id } = useParams(); // Get the ID parameter from the URL
    const navigate = useNavigate();

    const [society, setSociety] = useState(null);

    useEffect(() => {
        axios.get(`http://localhost:8070/society/getSociety/${id}`)
            .then((res) => {
                setSociety(res.data.society);
            })
            .catch((err) => {
                console.error("Error fetching society data:", err);
            });
    }, [id]);

    const handleDelete = () => {
        axios.delete(`http://localhost:8070/society/deleteSociety/${id}`)
            .then((res) => {
                navigate('/Society'); // Use navigate instead of useHistory
            })
            .catch((err) => {
                alert("Error deleting society:", err);
            });
    };

    return (
        <div className="container">
        <br/>
            <a href="/Society"><button type="submit" className="btn btn-outline-warning rounded-circle"><i class="fa-solid fa-arrow-left"></i></button></a>
            <br/><br/>
            <h2>Delete Society</h2><br/>
            {society && (
                <div>
                    <p>Are you sure you want to delete the society: <b>{society.societyname} ?</b></p>
                    <button type="button" className="btn btn-danger" onClick={handleDelete}>
                    <i className="fas fa-trash" />  Delete
                    </button>
                </div>
            )}
        </div>
    );
}

export default DeleteSociety;
