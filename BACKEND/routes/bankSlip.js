const router = require("express").Router();
let BankSlip =require("../models/BankSlip");
const multer = require("multer");
const fs =require('fs')


// Set up Multer for file uploads
const storage= multer.diskStorage({
  destination:(req,file,cb)=>{
    cb(null,'uploads')
  },
  filename : (req,file,cb)=>
  cb(null,file.originalname)
 })
 const upload=multer({storage:storage})

 //Create function
router.route("/add").post(upload.single('slip'),(req,res)=> {
  const newBankSlip = new BankSlip({
 transactionId :req.body.transactionId,
    requestId  :req.body.requestId,
    AccountHolder  :req.body.AccountHolder,
    AccountNo :Number(req.body.AccountNo),
    Bank :req.body.Bank,
    Branch :req.body.Branch,
    Amount :Number(req.body.Amount),
    DepositedDate :req.body.DepositedDate,
   
      slip :{
        data: fs.readFileSync('uploads/' + req.file.filename),
        contentType: "image/png"
    }
  });
  newBankSlip.save()
  .then(() => {
    res.json("Slip Uploaded");
  })
   
  .catch((err) => {
    console.error("Error Uploading the slip", err);
    res.status(500).json({ error: "Server error" });
  }); 

})
//Read function (all transactions)

router.route("/").get((req,res)=>{
  BankSlip.find().then((bankSlip)=>{
      res.json(bankSlip) //success
  }).catch((err)=>{ //unsuccess

      console.log(err);

  })     

})

//Update function
router.route("/update/:transactionId").put(async (req, res) => {
  try {
    const slipId = req.params.transactionId;
    const updatedStatus = req.body.Status;

    // Use findOneAndUpdate correctly with a query to find the document and update data
    const update = await BankSlip.findOneAndUpdate(
      { transactionId: slipId }, 
      { Status: updatedStatus }, 
      { new: true }
    );

    if (!update) {
      // Handle the case where the document with the provided ID is not found
      return res.status(404).json({ error: "Document not found" });
    }

    // If the update was successful, return a success response
    res.json({ message: "Status Updated", updatedDocument: update });
  } catch (err) {
    // Handle errors
    console.error(err);
    res.status(500).json({ error: "Failed to update status" });
  }
});

 


//fetching data from one request


router.route("/get/:transactionId").get(async (req, res) => {
  try {
    const slipId = req.params.transactionId;
    const slip = await BankSlip.findOne({ transactionId: slipId });

    if (!slip) {
      console.log("Slip not found in the database.");
      return res.status(404).json({ error: "Slip not found" });
    }

    // Return the found slip data
    res.json(slip);
  } catch (error) {
    console.error("Error fetching slip:", error);
    res.status(500).json({ error: "Server error" });
  }
});
 
  //Delete funtion

   router.route("/delete/:transactionId").delete(async(req,res)=>{
    let transactionId = req.params.transactionId;
    await BankSlip.findOneAndDelete({ transactionId: transactionId }).then(()=>{
        res.json("Slip Deleted") //success
    }).catch((err)=>{ //unsuccess

        console.log(err);
 
    })     
  })
  
  
  


  

module.exports = router;

