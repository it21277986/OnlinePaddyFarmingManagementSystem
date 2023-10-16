const router = require("express").Router();
let Price = require("../models/price");

//create oparation
router.route("/addpmprice").post((req,res)=>{ 
    const paddyPrice = req.body.paddyPrice;
    const pmCost = req.body.pmCost;
    const transport = req.body.transport;
    const wastage = req.body.wastage;
    const profit = req.body.profit;
    const total = req.body.total;
    
    const newPrice = new Price({
        paddyPrice,
        pmCost,
        transport,
        wastage,
        profit,
        total,
       
    })

    newPrice.save().then(()=>{
        res.json("Prices Added")
    }).catch((err)=>{
        console.log(err);
    })
})

//display oparation(ALL)
router.route("/pmprice").get((req,res)=>{
    Price.find().then((price)=>{
        res.json(price)
    }).catch((err)=>{
        console.log(err.massage)
        res.status(500).send({ status: "Error with get Price", error: err.message });
    })
})



module.exports = router;