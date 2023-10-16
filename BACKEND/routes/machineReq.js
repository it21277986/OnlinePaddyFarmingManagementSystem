const router = require("express").Router();
let MachineReq = require("../models/machineReq");

//create oparation
router.route("/addMachineReq").post((req,res)=>{ 
    const farmerId = req.body.farmerId;
    const farmerName = req.body.farmerName;
    const machineName = req.body.machineName;
    const noOfDays = req.body.noOfDays;
    const payableAmount= req.body.payableAmount;
    
    const newMachineReq = new MachineReq({
        farmerId,
        farmerName,
        machineName,
        noOfDays, 
        payableAmount,
        dateOfRequest
    })

    newMachineReq.save().then(()=>{
        res.json("Request Added")
    }).catch((err)=>{
        console.log(err);
    })
})

//display oparation(ALL)
router.route("/MachineReq").get((req,res)=>{
    MachineReq.find().then((machineReq)=>{
        res.json(machineReq)
    }).catch((err)=>{
        console.log(err)
    })
})

//update oparation
router.route("/updateMachineReq/:mId").put(async(req,res)=>{
    let machineReqId = req.params.sId;
    const {farmerId, farmerName,machineName,noOfDays, payableAmount, dateOfRequest} = req.body;

    const updateMachineReq = {
        farmerId,
        farmerName,
        machineName,
        noOfDays,
        payableAmount,
        dateOfRequest
    }
    const update = await MachineReq.findByIdAndUpdate(machineReqId, updateMachineReq).then(()=>{
        res.status(200).send({status: "Request updated"})
    }).catch((err)=>{
        console.log(err);
        res.status(500).send({status: "Error with updating data",error: err.massage});
    })
})

//delete oparation
router.route("/deleteMachineReq/:mId").delete(async(req,res)=>{
    let machineReqId = req.params.sId;

    await MachineReq.findByIdAndDelete(machineReqId).then(()=>{
        res.status(200).send({status: "Request Deleted"});
    }).catch((err)=>{
        console.log(err.massage);
        res.status(500).send({status: "Error with delete request",error: err.massage});
    })
})

//display (ONE)
router.route("/getMachineReq/:mId").get(async(req, res)=>{
    let machineReqId = req.params.mId;
    const user = await MachineReq.findById(machineReqId).then((machineReq)=>{
        res.status(200).send({status: "Request fetched", machineReq})
    }).catch(()=>{
        console.log(err.massage);
        res.status(500).send({status: "Error with get machineReq",error: err.massage})
    })
})

//search
router.get('/search', async (req, res) => {
    try {
      const {query}=req.query;
      const results=await Person.find({$text:{$search:query}});
      res.json(results);
    } catch (error){
      res.status(500).json({ error: err.message });
    }
  });

module.exports = router;