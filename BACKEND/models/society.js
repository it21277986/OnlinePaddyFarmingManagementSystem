const mongoose = require('mongoose');

// Define a schema for the "society" collection in MongoDB
const Schema = mongoose.Schema;

const societySchema = new Schema({

    societyname : {
        type : String,
        required: true
    },
    regid : {
        type : String,
        required: true
    },
    address : {
        type : String,
        required: true
    },
    presidentname : {
        type : String,
        required: true
    },
    presidentnic : {
        type : String,
        required: true
    },
    contactno : {
        type : String,
        required: true
    }
})
// Create a model named "Society" based on the defined schema
const society = mongoose.model("Society", societySchema);

module.exports = society;