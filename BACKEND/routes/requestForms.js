const router = require("express").Router();
let RequestForm =require("../models/RequestForm");


 //Create function
router.route("/add").post((req,res)=> {
   
    const nic = req.body.nic;
    const landOwnerName = req.body.landOwnerName;
    const phone = req.body.phone;
    const productName = req.body.productName;
    const proposedApplicationDate = req.body.proposedApplicationDate;
    const requestedDate = req.body.requestedDate;
    const quantity=Number(req.body.quantity);
    const totalPrice = Number(req.body.totalPrice);
    const enquiry = req.body.enquiry;
    const status = req.body.status;
   


    const newRequestForm = new RequestForm({
    
     nic,
     landOwnerName,
     phone,
     productName,
     proposedApplicationDate,
     requestedDate,
     quantity,
     totalPrice,
     enquiry,
     status,
    

    })

    newRequestForm.save().then(()=>{  //then() is a js promise
       res.json("Request Added") //success
    }).catch((err)=>{ //unsuccess

        console.log(err);

    })     

})

// Read function (all the requests)


router.route("/").get((req,res)=>{
    RequestForm.find().then((requestForm)=>{
        res.json(requestForm) //success
    }).catch((err)=>{ //unsuccess

        console.log(err);

    })     

})

//Update function

router.route("/update/:requestId").put(async(req,res)=>{
    let requestId= req.params.requestId;
   
    const status = req.body.status;

    const updateStatus ={ 
        
        status
   
       }
    const update = await RequestForm.findOneAndUpdate({ requestId: requestId },updateStatus).then(()=>{
        res.json("Request Form Updated") //success
    }).catch((err)=>{ //unsuccess

        console.log(err);

    })     
 
}) 


// Delete function
router.route("/delete/:requestId").delete(async (req, res) => {
    const requestId = req.params.requestId;

    try {
        const deletedRequest = await RequestForm.findOneAndDelete({ requestId: requestId });

        if (!deletedRequest) {
            return res.status(404).json({ error: "Request not found" });
        }

        res.json({ message: "Request Deleted" }); // Send a success message
    } catch (err) {
        console.error(err);
        res.status(500).json({ error: "Error deleting request" });
    }
});

// Backend route to fetch additional details by requestId
router.route("/get/:requestId").get(async (req, res) => {
    const requestId = req.params.requestId;
    try {
        // Query your database or data source to fetch additional details based on requestId
        // Replace the following line with your actual data retrieval logic
        const additionalDetails = await RequestForm.findOne({ requestId: requestId }).exec();

        if (!additionalDetails) {
            return res.status(404).json({ error: "Additional details not found" });
        }

        res.json(additionalDetails); // Send back the found additional details
    } catch (err) {
        console.error(err);
        res.status(500).json({ error: "Error retrieving additional details" });
    }
});







module.exports = router;



