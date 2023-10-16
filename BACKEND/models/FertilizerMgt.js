const mongoose = require('mongoose');

const Schema = mongoose.Schema;


const distributionSchema = new Schema({
    nic: {
        type: String,
        required: true
    },
    name: {
        type: String,
        required: true
    },
    contactNo: {
        type: Number,
        required: true
    },
    plantedDate: {
        type: Date,
        required: true
    },
    type: {
        type: String,
        required: true
    },
    amount: {
        type: String,
        required: true
    },
    isChecked:{
        type:Boolean,
    },
    totalPrice:{
        type:String
    }

});

const distribution = mongoose.model("distribution", distributionSchema);

module.exports = distribution;



