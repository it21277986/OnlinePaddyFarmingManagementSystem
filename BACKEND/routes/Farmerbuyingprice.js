const router = require("express").Router();
let Farmerbuyingprice = require("../models/Farmerbuyingprice");

//Add new values
 router.route("/addFarmerbuyingprice").post((req,res)=>{

    const nic = req.body.nic;
    const date = req.body.date;
    const total = req.body.total;
    const wastage = req.body.wastage;
    const profit = req.body.profit;
    const sellingprice = req.body.sellingprice;
    
    const newFarmerbuyingprice = new Farmerbuyingprice({

        nic,
        date,
        total,
        wastage,
        profit,
        sellingprice
        
    
       

    })

    newFarmerbuyingprice.save().then(()=>{
        res.json("Price cost Added")
    }).catch((err)=>{
        console.log(err);
    })

 }) ;

// GET data by NIC
router.get('/getFarmerbuyingprice/:nic', async (req, res) => {
    const { nic } = req.params;
  
    try {
      // Find documents that match the NIC
      const data = await Farmerbuyingprice.find({ nic });
  
      if (data.length === 0) {
        return res.status(404).json({ message: 'No data found for the provided NIC.' });
      }
  
      res.status(200).json(data);
    } catch (error) {
      console.error('Error fetching data:', error);
      res.status(500).json({ message: 'Server error' });
    }
  });

 module.exports = router;