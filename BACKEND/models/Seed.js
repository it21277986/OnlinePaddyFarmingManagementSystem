const mongoose = require('mongoose');

// Define a schema for the "seed" collection in MongoDB
const Schema = mongoose.Schema;

const seedSchema = new Schema({

    seedtype: {
        type: String,
        required: true
    },
    quantity: {
        type: String,
        required: true
    },
    date: {
        type: String,
        required: true
    },
    rol: {
        type: String,
        required: true
    }
})
// Create a model named "seed" based on the defined schema
const seed = mongoose.model("Seed", seedSchema);

module.exports = seed;