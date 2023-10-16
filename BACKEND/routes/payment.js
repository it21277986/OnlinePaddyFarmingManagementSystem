const router = require("express").Router();
let payment = require("../models/payment");
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

router.route("/addDepositSlip").post(upload.single('payemtnSlip'), (req, res) => {
    
    const newPayment = new payment({
        paymentSlip: {
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
        const allData = await payment.find();
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
    const slip = await payment.findOne({ _id: paymentSlip }).then((paymentSlip) => {
        res.json(slip) // success
    }).catch((err) => { // unsuccessful
        console.log(err);
    });
});
router.route("/getSlipByReqId/:farmerId").get(async (req, res) => {
    let farmerId = req.params.farmerId;
    try {
      const paymentSlip = await payment.findOne({ farmerId: farmerId });
      
      if (!paymentSlip) {
        return res.status(404).json({ error: "No data found" });
      }
      res.json(paymentSlip
        );
    } catch (error) {
      console.error("Error fetching data:", error);
      res.status(500).json({ error: "Server error" });
    }
  });
module.exports = router;