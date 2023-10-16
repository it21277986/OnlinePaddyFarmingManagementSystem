const router = require("express").Router();
 let Harvest = require("../models/Harvest");

//Add new values
 router.route("/addHarvest").post((req,res)=>{

    const name = req.body.name;
    const date = req.body.date;
    const address = req.body.address;
    const email = req.body.email;
    const NIC = req.body.NIC;
    const area = req.body.area;
    const ricetype = req.body.ricetype;
    const cultivatedamount = req.body.cultivatedamount;
    const agreedamount = req.body.agreedamount;
    const status = req.body.status;
    const contactNumber= req.body.contactNumber;

    const newHarvest = new Harvest({

        name,
        date,
        address,
        email,
        NIC,
        area,
        ricetype,
        cultivatedamount,
        agreedamount,
        status,
        contactNumber

    })

    newHarvest.save().then(()=>{
        res.json("Harvest Added")
    }).catch((err)=>{
        console.log(err);
    })

 }) ;

 //Get All records
 router.route("/Harvest").get((req,res)=>{

    Harvest.find().then((harvests)=>{
        res.json(harvests)

    }).catch((err)=>{
        console.log(err)
    })


 });

 //Update the record with given ID
 router.route("/updateHarvest/:id").put(async(req, res)=> {
    let userId = req.params.id;
    const{name,date, address, email,NIC,area,ricetype,cultivatedamount,agreedamount,status,contactNumber} = req.body;  

    const updateHarvest = {
        name,
        
        date,
        address,
        email,
        NIC,
        area,
        ricetype,
        cultivatedamount,
        agreedamount,
        status,
        contactNumber

    }
    const update = await Harvest.findByIdAndUpdate(userId, updateHarvest)
    .then(()=> {
        res.status(200).send({status: "user updated"})   
    }).catch((err=> {
        console.log(err);
        res.status(500).send({status: "Error with updating data" , error: err.message});
    }))
   
 });

//Delete record with given UD
router.route("/deleteHarvest/:id").delete(async (req,res) =>{
    let userId = req.params.id;

    await Harvest.findByIdAndDelete(userId)
    .then(() =>{
        res.status(200).send({status: "User deleted"});
        }).catch((err)=>{
        console.log(err.message);
        res.status(500).send({status: "Error with deleted user"})
    })
});

//Get user values with given ID
router.route("/getHarvest/:id").get(async (req, res) =>{
    let userId = req.params.id;
    const user = await Harvest.findById(userId).then((harvest)=>{
        res.status(200).send({status: "User fetched",harvest})
    }).catch((err)=>{
        console.log(err.message);
        res.status(500).send({status: "Error with get user", error: err.mrssage});
    })
});

 module.exports = router;