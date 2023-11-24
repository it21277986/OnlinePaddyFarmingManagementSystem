import React, { useState,useEffect } from "react";
import axios from "axios";
import { Navigate, useNavigate } from "react-router-dom";

export default function AddPrice() {
    const Navigate = useNavigate();

    const [paddyPrice, setPaddyPrice] = useState(0);
    const [pmCost, setPmCost] = useState(0);
    const [transport, setTransport] = useState(0);
    const wastage = 0.4; // Set wastage as a constant
    const profit = 0.25; // Set profit as a constant
    const [total, setTotal] = useState(0);
    const [tenders, setTenders] = useState([]);
    //calculate final price
    const calculateTotal = () => {
        const totalPrice = paddyPrice + pmCost + transport;
        const totalAfterWastage = totalPrice - (totalPrice * wastage); // Subtract wastage
        const totalWithProfit = totalAfterWastage + (totalAfterWastage * profit); // Add profit
        setTotal(totalWithProfit);
    };


    const getTenders = () => {
        axios.get("http://localhost:8070/tender/tender").then((res) => {
            setTenders(res.data);
        }).catch((err) => {
            alert(err.message);
        });
    };


    // Initialize variables to keep track of the lowest grindPrice and corresponding transportPrice.
let lowestGrindPrice = Infinity;
let lowestTransportPrice = null;

// Iterate through the data array to find the lowest grindPrice object.
for (const obj of tenders) {
    if (obj.grindPrice < lowestGrindPrice) {
        lowestGrindPrice = obj.grindPrice;
        lowestTransportPrice = obj.transportPrice;
    }
}

useEffect(() => {
    setPmCost(lowestGrindPrice)
    setTransport(lowestTransportPrice)
},[lowestGrindPrice,lowestTransportPrice])

    useEffect(() => {
        getTenders();
    })

    function sendData(e) {
        e.preventDefault();

        const newPrice = {
            paddyPrice,
            pmCost,
            transport,
            wastage, // Include wastage as a constant
            profit, // Include profit as a constant
            total,
        };

        axios
            .post("http://localhost:8070/price/addpmprice", newPrice)
            .then(() => {
                alert("Price Added");
            })
            .catch(() => {
                alert("Error");
            });
    }

    return (
        <div>
            <form className="container" onSubmit={sendData}>
                <br />
                <h2>Calculation of Final Price</h2>
                <br />
                <div className="mb-3">
                    <label className="form-label"><h5>Paddy Price (per kg)</h5></label>
                    <input
                        type="number"
                        className="form-control"
                        placeholder="Enter Paddy price"
                        value={paddyPrice}
                        style={{color: "black"}}
                        onChange={(e) => {
                            setPaddyPrice(parseFloat(e.target.value));
                        }}
                    />
                </div>
                <div className="mb-3">
                    <label className="form-label"><h5>Paddymill Charges</h5></label>
                    <input
                        type="number"
                        className="form-control"
                        placeholder="Enter Paddymill Charges"
                        value={pmCost}
                        style={{color: "black"}}
                        onChange={(e) => {
                            setPmCost(parseFloat(e.target.value));
                        }}
                    />
                </div>
                <div className="mb-3">
                    <label className="form-label"><h5>Transport Cost</h5></label>
                    <input
                        type="number"
                        className="form-control"
                        placeholder="Enter transport cost"
                        value={transport}
                        style={{color: "black"}}
                        onChange={(e) => {
                            setTransport(parseFloat(e.target.value));
                        }}
                    />
                </div>

                <div className="mb-3">
                    <label className="form-label"><h5>Total</h5></label>
                    <input
                        type="number"
                        className="form-control"
                        placeholder="Total"
                        value={total}
                        style={{color: "black"}}
                        disabled
                    />
                </div>

                <button
                    type="button"
                    className="btn btn-success"
                    onClick={calculateTotal}
                >
                    Calculate Total
                </button>

                <button type="submit" className="btn btn-success">
                    Submit
                </button>
            </form>
        </div>
    );
}
