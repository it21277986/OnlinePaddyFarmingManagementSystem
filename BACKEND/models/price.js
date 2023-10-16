const mongoose = require('mongoose');

const Schema = mongoose.Schema;

const priceSchema = new Schema({

    paddyPrice : {
        type : Number,
        required: true
    },
    pmCost : {
        type : Number,
        required: true
    },
    transport : {
        type : Number,
        required: true
    },
    wastage : {
        type : Number,
        required: true
    },
    profit : {
        type : Number,
        required: true
    },
    total : {
        type : Number,
        required: true
    },
    
})

const price = mongoose.model("Price", priceSchema);

module.exports = price;