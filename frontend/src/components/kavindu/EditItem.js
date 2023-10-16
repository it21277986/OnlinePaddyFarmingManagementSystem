import { useEffect, useState } from "react";
import { Link, useNavigate, useParams } from "react-router-dom";
import axios from "axios";


const EditItem =()=>{

    const { id } = useParams(); 
    const navigate = useNavigate(); 

    const [fertilizerName, setfertilizerName] = useState("");
    const [fertilizerQuantity, setfertilizerQuantity] = useState("");
    const [unitPrice, setunitPrice] = useState("");

    useEffect(() => {
        axios.get(`http://localhost:8070/FertilizerStock/getStockDetails/${id}`).then((res) => { 
            const itemData = res.data.FertilizerStock;
            setfertilizerName(itemData.fertilizerName);
            setfertilizerQuantity(itemData.fertilizerQuantity);
            setunitPrice(itemData.unitPrice);
        
        }).catch((err) => {
            alert(err.message);
        });
    }, [id]);

    const handleUpdate = () => {
        const updateStock = { fertilizerName, fertilizerQuantity, unitPrice };
    
        axios
          .put(`http://localhost:8070/FertilizerStock/updateStockDetails/${id}`, updateStock)
          .then((res) => {
            alert("Data updated successfully");
    
            //store update record after updating
            const updateRecord = {
              fertilizerId: id,
              updatedFields: updateStock,
            };
    
            axios
              .post("http://localhost:8070/UpdateRecord/storeUpdateRecord", updateRecord)
              .then(() => {
                alert("Update record stored successfully");
                navigate("/admin/stock");
              })
              .catch((err) => {
                alert(err.message);
              });
          })
          .catch((err) => {
            alert(err.message);
          });
      };

    return (
        <div className="container">
        <br/>
        <a href="/admin/stock"><button type="submit" className="btn btn-outline-warning rounded-circle"><i class="fa-solid fa-arrow-left"></i></button></a>
            <br/><br/>
            <h2>Edit Stock Data</h2><br/>
            <form>
                <div className="form-group">
                    <label>Fertilizer Name</label>
                    <input
                        type="text"
                        className="form-control"
                        value={fertilizerName}
                        readOnly
                        //onChange={(e) => setfertilizerName(e.target.value)}
                    />
                </div>
                <div className="form-group">
                    <label>Fertilizer Quantity (kg)</label>
                    <input
                        type="text"
                        className="form-control"
                        value={fertilizerQuantity}
                        onChange={(e) => setfertilizerQuantity(e.target.value)}
                    />
                </div>
                <div className="form-group">
                    <label>Unit Price (Rs)</label>
                    <input
                        type="text"
                        className="form-control"
                        value={unitPrice}
                        onChange={(e) => setunitPrice(e.target.value)}
                    />
                </div>
               
             
                <br/>
                <button type="button" className="btn btn-success" onClick={handleUpdate}>
                    Update Item
                </button>
                
            </form>
        </div>
    );


}

export default EditItem;