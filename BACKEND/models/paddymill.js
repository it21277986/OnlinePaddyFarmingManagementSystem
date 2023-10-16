const mongoose = require('mongoose');

const Schema = mongoose.Schema;

const paddymillSchema = new Schema({

    ownerName : {
        type : String,
        required: true
    },
    NIC : {
        type : String,
        required: true
    },
    contactNo : {
        type : String,
        required: true
    },
    address : {
        type : String,
        required: true
    },
    district : {
        type : String,
        required: true
    },
    paddymillRegNo : {
        type : String,
        required: true
    },
    password : {
        type : String,
        required: true
    }, 
    cnfrmpassword : {
        type : String,
        required: true
    }, 
})

const paddymill = mongoose.model("Paddymill", paddymillSchema);

module.exports = paddymill;