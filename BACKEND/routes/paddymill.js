const router = require("express").Router();
let Paddymill = require("../models/paddymill");

//create oparation
router.route("/addpm").post((req,res)=>{ 
    const ownerName = req.body.ownerName;
    const NIC = req.body.NIC;
    const contactNo = req.body.contactNo;
    const address = req.body.address;
    const district = req.body.district;
    const paddymillRegNo = req.body.paddymillRegNo;
    const password = req.body.password;
    const cnfrmpassword = req.body.cnfrmpassword;

    const newPaddymill = new Paddymill({
        ownerName,
        NIC,
        contactNo,
        address,
        district,
        paddymillRegNo,
        password,
        cnfrmpassword
    })

    newPaddymill.save().then(()=>{
        res.json("Paddymill Added")
    }).catch((err)=>{
        console.log(err);
    })
})

//display oparation(ALL)
router.route("/pm").get((req,res)=>{
    Paddymill.find().then((paddymill)=>{
        res.json(paddymill)
    }).catch((err)=>{
        console.log(err.massage)
        res.status(500).send({ status: "Error with get Paddymill", error: err.message });
    })
})

// Update operation
router.route("/updatepm/:pId").put(async (req, res) => {
    let paddymillId = req.params.pId;
    const { ownerName, NIC, contactNo, address, district, paddymillRegNo, password, cnfrmpassword } = req.body;

    try {
        const updatePaddymill = {
            ownerName,
            NIC,
            contactNo,
            address,
            district,
            paddymillRegNo,
            password,
            cnfrmpassword
        }
        await Paddymill.findByIdAndUpdate(paddymillId, updatePaddymill);
        res.status(200).send({ status: "Paddymill details updated" });
    } catch (err) {
        console.log(err.message);
        res.status(500).send({ status: "Error with updating data", error: err.message });
    }
});

// Delete operation
router.route("/deletepm/:pId").delete(async (req, res) => {
    let paddymillId = req.params.pId;

    try {
        await Paddymill.findByIdAndDelete(paddymillId);
        res.status(200).send({ status: "Paddymill Deleted" });
    } catch (err) {
        console.log(err.message);
        res.status(500).send({ status: "Error with deleting Paddymill", error: err.message });
    }
});

//display (ONE)
router.route("/getpm/:pId").get(async(req, res)=>{
    let paddymillId = req.params.pId;
    const user = await Paddymill.findById(paddymillId).then((paddymill)=>{
        res.status(200).send({status: "Paddymill fetched", paddymill})
    }).catch((err)=>{
        console.log(err.message);
        res.status(500).send({status: "Error with get Paddymill",error: err.massage})
    })
})

module.exports = router;