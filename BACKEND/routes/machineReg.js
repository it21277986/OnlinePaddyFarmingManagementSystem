const router = require("express").Router();
let MachineReg = require("../models/machineReg");

//add data to database
router.route("/addMachine").post((req, res)=>{
    const machineOwnerName= req.body.machineOwnerName;
    const machineType= req.body.machineType;
    const engineNumber= req.body.engineNumber;
    const dateOfRegistration= req.body.dateOfRegistration;
    const contactNumber= req.body.contactNumber;

    const newMachineReg = new MachineReg({
        machineOwnerName,
        machineType,
        engineNumber,
        dateOfRegistration,
        contactNumber
    })
    
    newMachineReg.save().then(()=>{
        res.json("Saved successfully")
    }).catch((err)=>{
        console.log(err);
    }) 
})

    //read
    router.route("/displayMachine").get((req, res) => {
        MachineReg.find().then((machineReg) => {
            res.json(machineReg); // Send the data as JSON
        }).catch((err) => {
            console.log(err);
            res.status(500).json({ error: "Error fetching machine data" }); // Send an error response
        });
    });
    
//update
    router.route("/updateMachine/:id").put(async (req, res) => {
        const machineRegId = req.params.id; // Use ':id' as the parameter name
        const {
            machineOwnerName,
            machineType,
            engineNumber,
            dateOfRegistration,
            contactNumber,
        } = req.body;
    
        const updateMachineReg = {
            machineOwnerName,
            machineType,
            engineNumber,
            dateOfRegistration,
            contactNumber,
        };
    
        try {
            const updatedMachine = await MachineReg.findByIdAndUpdate(
                machineRegId,
                updateMachineReg,
                { new: true } // This option returns the updated document
            );
    
            if (updatedMachine) {
                res.status(200).send({ status: "Machine updated", machine: updatedMachine });
            } else {
                res.status(404).send({ status: "Machine not found" });
            }
        } catch (err) {
            console.error(err);
            res.status(500).send({ status: "Error with updating data" });
        }
    });
    

    //Delete
    router.route("/deleteMachine/:id").delete(async(req, res) => {
        let machineRegId = req.params.id; // Change 'mid' to 'id'
    
        await MachineReg.findByIdAndDelete(machineRegId)
            .then(() => {
                res.status(200).send({ status: "MachineDeleted" });
            })
            .catch((err) => {
                console.log(err.message);
                res.status(500).send({ status: "Error with delete data" });
            });
    });
    

    router.route("/getMachine/:id").get(async (req, res) => {
        const machineRegId = req.params.id; // Use ':id' as the parameter name
    
        try {
            const machineReg = await MachineReg.findById(machineRegId);
    
            if (machineReg) {
                res.status(200).json({ status: "Machine fetched", machine: machineReg });
            } else {
                res.status(404).json({ status: "Machine not found" });
            }
        } catch (err) {
            console.error(err.message);
            res.status(500).json({ status: "Error with getting machine", error: err.message });
        }
    });
    
    

module.exports= router; 