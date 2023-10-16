const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const counterSchema = new Schema({
    name: String,
    count: Number,
});

const Counter = mongoose.model("Counter", counterSchema);
module.exports = Counter;