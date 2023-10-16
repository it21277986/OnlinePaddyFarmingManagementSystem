const mongoose = require ("mongoose");
const Schema = mongoose.Schema;
const Counter = require("./Counter"); 

const requestFormSchema = new Schema({

    requestId: {
       type:String,
       unique: true,

    },
   nic :{
        type : String,
        required : true
    },
    landOwnerName : {
        type : String,
        required : true
    },

    phone: {
        type : String,
        required : true
    },

       //pesticide details 

    productName :{
    type : String,
    required : true
   },

   proposedApplicationDate:{
    type : String,
    required : true
   },

   requestedDate: {
    type: String, 
    default: function() {
      // Automatically generate the requestedDate using the current date
      const currentDate = new Date();
      const year = currentDate.getFullYear();
      const month = (currentDate.getMonth() + 1).toString().padStart(2, "0");
      const day = currentDate.getDate().toString().padStart(2, "0");
      return `${year}-${month}-${day}`;
    },
  },
quantity:{
type:Number,
required:true
},
totalPrice:{
    type:Number,

   },
   enquiry:{
    type:String,

   },

   status: {
    type: String,
    default: "Pending",
},

   
});
// Create middleware to auto-generate the requestId
requestFormSchema.pre("save", async function (next) {
    if (!this.requestId) {
      // Find the counter document and increment the count
      const counter = await Counter.findOneAndUpdate(
        { name: "requestIdCounter" },
        { $inc: { count: 1 } },
        { upsert: true, new: true }
      );
  
      // Use the incremented count to generate the requestId
      this.requestId = `Request${counter.count.toString().padStart(2, "0")}`;
    }
    next();
  });
  


const RequestForm= mongoose.model("RequestForm",requestFormSchema);
module.exports = RequestForm; 
