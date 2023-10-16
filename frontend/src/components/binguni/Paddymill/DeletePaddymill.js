import React, { useEffect, useState } from "react";
import axios from "axios";
import { useParams, useNavigate } from "react-router-dom";

function DeletePaddymill() {
    const { id } = useParams(); // Get the ID parameter from the URL
    const navigate = useNavigate();

    const [paddymill, setPaddymill] = useState(null);

    useEffect(() => {
        axios.get(`http://localhost:8070/paddymill/getpm/${id}`)
            .then((res) => {
                setPaddymill(res.data.paddymill);
            })
            .catch((err) => {
                console.error("Error fetching paddymill data:", err);
            });
    }, [id]);

    const handleDelete = () => {
        axios.delete(`http://localhost:8070/paddymill/deletepm/${id}`)
            .then((res) => {
                alert("Paddymill deleted successfully");
                navigate('/pm'); // Use navigate instead of useHistory
            })
            .catch((err) => {
                alert("Error deleting paddymill:", err);
            });
    };

    return (
        <div className="container">
        <br/>
            <h2>Delete Society</h2><br/>
            {paddymill && (
                <div>
                    <p>Are you sure you want to delete the society: <b>{paddymill.ownerName} ?</b></p>
                    <button type="button" className="btn btn-danger" onClick={handleDelete}>
                        Delete
                    </button>
                </div>
            )}
        </div>
    );
}

export default DeletePaddymill;
