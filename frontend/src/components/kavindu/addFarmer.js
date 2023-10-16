import react, { useEffect, useLayoutEffect, useState } from "react"
import axios from "axios";
import { useNavigate } from "react-router-dom";
import './CSS/AddFarmer.css';


export default function AddFarmer() {

    const navigate = useNavigate()

    const [nic, setNic] = useState("");
    const [name, setName] = useState("");
    const [contactNo, setContact] = useState("");
    const [plantedDate, setDate] = useState("");
    const [type, setType] = useState("");
    const [amount, setAmount] = useState("");
    const [contactNoError, setContactError] = useState("");
    const [nicError, setNicError] = useState("");
    const [totalPrice, settotalPrice] = useState("");

    const [Fertilizer, setFertilizer] = useState([]);


    useEffect(() => {
        function getFertilizer() {
            axios.get("http://localhost:8070/FertilizerStock/getStockDetails").then((res) => {
                setFertilizer(res.data)
            }).catch((err) => {
                alert(err.message);
            })
        }
        getFertilizer();
    }, []);
    useEffect(() => {
        handleSetfertilizerType()
    }, [type, amount]);

    // Validation (NIC,contact)
    const validateFarmerNIC = () => {
        if (!nic.match(/^\d{9}[vVxX]|\d{12}$/)) {
            setNicError("Invalid NIC format (e.g., 123456789V or 123456789000)");
        } else {
            setNicError("");
        }
    };

    const validateContactNo = () => {
        if (!contactNo.match(/^\d{10}$/)) {
            setContactError("Invalid Contact No format (e.g., 1234567890)");
        } else {
            setContactError("");
        }
    };

    function sendData(event) {
        event.preventDefault();

        validateContactNo();
        validateFarmerNIC();

        if (!nicError && !contactNoError) {
            const newFarmer = {
                nic,
                name,
                contactNo,
                plantedDate,
                type,
                amount,
                totalPrice,
            }

            axios.post("http://localhost:8070/FertilizerMgt/addRequest", newFarmer).then(() => {
                alert("Request proceeded")
                setNic("");
                setName("");
                setContact("");
                setDate("");
                setType("");
                setAmount("");
                settotalPrice("");
                navigate(-1);
            }).catch((err) => {
                alert(err)
            })
        }

    }

    const handleSetfertilizerType = () => {

        const data = Fertilizer.find(item => item.fertilizerName === type)

        if (data) {
            let Value = data.unitPrice

            let price = amount * Value

            console.log("price", price)
            settotalPrice(price)
        } else {

        }

    }

    return (
        <div className="overlayk">
            <div className="form-containerk">
                <div className="modal-containerk" style={{ textAlign: "left" }}><br/><br/><br/><br/>
                    <h2 style={{ textAlign: "center" }}>Fertilizer Request Form</h2>
                    <form onSubmit={sendData}>
                        <div class="form-group">
                            <label for="NIC">NIC No </label>
                            <input type="text" class="form-control" id="nic" placeholder="Enter NIC No"
                                onChange={(event) => {
                                    setNic(event.target.value);
                                }
                                } required
                                style={{color: "black"}}
                                onBlur={validateFarmerNIC}
                                maxLength={12} />
                            {nicError && (<div className="text-danger">{nicError}</div>)}
                        </div>

                        <div class="form-group">
                            <label for="name">Name </label>
                            <input type="text" class="form-control" id="name" placeholder="Enter name"
                                style={{color: "black"}}
                                onChange={(event) => {
                                    setName(event.target.value);
                                }
                                } />
                        </div>

                        <div class="form-group">
                            <label for="contact">Contact No </label>
                            <input type="text" class="form-control" id="contact" placeholder="Enter Contact No"
                                onChange={(event) => {
                                    setContact(event.target.value);
                                }
                                }
                                required
                                style={{color: "black"}}
                                onBlur={validateContactNo}
                                maxLength={10} />
                            {contactNoError && <div className="text-danger">{contactNoError}</div>}

                        </div>

                        <div class="form-group">
                            <label for="plantedDate">Planted Date </label>
                            <input type="date" class="form-control" id="plantedDate" placeholder="Enter Planted Date"
                                onChange={(event) => {
                                    setDate(event.target.value);
                                }
                                }
                                required
                                style={{color: "black"}}
                                max={new Date().toISOString().split("T")[0]} />
                        </div>

                        <div className="form-group">
                            <label htmlFor="fertilizerType">Fertilizer Type</label>
                            <select
                                className="form-control"
                                id="fertilizerType"
                                onChange={(event) => {
                                    setType(event.target.value);

                                }} required
                                style={{color: "black"}}
                            >
                                <option value="">select</option>
                                <option value="Urea">Urea</option>
                                <option value="T.S.P">T.S.P</option>
                                <option value="M.O.P">M.O.P</option>
                            </select>
                        </div>

                        <div class="form-group">
                            <label for="amount">Amount in kg </label>
                            <input type="text" class="form-control" id="amount" placeholder="Enter amount"
                                onChange={(event) => {
                                    setAmount(event.target.value);
                                }
                                }
                                required
                                style={{color: "black"}}
                                 />
                        </div>
                        <div class="form-group">
                            <label for="totalPrice">Total Price(Rs)</label>
                            <input type="text" value={totalPrice} class="form-control" id="totalPrice"
                            required
                            style={{color: "black"}}
                             />
                        </div>

                        <button type="submit" class="btn btn-success">Submit</button>
                    </form>
                </div>
            </div>
        </div>
    );
}
