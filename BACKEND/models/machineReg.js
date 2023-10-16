const mongoose= require('mongoose');

const Schema = mongoose.Schema;

const machineRegSchema= new Schema({
    machineOwnerName:{
        type: String,
        required: true
    },

    machineType:{
        type: String,
        required: true
    },

    engineNumber:{
        type: String,
        required: true
    },

    dateOfRegistration:{
        type: String,
        required: true
    },

    contactNumber:{
        type: String,
        required: true
    }
})

const machineReg= mongoose.model("MachineReg", machineRegSchema);

module.exports= machineReg;