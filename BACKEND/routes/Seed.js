const router = require("express").Router();
let Seed = require("../models/Seed");

//create oparation
router.route("/addSeed").post((req, res) => {
    const seedtype = req.body.seedtype;
    const quantity = req.body.quantity;
    const date = req.body.date;
    const rol = req.body.rol;

    const newSeed = new Seed({
        seedtype,
        quantity,
        date,
        rol
    })

    newSeed.save().then(() => {
        res.json("Seeds Are Added To Stock")
    }).catch((err) => {
        console.log(err);
    })
})

//display oparation(ALL)
router.route("/Seed").get((req, res) => {
    Seed.find().then((seed) => {
        res.json(seed)
    }).catch((err) => {
        console.log(err)
    })
})

//update oparation
router.route("/updateSeed/:stId").put(async (req, res) => {
    let seedId = req.params.stId;
    const { seedtype, quantity, date, rol } = req.body;

    const updateSeed = {
        seedtype,
        quantity,
        date,
        rol
    }
    const update = await Seed.findByIdAndUpdate(seedId, updateSeed).then(() => {
        res.status(200).send({ status: "Seed details updated" })
    }).catch((err) => {
        console.log(err);
        res.status(500).send({ status: "Error with updating data", error: err.massage });
    })
})

//delete oparation
router.route("/deleteSeed/:stId").delete(async (req, res) => {
    let seedId = req.params.stId;

    await Seed.findByIdAndDelete(seedId).then(() => {
        res.status(200).send({ status: "Seeds are Deleted" });
    }).catch((err) => {
        console.log(err.massage);
        res.status(500).send({ status: "Error with delete Stock", error: err.massage });
    })
})

//display (ONE)
router.route("/getSeed/:stId").get(async (req, res) => {
    let seedId = req.params.stId;
    const user = await Seed.findById(seedId).then((seed) => {
        res.status(200).send({ status: "Seeds fetched", seed })
    }).catch(() => {
        console.log(err.massage);
        res.status(500).send({ status: "Error with get details", error: err.massage })
    })
})

module.exports = router;