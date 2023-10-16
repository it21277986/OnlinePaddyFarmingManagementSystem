const mongoose = require('mongoose');

// Define a schema for the "payment" collection in MongoDB
const Schema = mongoose.Schema;

const paymentSchema = new Schema({

    farmerId : {
        type : String,
        required: true
    },
    
    paymentSlip : {
        type: String,
        required: true
    }
    
})

// Create a model named "Payment" based on the defined schema
const payment = mongoose.model("Payment", paymentSchema);

module.exports = payment;