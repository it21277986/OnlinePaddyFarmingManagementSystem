const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const UploadSlipSchema = new Schema({
    requestId: {
        type: String,
        required: true
    },
    bank: {
        type: String,
        required: true
    },
    branch: {
        type: String,
        required: true
    },amount: {
        type: Number,
        required: true
    },
    slip: {
        data: Buffer,
        contentType: String,
       }

});
const UploadSlip = mongoose.model("UploadSlip",UploadSlipSchema);
module.exports = UploadSlip;