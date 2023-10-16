const mongoose  = require("mongoose");
const Schema = mongoose.Schema;

const FertilizerStockSchema = new Schema({
    
    fertilizerName: {
        type: String,
        required: true
    },
    fertilizerQuantity: {
        type: String,
        required: true
    },
    unitPrice: {
        type: String,
        required: true
    }
})

const FertilizerStock = mongoose.model("FertilizerStock",FertilizerStockSchema);
module.exports = FertilizerStock;