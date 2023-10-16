const mongoose = require ("mongoose");
const Schema = mongoose.Schema;
const Counter = require("./Counter"); 
const bankSlipSchema = new Schema({


    transactionId: {
        type:String,
       unique: true,
       
    },
   requestId :{
        type : String,
       required : true, //checking whether name is null ,if so we cant login
       unique: true, // Set as unique
       index: true, // Add an index for optimization
    },

    AccountHolder : {
        type : String,
       required : true, //checking whether name is null ,if so we cant login

    },
    AccountNo :{
        type : Number,
        required : true,
    },
    Bank : {
        type : String,
        required : true,
    },
    Branch : {
        type : String,
        required : true,
    },
    Amount: {
        type : Number,
        required : true,
       },

    DepositedDate: {
    type : String,
    required : true,
   },
   
   slip: {
    data: Buffer,
    contentType: String,
   
    
   },

   
   Status:{
    type : String,
    default: "pending",

   },

})
// Create middleware to auto-generate the requestId
bankSlipSchema.pre("save", async function (next) {
    if (!this.transactionId) {
        // Find the counter document and increment the count
        const counter = await Counter.findOneAndUpdate(
            { name: "transactionIdCounter" },
            { $inc: { count: 1 } },
            { upsert: true, new: true }
        );

        // Use the incremented count to generate the requestId
        this.transactionId = `Slip${counter.count.toString().padStart(2, "0")}`;
    }
    next();

});

const BankSlip = mongoose.model("BankSlip",bankSlipSchema);
module.exports = BankSlip; 
