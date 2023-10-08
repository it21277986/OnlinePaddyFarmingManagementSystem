const router = require("express").Router();
let Society = require("../models/society");

//create oparation
router.route("/addSociety").post((req,res)=>{ 
    const societyname = req.body.societyname;
    const regid = req.body.regid;
    const address = req.body.address;
    const presidentname = req.body.presidentname;
    const presidentnic = req.body.presidentnic;
    const contactno = req.body.contactno;

    const newSociety = new Society({
        societyname,
        regid,
        address,
        presidentname,
        presidentnic,
        contactno
    })

    newSociety.save().then(()=>{
        res.json("Society Added")
    }).catch((err)=>{
        console.log(err);
    })
})

//display oparation(ALL)
router.route("/Society").get((req,res)=>{
    Society.find().then((society)=>{
        res.json(society)
    }).catch((err)=>{
        console.log(err)
    })
})

//update oparation
router.route("/updateSociety/:sId").put(async(req,res)=>{
    let societyId = req.params.sId;
    const {societyname,regid,address,presidentname,presidentnic,contactno} = req.body;

    const updateSociety = {
        societyname,
        regid,
        address,
        presidentname,
        presidentnic,
        contactno
    }
    const update = await Society.findByIdAndUpdate(societyId, updateSociety).then(()=>{
        res.status(200).send({status: "Society details updated"})
    }).catch((err)=>{
        console.log(err);
        res.status(500).send({status: "Error with updating data",error: err.massage});
    })
})

//delete oparation
router.route("/deleteSociety/:sId").delete(async(req,res)=>{
    let societyId = req.params.sId;

    await Society.findByIdAndDelete(societyId).then(()=>{
        res.status(200).send({status: "Society Deleted"});
    }).catch((err)=>{
        console.log(err.massage);
        res.status(500).send({status: "Error with delete Society",error: err.massage});
    })
})

//display (ONE)
router.route("/getSociety/:sId").get(async(req, res)=>{
    let societyId = req.params.sId;
    const user = await Society.findById(societyId).then((society)=>{
        res.status(200).send({status: "Society fetched", society})
    }).catch(()=>{
        console.log(err.massage);
        res.status(500).send({status: "Error with get Society",error: err.massage})
    })
})

module.exports = router;