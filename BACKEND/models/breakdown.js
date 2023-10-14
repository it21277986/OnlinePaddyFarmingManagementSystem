const mongoose = require('mongoose');

// Define a schema for the "society" collection in MongoDB
const Schema = mongoose.Schema;

const breakdownSchema = new Schema({

    breakdown : {
        type : String,
        required: true
    },
    description : {
        type : String,
        required: true
    },
    contactno : {
        type : String,
        required: true
    }
})
// Create a model named "Society" based on the defined schema
const breakdown = mongoose.model("Breakdown", breakdownSchema);

module.exports = breakdown;