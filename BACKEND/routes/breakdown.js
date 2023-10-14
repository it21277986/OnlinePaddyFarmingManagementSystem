const router = require("express").Router();
let Breakdown = require("../models/breakdown");

//create oparation
router.route("/addBreakdown").post((req,res)=>{ 
    const breakdown = req.body.breakdown;
    const description = req.body.description;
    const contactno = req.body.contactno;

    const newBreakdown = new Breakdown({
        breakdown,
        description,
        contactno
    })

    newBreakdown.save().then(()=>{
        res.json("Breakdown Submited")
    }).catch((err)=>{
        console.log(err);
    })
})

//display oparation(ALL)
router.route("/Breakdown").get((req,res)=>{
    Breakdown.find().then((breakdown)=>{
        res.json(breakdown)
    }).catch((err)=>{
        console.log(err)
    })
})

//update oparation
router.route("/updateBreakdown/:bId").put(async(req,res)=>{
    let breakdownId = req.params.bId;
    const {breakdown,description,contactno} = req.body;

    const updateBreakdown = {
        breakdown,
        description,
        contactno
    }
    const update = await Breakdown.findByIdAndUpdate(breakdownId, updateBreakdown).then(()=>{
        res.status(200).send({status: "Breakdown details updated"})
    }).catch((err)=>{
        console.log(err);
        res.status(500).send({status: "Error with updating data",error: err.massage});
    })
})

//delete oparation
router.route("/deleteBreakdown/:bId").delete(async(req,res)=>{
    let breakdownId = req.params.bId;

    await Breakdown.findByIdAndDelete(breakdownId).then(()=>{
        res.status(200).send({status: "Breakdown Deleted"});
    }).catch((err)=>{
        console.log(err.massage);
        res.status(500).send({status: "Error with delete Breakdown",error: err.massage});
    })
})

//display (ONE)
router.route("/getBreakdown/:bId").get(async(req, res)=>{
    let breakdownId = req.params.bId;
    const user = await Breakdown.findById(breakdownId).then((breakdown)=>{
        res.status(200).send({status: "Breakdown fetched", breakdown})
    }).catch(()=>{
        console.log(err.massage);
        res.status(500).send({status: "Error with get Breakdown",error: err.massage})
    })
})

module.exports = router;