const mongoose = require('mongoose');

// Define a schema for the "Paddy varities" collection in MongoDB
const Schema = mongoose.Schema;

const paddyvarSchema = new Schema({

    Varietyname: {
        type: String,
        required: true
    },
    yor: {
        type: String,
        required: true
    },
    Maturity: {
        type: String,
        required: true
    },
    Plantheight: {
        type: String,
        required: true
    },
    colour: {
        type: String,
        required: true
    },
    Recommendation: {
        type: String,
        required: true
    }
})
// Create a model named "Paddy varities" based on the defined schema
const paddyvar = mongoose.model("Paddy", paddyvarSchema);

module.exports = paddyvar;