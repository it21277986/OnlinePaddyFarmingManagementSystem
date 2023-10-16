const mongoose = require('mongoose');

// Define a schema for the "machineRequest" collection in MongoDB
const Schema = mongoose.Schema;

const machineReqSchema = new Schema({

    farmerId : {
        type : String,
        required: true
    },
    farmerName : {
        type : String,
        required: true
    },
    machineName : {
        type : String,
        required: true
    },
    noOfDays : {
        type : String,
        required: true
    },
    payableAmount : {
        type : String,
        required: true
    },
    dateOfRequest:{
        type: String,
        required:true
    }
    
})
// Create a model named "MachineReq" based on the defined schema
const machineRequest = mongoose.model("MachineReq", machineReqSchema);

module.exports = machineRequest;