const mongoose = require('mongoose');

const Schema = mongoose.Schema;

const seedreqSchema = new Schema({
    farmerid: {
        type: String,
        required: true
    },
    seedtype: {
        type: String,
        required: true
    },
    nic: {
        type: String,
        required: true
    },
    contactNo: {
        type: String,
        required: true
    },
    feildsize: {
        type: String,
        required: true
    },
    reqamount: {
        type: String,
        required: true
    },
    Price: {
        type: String, 
        required: true
    },
    date: {
        type: Date,
        default: Date.now
    }
});

const Seedreq = mongoose.model("Seedreq", seedreqSchema);

module.exports = Seedreq;
