const router = require("express").Router();
let Seedreq = require("../models/Seedreq");

//create oparation
router.route("/addSeedreq").post((req, res) => {
    const {
        farmerid,
        seedtype,
        nic,
        contactNo,
        feildsize,
        reqamount,
        Price, // Updated field name
        date
    } = req.body;

    const newSeedreq = new Seedreq({
        farmerid,
        seedtype,
        nic,
        contactNo,
        feildsize,
        reqamount,
        Price,
        date
    });

    newSeedreq.save()
        .then(() => {
            res.json("Seeds req Are Added To Stock");
        })
        .catch((err) => {
            console.log(err);
            res.status(400).json("Error: " + err);
        });
});

//display oparation(ALL)
router.route("/Seedreq").get((req, res) => {
    Seedreq.find().then((seedreq) => {
        res.json(seedreq)
    }).catch((err) => {
        console.log(err)
    })
})

//update oparation
router.route("/updateSeedreq/:srId").put(async (req, res) => {
    let seedreqId = req.params.srId;
    const { farmerid, seedtype, nic, contactNo, feildsize, reqamount, date } = req.body;

    const updateSeedreq = {
        farmerid,
        seedtype,
        nic,
        contactNo,
        feildsize,
        reqamount,
        date
    }
    const update = await Seedreq.findByIdAndUpdate(seedreqId, updateSeedreq).then(() => {
        res.status(200).send({ status: "Seed req details updated" })
    }).catch((err) => {
        console.log(err);
        res.status(500).send({ status: "Error with updating data", error: err.massage });
    })
})

//delete oparation
router.route("/deleteSeedreq/:srId").delete(async (req, res) => {
    let seedreqId = req.params.srId;

    await Seedreq.findByIdAndDelete(seedreqId).then(() => {
        res.status(200).send({ status: "Seeds req are Deleted" });
    }).catch((err) => {
        console.log(err.massage);
        res.status(500).send({ status: "Error with delete Stock", error: err.massage });
    })
})

//display (ONE)
router.route("/getSeedreq/:srId").get(async (req, res) => {
    let seedreqId = req.params.srId;
    const user = await Seedreq.findById(seedreqId).then((seedreq) => {
        res.status(200).send({ status: "Seeds req fetched", seedreq })
    }).catch(() => {
        console.log(err.massage);
        res.status(500).send({ status: "Error with get details", error: err.massage })
    })
})

module.exports = router;