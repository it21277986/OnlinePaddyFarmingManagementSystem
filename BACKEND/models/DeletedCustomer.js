const mongoose = require('mongoose');

const Schema = mongoose.Schema;

const deletedCustomerSchema = new Schema({
    fname: String,
    lname: String,
    username: String,
    nic: String,
    no: String,
    street: String,
    city: String,
    phone: String,
    landOwnerName: String,
    province : String,
    district: String,
    devisionCode: String,
    blockNo: String,
    feildSize: Number, 
    deletedAt: {
        type: Date,
        default: Date.now,
    },
});

const DeletedCustomer = mongoose.model('DeletedCustomer', deletedCustomerSchema);

module.exports = DeletedCustomer;
