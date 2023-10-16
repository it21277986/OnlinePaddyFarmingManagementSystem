const mongoose = require('mongoose');

const Schema = mongoose.Schema;

const tenderSchema = new Schema({

    PaddymillName : {
        type : String,
        required: true
    },
    pmNo : {
        type : String,
        required: true
    },
    district : {
        type : String,
        required: true
    },
    capacity : {
        type : String,
        required: true
    },
    lorryCount : {
        type : String,
        required: true
    },
    riceType : {
        type : String,
        required: true
    },
    grindPrice : {
        type : String,
        required: true
    }, 
    transportPrice : {
        type : String,
        required: true
    }, 
   
})

const tender = mongoose.model("Tender", tenderSchema);

module.exports = tender;