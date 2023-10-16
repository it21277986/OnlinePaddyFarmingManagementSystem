const router = require("express").Router();
let Paddyvar = require("../models/Paddyvar");

//create oparation
router.route("/addPaddyvar").post((req, res) => {
    const Varietyname = req.body.Varietyname;
    const yor = req.body.yor;
    const Maturity = req.body.Maturity;
    const Plantheight = req.body.Plantheight;
    const colour = req.body.colour;
    const Recommendation = req.body.Recommendation;

    const newPaddyvar = new Paddyvar({
        Varietyname,
        yor,
        Maturity,
        Plantheight,
        colour,
        Recommendation
    })

    newPaddyvar.save().then(() => {
        res.json("Paddy variety Are Added To Stock")
    }).catch((err) => {
        console.log(err);
    })
})

//display oparation(ALL)
router.route("/Paddyvar").get((req, res) => {
    Paddyvar.find().then((paddyvar) => {
        res.json(paddyvar)
    }).catch((err) => {
        console.log(err)
    })
})

//update oparation
router.route("/updatePaddyvar/:pvId").put(async (req, res) => {
    let paddyvarId = req.params.pvId;
    const { Varietyname, yor, Maturity, Plantheight, colour, Recommendation } = req.body;

    const updatePaddyvar = {
        Varietyname,
        yor,
        Maturity,
        Plantheight,
        colour,
        Recommendation
    }
    const update = await Paddyvar.findByIdAndUpdate(paddyvarId, updatePaddyvar).then(() => {
        res.status(200).send({ status: "Paddy Variety details updated" })
    }).catch((err) => {
        console.log(err);
        res.status(500).send({ status: "Error with updating data", error: err.massage });
    })
})

//delete oparation
router.route("/deletePaddyvar/:pvId").delete(async (req, res) => {
    let paddyvarId = req.params.pvId;

    await Paddyvar.findByIdAndDelete(paddyvarId).then(() => {
        res.status(200).send({ status: "Paddy Variety are Deleted" });
    }).catch((err) => {
        console.log(err.massage);
        res.status(500).send({ status: "Error with delete Paddy Variety", error: err.massage });
    })
})

//display (ONE)
router.route("/getPaddyvar/:pvId").get(async (req, res) => {
    let paddyvarId = req.params.pvId;
    const user = await Paddyvar.findById(paddyvarId).then((paddyvar) => {
        res.status(200).send({ status: "paddyvar fetched", paddyvar })
    }).catch(() => {
        console.log(err.massage);
        res.status(500).send({ status: "Error with get details", error: err.massage })
    })
})

module.exports = router;