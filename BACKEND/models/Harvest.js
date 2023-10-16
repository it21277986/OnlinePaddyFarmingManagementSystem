const mongoose = require('mongoose');

const Schema = mongoose.Schema;

const harvestSchema = new Schema({

    name : {
        type : String,
        required: true
    },

   

    date : {
        type : String,
        required: true
    },

    address : {
        type : String,
        required: true
    },

    email : {
        type : String,
        required: true
    },

    NIC : {
        type : String,
        required: true
    },

    area : {
        type : String,
        required: true
    },

    ricetype : {
        type : String,
        //required: true
    },
    
    cultivatedamount : {
        type : String,
        required: true
    },

     agreedamount: {
        type : String,
        required: true
    },

    status : {
        type : String,
        required: true
    },

    contactNumber: {
        type : Number,
        required: true
    },




})

const Harvest = mongoose.model("Harvest",harvestSchema);

module.exports = Harvest;