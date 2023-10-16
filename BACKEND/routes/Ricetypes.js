const router = require("express").Router();
 let Ricetype = require("../models/Ricetype");

//Add new values
 router.route("/addRicetype").post((req,res)=>{

    const ricetypename = req.body.ricetypename;
    const quantity = req.body.quantity;

    const newRicetype = new Ricetype({

        ricetypename,
        quantity
       

    })

    newRicetype.save().then(()=>{
        res.json("Rice Added")
    }).catch((err)=>{
        console.log(err);
    })

 }) ;

 //Get All records
 router.route("/Ricetype").get((req,res)=>{

    Ricetype.find().then((ricetypes)=>{
        res.json(ricetypes)

    }).catch((err)=>{
        console.log(err)
    })


 });

 //Update the record with given ID
 router.route("/updateRicetype/:id").put(async(req, res)=> {
    let userId = req.params.id;
    const{ricetypename, quantity } = req.body;  

    const updateRicetype = {
        ricetypename,
        quantity
        

    }
    const update = await Ricetype.findByIdAndUpdate(userId, updateRicetype)
    .then(()=> {
        res.status(200).send({status: "rice updated"})   
    }).catch((err=> {
        console.log(err);
        res.status(500).send({status: "Error with updating data" , error: err.message});
    }))
   
 });

//Delete record with given UD
router.route("/deleteRicetype/:id").delete(async (req,res) =>{
    let userId = req.params.id;

    await Ricetype.findByIdAndDelete(userId)
    .then(() =>{
        res.status(200).send({status: "User deleted"});
        }).catch((err)=>{
        console.log(err.message);
        res.status(500).send({status: "Error with deleted user"})
    })
});

//Get user values with given ID
router.route("/getRicetype/:id").get(async (req, res) =>{
    let userId = req.params.id;
    const user = await Ricetype.findById(userId)  
    .then((riceTypes)=>{
        res.status(200).send({status: "User fetched",riceTypes})
    }).catch((err)=>{
        console.log(err.message);
        res.status(500).send({status: "Error with get user", error: err.mrssage});
    })
});

 module.exports = router;