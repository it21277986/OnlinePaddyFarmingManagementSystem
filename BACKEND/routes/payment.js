const router = require("express").Router();
let UploadSlip = require("../models/payment");
const multer = require("multer");
const fs = require("fs");

const storage = multer.diskStorage({
    destination: (req, file, cb) => {
        cb(null, 'uploads')
    },
    filename: (req, file, cb) =>
        cb(null, file.originalname)
})

const upload = multer({ storage: storage });

router.route("/addDepositSlip").post(upload.single('slip'), (req, res) => {
    
    const newUploadSlip = new UploadSlip({
        slip: {
            data: fs.readFileSync(req.file.path),
            contentType: req.file.mimetype
        },
        farmerId: req.body.farmerId,
        
    });

    newPayment.save()
        .then(() => {
            res.json("Payment Added");
        })
        .catch((err) => {
            console.log(err);
            res.status(500).json({ error: "Server error" });
        });
});

router.route("/getDepositSlip").get(async (req, res) => {
    try {
        const allData = await UploadSlip.find();
        if (!allData || allData.length === 0) {
            return res.status(404).json({ error: "No data found" });
        }
        res.json(allData);
    } catch (error) {
        console.error("Error fetching data:", error);
        res.status(500).json({ error: "Server error" });
    }
});

router.route("/getDepositSlip/:Did").get(async (req, res) => {
    let paymentSlip = req.params.Did;
    const slip = await payment.findOne({ _id: bankSlip }).then((slip) => {
        res.json(slip) // success
    }).catch((err) => { // unsuccessful
        console.log(err);
    });
});
router.route("/getSlipByReqId/:farmerId").get(async (req, res) => {
    let farmerId = req.params.farmerId;
    try {
      const slip = await payment.findOne({ farmerId: farmerId });
      
      if (!slip) {
        return res.status(404).json({ error: "No data found" });
      }
      res.json(slip);
    } catch (error) {
      console.error("Error fetching data:", error);
      res.status(500).json({ error: "Server error" });
    }
  });
module.exports = router;

/*const router = require("express").Router();
let Society = require("../models/payment");

//create oparation
router.route("/addPayment").post((req,res)=>{ 
    const farmerId = req.body.farmerId;
    const paymentSlip = req.body.paymentSlip;
    

    const newPayment = new Payment({
        farmerId,
        paymentSlip
    })

    newPayment.save().then(()=>{
        res.json("Payment Added")
    }).catch((err)=>{
        console.log(err);
    })
})

//display oparation(ALL)
router.route("/Payment").get((req,res)=>{
    Payment.find().then((payment)=>{
        res.json(payment)
    }).catch((err)=>{
        console.log(err)
    })
})

//update oparation
router.route("/updatePayment/:pId").put(async(req,res)=>{
    let paymentId = req.params.sId;
    const {farmerId,paymentSlip} = req.body;

    const updatePayment = {
        farmerId,
        paymentSlip
    }
    const update = await Payment.findByIdAndUpdate(paymentId, updatePayment).then(()=>{
        res.status(200).send({status: "Payment details updated"})
    }).catch((err)=>{
        console.log(err);
        res.status(500).send({status: "Error with updating data",error: err.massage});
    })
})

//delete oparation
router.route("/deletePayment/:sId").delete(async(req,res)=>{
    let paymentId = req.params.pId;

    await Payment.findByIdAndDelete(paymentId).then(()=>{
        res.status(200).send({status: "Payment Deleted"});
    }).catch((err)=>{
        console.log(err.massage);
        res.status(500).send({status: "Error with delete payment",error: err.massage});
    })
})

//display (ONE)
router.route("/getPayment/:pId").get(async(req, res)=>{
    let paymentId = req.params.pId;
    const user = await Society.findById(paymentId).then((payment)=>{
        res.status(200).send({status: "Payment fetched", payment})
    }).catch(()=>{
        console.log(err.massage);
        res.status(500).send({status: "Error with get payment",error: err.massage})
    })
})

module.exports = router;*/