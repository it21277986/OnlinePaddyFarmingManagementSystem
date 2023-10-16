const router = require("express").Router(); 
let FertilizerMgt = require("../models/FertilizerMgt");
let FertilizerStock= require("../models/FertilizerStock");
router.route("/addRequest").post((req,res)=>{
    const nic = req.body.nic;
    const name = req.body.name;
    const contactNo = req.body.contactNo;
    const plantedDate = req.body.plantedDate;
    const type = req.body.type;
    const amount = req.body.amount;
    const totalPrice = req.body.totalPrice;
    const isChecked = Boolean(req.body.isChecked); //for check CB


    const newMgt = new FertilizerMgt({
        nic,
        name,
        contactNo, 
        plantedDate,
        type,
        amount,
        totalPrice,
        isChecked
    })
    newMgt.save().then(()=>{
        res.json("Request added")
    }).catch((err)=>{
        console.log(err);
    })
}) 

router.route("/getRequest").get((req,res)=>{

    FertilizerMgt.find().then((requests)=>{
        res.json(requests)
    }).catch((err)=>{
        console.log(err)
    })

})

router.route("/updateRequest/:id").put(async(req,res)=>{
    let userId = req.params.id;
    const{nic,name,contactNo,plantedDate,type,amount,totalPrice,isChecked} = req.body;

    const updateFarmer = {
        nic,
        name,
        contactNo,
        plantedDate,
        type,
        amount,
        totalPrice,
        isChecked
    }

    const update = await FertilizerMgt.findByIdAndUpdate(userId,updateFarmer)
    .then(()=>{
            res.status(200).send({status:"user updated "})
    }).catch((err)=>{
        console.log(err);
        res.status(500).send({status: "Error with updating data",err:err.message});
    })
})

router.route("/deleteRequest/:id").delete(async(req,res)=>{
    let userId = req.params.id;

    await FertilizerMgt.findByIdAndDelete(userId)
    .then(()=>{
        res.status(200).send({status: "User Deleted"})
    }).catch((err)=>{
        console.log(err.message);
        res.status(500).send({ststus: "Error with delete user",error:err.message})
    })
}) 

router.route("/getRequest/:id").get(async(req,res)=>{
    let userId = req.params.id;
    await FertilizerMgt.findById(userId)
    .then((FertilizerMgt)=>{
        res.status(200).send({status: "User Fetched",FertilizerMgt})
    }).catch((err)=>{
        console.log(err.message);
        res.status(500).send({status: "Error with get user",error: err.message})
    })
})
router.route("/getStockData/").get(async(req,res)=>{

    await FertilizerStock.find()
    .then((FertilizerStock)=>{
        res.status(200).send({status: "data fetched",FertilizerStock})
    }).catch((err)=>{
        console.log(err.message);
        res.status(500).send({status: "Error with data fetch",error: err.message})
    })
})


module.exports = router; 