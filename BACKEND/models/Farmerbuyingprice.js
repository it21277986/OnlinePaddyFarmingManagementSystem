const mongoose = require('mongoose');

const Schema = mongoose.Schema;

const farmerbuyingpriceSchema = new Schema({

    nic : {
        type : String,
        required: true
    },

    date : {
        type : String,
        required: true
    },
    total : {
        type : String,
        required: true
    },
    wastage : {
        type : String,
        required: true
    },
    profit : {
        type : String,
        required: true
    },
    sellingprice : {
        type : String,
        required: true
    },

    

   



})

const Farmerbuyingprice = mongoose.model("Farmerbuyingprice", farmerbuyingpriceSchema);

module.exports = Farmerbuyingprice;