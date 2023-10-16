const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const paymentSchema = new Schema({
    farmerId: {
        type: String,
        required: true
    },
    paymentSlip: {
        data: Buffer,
        contentType: String,
       }

});
const payment = mongoose.model("payment",paymentSchema);
module.exports = payment;