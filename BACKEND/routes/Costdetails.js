const router = require("express").Router();
const mongoose = require('mongoose');

router.route("/checkNIC/:nic").get(async (req, res) => {
    try {
    const nic = req.params.nic;
    // const nic = "200053802110"
  
      // Access the "requestforms" and "harvests" collections
      const requestFormsCollection = mongoose.connection.db.collection("requestforms");
      const harvestCollection = mongoose.connection.db.collection("harvests");
      const distributionsCollection = mongoose.connection.db.collection("distributions");
      const seedReqsCollection = mongoose.connection.db.collection("seedreqs");
    //   const machinereqsCollection = mongoose.connection.db.collection("machinereqs");
  
      // Find documents in "requestforms" where the NIC matches
      const requestForms = await requestFormsCollection.find({ nic: nic }).toArray();
  
      // Find documents in "harvests" where the NIC matches
      const harvestData = await harvestCollection.find({ NIC: nic }).toArray();
  
      // Find documents in "distributions" where the NIC matches
      const distributionsData = await distributionsCollection.find({ nic: nic }).toArray();
  
      // Find documents in "seedsreqs" where the NIC matches
      const seedReqsData = await seedReqsCollection.find({ farmerid: nic }).toArray();
  
    //   const machinereqsData = await machinereqsCollection.find({ farmerId: nic }).toArray();
  
      if (requestForms.length > 0 || distributionsData.length > 0 || seedReqsData.length > 0 || harvestData.length > 0 ) {
        // Combine data from both tables into a single array
        const mergedData = [...requestForms, ...distributionsData, ...seedReqsData,...harvestData];
        res.status(200).json(mergedData);
      } else {
        
        res.status(200).json({ message: "No data found for this NIC" });
      }
    } catch (error) {
      console.error(error);
      res.status(500).json({ message: "Internal Server Error" });
    }
  });
  
  module.exports = router;