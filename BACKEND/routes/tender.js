const router = require("express").Router();
let Tender = require("../models/tender");

//create oparation
router.route("/addtender").post((req,res)=>{ 
    const PaddymillName = req.body.PaddymillName;
    const pmNo = req.body.pmNo;
    const district = req.body.district;
    const capacity = req.body.capacity;
    const lorryCount = req.body.lorryCount;
    const riceType = req.body.riceType;
    const grindPrice = req.body.grindPrice;
    const transportPrice = req.body.transportPrice;

    const newTender = new Tender({
        PaddymillName,
        pmNo,
        district,
        capacity,
        lorryCount,
        riceType,
        grindPrice,
        transportPrice

    })

    newTender.save().then(()=>{
        res.json("Tender Submitted Successfully")
    }).catch((err)=>{
        console.log(err);
    })
})

//display oparation(ALL)
router.route("/tender").get((req,res)=>{
    Tender.find().then((tender)=>{
        res.json(tender)
    }).catch((err)=>{
        console.log(err.massage)
        res.status(500).send({ status: "Error with submitting tender", error: err.message });
    })
})


//display (ONE)
router.route("/gettender/:tId").get(async(req, res)=>{
    let tenderId = req.params.pId;
    const user = await Tender.findById(tenderId).then((tender)=>{
        res.status(200).send({status: "Tender fetched", tender})
    }).catch((err)=>{
        console.log(err.message);
        res.status(500).send({status: "Error with get Tender",error: err.massage})
    })
})

module.exports = router;