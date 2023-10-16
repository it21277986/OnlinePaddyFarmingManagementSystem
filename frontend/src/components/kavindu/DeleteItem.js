import React, { useEffect, useState } from "react";
import axios from "axios";
import { useParams, useNavigate } from "react-router-dom";

function DeleteItem() {
    const { id } = useParams(); // Get the ID parameter from the URL
    const navigate = useNavigate();

    const [item, setItem] = useState(null);

    useEffect(() => {
        axios.get(`http://localhost:8070/FertilizerStock/getStockDetails/${id}`)
            .then((res) => {
                setItem(res.data.FertilizerStock);
            })
            .catch((err) => {
                console.error("Error fetching item data:", err);
            });
    }, [id]);

    const handleDelete = () => {
        axios.delete(`http://localhost:8070/FertilizerStock/deleteStockDetails/${id}`)
            .then((res) => {
                navigate('/admin/stock'); 
            })
            .catch((err) => {
                alert("Error deleting item:", err);
            });
    };

    return (
        <div className="container">
        <br/>
            <a href="/admin/stock"><button type="submit" className="btn btn-outline-warning rounded-circle"><i class="fa-solid fa-arrow-left"></i>Go Back</button></a>
            <br/><br/>
            <h2>Delete item</h2><br/>
            {item && (
                <div>
                    <p>Are you sure you want to delete this item: <b>{item.fertilizerName} ?</b></p>
                    <button type="button" className="btn btn-danger" onClick={handleDelete}>
                    <i className="fas fa-trash" />  Delete
                    </button>
                </div>
            )}
        </div>
    );
}

export default DeleteItem;
