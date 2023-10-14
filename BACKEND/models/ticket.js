const mongoose = require('mongoose');

const Schema = mongoose.Schema;

const ticketSchema = new Schema({

    farmerName : {
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
    fault : {
        type : String,
        required: true
    },
    faultSection : {
        type : String,
        required: true
    },
})

const ticket = mongoose.model("Ticket", ticketSchema);

module.exports = ticket;