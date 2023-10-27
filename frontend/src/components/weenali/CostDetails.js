import React, { useEffect, useState } from 'react';
import axios from 'axios';

import { Link, useNavigate, useParams } from "react-router-dom";
import HarvestMenu from './HarvestMenu';

// import jsPDF from 'jspdf';
// import 'jspdf-autotable'; 
// import { parseISO, isSameDay } from 'date-fns';


function CostDetails() {
  let cultivatedamount;
  // let sumAll = 0; 
  const [nic, setSearchNic] = useState([]);
  const [mergedData, setMergedData] = useState([]);
  const [loading, setLoading] = useState(true);
  const [highlightedRows, setHighlightedRows] = useState([]);
  const [wastagePrice, setWastagePrice] = useState(''); // State variable for wastage price
  const [profitMargin, setProfitMargin] = useState(''); // State variable for profit margin
  let [sumAll, setSumAll] = useState('');
  const [buyingPrice, setBuyingPrice] = useState('');

  useEffect(() => {
    // Fetch data from both tables and merge them
    axios
      .get(`http://localhost:8070/costDetails/checkNIC/${nic}`)
      .then((response) => {
        console.log('API Response:', response.data);
        setMergedData(response.data);
        setLoading(false);
      })
      .catch((error) => {
        console.error('Error fetching data', error);
        setLoading(false);
      });
  }, [nic]);

  const calculateTotalCostPrice = () => {
    if (Array.isArray(mergedData) && mergedData.length > 0) {
      let totalCost = 0;

      for (const data of mergedData) {
        if (!isNaN(data.unitCost)) {
          totalCost += data.unitCost;
        }
      }

      setSumAll(totalCost);
    }
  };

  const handleInsertData = () => {
    const currentDate = new Date().toISOString();
    const newBuyingPrice = {
      nic,
      date: currentDate,
      total: sumAll,        // Use the correct property names
      wastage: wastagePrice,
      profit: profitMargin,
      sellingprice: sellingPriceCalculation(),  // Use the correct property name
    };

    axios
      .post("http://localhost:8070/farmerbuyingprice/addFarmerbuyingprice", newBuyingPrice)
      .then(() => {
        // Use Navigate as a function
        alert("done");
      })
      .catch((err) => {
        alert(err);
      });
  }

  const searchByNic = () => {
    // Trigger a fetch based on the `searchNic` state variable
    setLoading(true); // Show loading indicator
  };

  return (

    <div>
      <HarvestMenu />
      <h2 className="all-requests-heading-sachini">Farmers Requests</h2>
      <div className="search-container-sachini">
        <p className="searchPara-sachini">Search By NIC</p>
        <div className="container" align="left" >   {/*if you want you can get the removed search bar's container from here by removing 2*/}

          <input
            type="text"
            value={nic}
            onChange={(e) => setSearchNic(e.target.value)}
            placeholder="Search by NIC"

            className="form-control mb-2"
          />
          <button onClick={searchByNic} className="btn btn-success">
            Search by NIC
          </button>

        </div>

      </div>
      <br></br><br></br><br></br>

      {Array.isArray(mergedData) && mergedData.length > 0 ? (
        <div className="container" align="left" >
          <table className="table" align="center">
            <thead>
              <tr className="table-success">
                <th scope="col">Item Name</th>
                <th scope="col">Amount</th>
              </tr>
            </thead>
            <tbody>
              {mergedData.map((data, index,) => {
                // Calculate the total cost
                cultivatedamount = data.cultivatedamount;
                return (
                  <tr key={index} className={highlightedRows.includes(data) ? 'highlight-sachini' : ''}>
                    <td>{data.ricetype}</td>
                    <td>{data.cultivatedamount}</td>
                  </tr>
                );
              })}
            </tbody>
          </table>
        </div>
        // <><input value={data.cultivatedamount}> </input>
      ) : (
        !loading && <p className="noreq-sachini"></p>
      )}

      <br></br><br></br><br></br>
      <h1>Calculations Of Cost Details</h1>
      {Array.isArray(mergedData) && mergedData.length > 0 ? (
        <div className="container" align="left" >
          <table className="table" align="center">
            <thead>
              <tr className="table-success">
                <th scope="col">Item Name</th>

                <th scope="col">Req Date</th>
                <th scope="col">Quantity</th>
                <th scope="col">Price</th>
                <th scope="col">Total Cost</th>
                <th scope="col">Unit Cost</th>
              </tr>
            </thead>
            <tbody>
              {mergedData.map((data, index) => {
                // Calculate the total cost
                let final1, final2, final3;
                const totalCost1 = data.quantity * data.totalPrice;
                const totalCost2 = data.amount * data.totalPrice;
                const totalCost3 = data.reqamount * data.amount1;

                let finalUnitPrice1, finalUnitPrice2, finalUnitPrice3

                if (!isNaN(totalCost1) && totalCost1 !== 0) {
                  final1 = totalCost1;
                } else if (!isNaN(totalCost2) && totalCost2 !== 0) {
                  final2 = totalCost2;
                } else if (!isNaN(totalCost3) && totalCost3 !== 0) {
                  final3 = totalCost3;
                }

                const totalUP1 = final1 / cultivatedamount;
                const totalUP2 = final2 / cultivatedamount;
                const totalUP3 = final3 / cultivatedamount;


                if (!isNaN(totalUP1) && totalUP1 !== 0) {
                  finalUnitPrice1 = totalUP1;
                  sumAll += finalUnitPrice1;
                } else if (!isNaN(totalUP2) && totalUP2 !== 0) {
                  finalUnitPrice2 = totalUP2;
                  sumAll += finalUnitPrice2
                } else if (!isNaN(totalUP3) && totalUP3 !== 0) {
                  finalUnitPrice3 = totalUP3;
                  sumAll += finalUnitPrice3
                }





                return (
                  <tr key={index} className={highlightedRows.includes(data) ? 'highlight-sachini' : ''}>

                    <td>{data.productName || data.type || data.seedtype || data.machineName}</td>
                    <td>
                      {data.requestedDate || data.plantedDate
                        ? new Date(data.requestedDate || data.plantedDate).toISOString().split('T')[0]
                        : ''}
                    </td>
                    <td>{data.quantity || data.amount || data.reqamount}</td>
                    <td>{data.totalPrice || data.totalPrice || data.amount1}</td>
                    {/* Render the calculated totalCost */}
                    <td>{final1 || final2 || final3}</td>
                    <td>{finalUnitPrice1 || finalUnitPrice2 || finalUnitPrice3}</td>
                  </tr>

                );

              })}
            </tbody>
          </table>
        </div>

      ) : (
        !loading && <p className="noreq-sachini"></p>
      )}
      <div className="container" align="left" >
        <container className="align-center">
          <div className="text-center">
            <label className="form-label">Total Cost Price for 1Kg</label>
            <input
              type="text"
              className="form-control"
              id="sumAll"
              value={sumAll}
              onChange={(e) => setSumAll(e.target.value)}
            /><br />
            <button
              type="submit"
              className="btn btn-success"
              onClick={calculateTotalCostPrice}
            >
              Calculate Total Cost Price
            </button>
            <br /><br />
            <label>Wastage Price for 1Kg</label>
            <input
              id="wastage"
              value={wastagePrice}
              onChange={(e) => setWastagePrice(e.target.value)}
              className="form-control"
            />
            <br />
            <label>Profit Margin Price for 1Kg</label>
            <input
              id="profit"
              value={profitMargin}
              onChange={(e) => setProfitMargin(e.target.value)}
              className="form-control"
            />
            <br />
            <button
              type="submit"
              className="btn btn-success"
              onClick={sellingPriceCalculation}
            >
              Calculate
            </button>
          </div>


          <div style={{ display: 'flex', flexDirection: 'column', alignItems: 'center', justifyContent: 'center' }}>
            <label htmlFor="buyPrice">Buying Price for 1Kg</label>
            <input
              id="buyPrice"
              value={buyingPrice}
              onChange={(e) => setBuyingPrice(e.target.value)}
              style={{ width: '100%', padding: '5px', marginBottom: '10px' }}
            />

            <button
              type="submit"
              className="btn btn-success"
              onClick={handleInsertData}
              style={{ width: '100px' }} // Adjust the width as needed
            >
              Agree To Given Price
            </button>
          </div>
        </container>
      </div>

    </div>


  );

  function sellingPriceCalculation() {
    var a = document.getElementById("sumAll").value;
    var b = parseFloat(wastagePrice);
    var c = parseFloat(profitMargin);
    var result = parseFloat(a) + parseFloat(b) + parseFloat(c);
    document.getElementById("buyPrice").value = result;
    return result.toString();
  };
}

export default CostDetails;