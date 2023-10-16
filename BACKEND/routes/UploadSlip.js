const router = require("express").Router();
let UploadSlip = require("../models/UploadSlip");
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
        requestId: req.body.requestId,
        bank: req.body.bank,
        branch: req.body.branch,
        amount: req.body.amount,
    });

    newUploadSlip.save()
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
    let bankSlip = req.params.Did;
    const slip = await UploadSlip.findOne({ _id: bankSlip }).then((slip) => {
        res.json(slip) 
    }).catch((err) => { 
        console.log(err);
    });
});
router.route("/getSlipByReqId/:requestId").get(async (req, res) => {
    let requestId = req.params.requestId;
    try {
      const slip = await UploadSlip.findOne({ requestId: requestId });
      
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
