const mongoose = require('mongoose');

const Schema = mongoose.Schema;

const customerSchema = new Schema({

    fname : {
        type : String,
        required: true
    },

    lname : {
        type : String,
        required: true
    },

    username : {
        type : String,
        required: true
    },

    nic : {
        type : String,
        required: true
    },

    no : {
        type : String,
        required: true
    },

    street : {
        type : String,
        required: true
    },

    city : {
        type : String,
        required: true
    },

    phone : {
        type : String,
        required: true
    },

    password : {
        type : String,
        required: true
    },

    landOwnerName : {
        type : String,
        required: true
    },

    province : {
        type : String,
        required: true
    },

    districtCode : {
        type : String,
        required: true
    },

    devisionCode : {
        type : String,
        required: true
    },

    blockNo : {
        type : String,
        required: true
    },

    feildSize : {
        type : Number,
        required: true
    },


    profileImage: String, 
})

const Customer = mongoose.model("Customer", customerSchema);

module.exports = Customer;


