const mongoose = require("mongoose");

const fuelReqSchema = new mongoose.Schema({
  farmerId: {
    type: String,
    required: true,
  },
  sizeOfLand: {
    type: String,
    required: true,
  },
  noOfDays: {
    type: String,
    required: true,
  },
  quantity: {
    type: String,
    require: true,
  },
  price: {
    type: String,
    required: true,
  },
  // Newly added //
  volume: {
    type: String,
    required: true,
  },
  // End //
  qrcode: {
    type: String,
  },
});

module.exports = mongoose.model("FuelReq", fuelReqSchema);
