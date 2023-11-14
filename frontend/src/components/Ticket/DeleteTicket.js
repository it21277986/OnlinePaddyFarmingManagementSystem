import React, { useEffect, useState } from "react";
import axios from "axios";
import { useParams, useNavigate } from "react-router-dom";

function DeleteTicket() {
    const { id } = useParams(); // Get the ID parameter from the URL
    const navigate = useNavigate();

    const [ticket, setTicket] = useState(null);

    useEffect(() => {
        axios.get(`http://localhost:8070/ticket/getticket/${id}`)
            .then((res) => {
                setTicket(res.data);
            })
            .catch((err) => {
                console.error("Error fetching ticket data:", err);
            });
    }, [id]);

    const handleDelete = () => {
        axios.delete(`http://localhost:8070/ticket/deleteticket/${id}`)
            .then((res) => {
                navigate('/ticket'); // Use navigate instead of useHistory
            })
            .catch((err) => {
                alert("Error deleting ticket:", err);
            });
    };

    return (
        <div className="container">
        <br/>
        <a href="/ticket"><button type="submit" className="btn btn-outline-warning rounded-circle"><i class="fa-solid fa-arrow-left"></i></button></a>
            <br/><br/>
            <h2>Delete Ticket</h2><br/>
            {ticket && (
                <div>
                    <p>Are you sure you want to delete the ticket: <b>{ticket.farmerName} ?</b></p>
                    <button type="button" className="btn btn-danger" onClick={handleDelete}>
                    <i className="fas fa-trash" />  Delete
                    </button>
                </div>
            )}
        </div>
    );
}

export default DeleteTicket;
