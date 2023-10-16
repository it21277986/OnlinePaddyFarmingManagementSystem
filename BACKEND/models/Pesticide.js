const mongoose = require ("mongoose");
const Schema = mongoose.Schema;
const fs = require('date-fns');
const pesticideSchema = new Schema({

    

    pesticideId : {
        type : String,
        required : true,
        unique: true, // Set as unique
        index: true, // Add an index for optimization
        
    },

    image :{
        data: Buffer,
        contentType: String,
    },
    pesticideType : {
        type : String,
        required : true //checking whether name is null ,if so we cant login

    },
    chemicalName :{
        type : String,
        required : true
    },
    manufacturer : {
        type : String,
        required : true
    },
    productName : {
        type : String,
        required : true
       },
   
   
   classification:{
    type : String,

   },

   pests:{
    type : String,

   },
   
   
   availability:{
    type : String,
    required : true,
    default : "In Stock",

   },
  quantity:{
    type : Number,
    required : true,

   },
   price:{
    type : String,
   

   },
   packs:{
    type : String,
    

   },
   description:{
    type : String,
   },
   updatedTime: {
    type: String, 
    default: () => new Date().toISOString().split('T')[0],
},
 
})
pesticideSchema.pre("save", function (next) {
    this.updatedTime = new Date().toISOString().split('T')[0];
    next();
});


const Pesticide= mongoose.model("Pesticide",pesticideSchema);
module.exports = Pesticide; 
