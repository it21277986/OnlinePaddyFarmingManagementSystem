const mongoose = require('mongoose');

const Schema = mongoose.Schema;

const ricetypeSchema = new Schema({

    ricetypename : {
        type : String,
        required: true
    },

    quantity : {
        type : String,
        required: true
    },

    




})

const Ricetype = mongoose.model("Ricetype",ricetypeSchema);

module.exports = Ricetype;