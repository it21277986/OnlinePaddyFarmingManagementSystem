const router = require("express").Router();
let Ticket = require("../models/ticket");

//create oparation
router.route("/addticket").post((req,res)=>{ 
    const farmerName = req.body.farmerName;
    const NIC = req.body.NIC;
    const contactNo = req.body.contactNo;
    const fault = req.body.fault;
    const faultSection = req.body.faultSection;

    const newTicket = new Ticket({
        farmerName,
        NIC,
        contactNo,
        fault,
        faultSection
    })

    newTicket.save().then(()=>{
        res.json("Ticket Raised Successfully !")
    }).catch((err)=>{
        console.log(err);
    })
})

//display oparation(ALL)
router.route("/ticket").get((req,res)=>{
    Ticket.find().then((ticket)=>{
        res.json(ticket)
    }).catch((err)=>{
        console.log(err)
    })
})

//update oparation
router.route("/updateticket/:tId").put(async(req,res)=>{
    let ticketId = req.params.tId;
    const {farmerName,NIC,contactNo,fault,faultSection} = req.body;

    const updateTicket = {
        farmerName,
        NIC,
        contactNo,
        fault,
        faultSection
    }
    const update = await Ticket.findByIdAndUpdate(ticketId, updateTicket).then(()=>{
        res.status(200).send({status: "Ticket details updated"})
    }).catch((err)=>{
        console.log(err);
        res.status(500).send({status: "Error with updating data",error: err.massage});
    })
})

//delete oparation
router.route("/deleteticket/:tId").delete(async(req,res)=>{
    let ticketId = req.params.tId;

    await Ticket.findByIdAndDelete(ticketId).then(()=>{
        res.status(200).send({status: "Ticket Deleted"});
    }).catch((err)=>{
        console.log(err.massage);
        res.status(500).send({status: "Error with delete Ticket",error: err.massage});
    })
})

//display (ONE)
router.route("/getticket/:tId").get(async(req, res)=>{
    let ticketId = req.params.tId;
    const user = await Ticket.findById(ticketId).then((ticket)=>{
        res.status(200).send({status: "Ticket fetched", ticket})
    }).catch(()=>{ 
        console.log(err.massage);
        res.status(500).send({status: "Error with get Ticket",error: err.massage})
    })
})

module.exports = router;