const mongoose = require('mongoose');

const fuelReqSchema = new mongoose.Schema({
    farmerId: {
        type: String,
        required: true
    },
    sizeOfLand: {
        type: String,
        required: true
    },
    noOfDays: {
        type: String,
        required: true
    }
});

module.exports = mongoose.model("FuelReq", fuelReqSchema);
