const router = require("express").Router();
let Pesticide =require("../models/Pesticide");
const multer = require("multer");
const fs = require('fs');



// Set up Multer for file uploads
const storage= multer.diskStorage({
  destination:(req,file,cb)=>{
    cb(null,'uploads')
  },
  filename : (req,file,cb)=>
  cb(null,file.originalname)
 })
 const upload=multer({storage:storage})

 router.route('/add').post(upload.single('image'),(req,res)=>{
  const product= new Pesticide({
     pesticideId: req.body.pesticideId,
     image : {
      data: fs.readFileSync('uploads/' + req.file.filename),
      contentType: "image/png"
  },
    pesticideType : req.body.pesticideType,
    chemicalName : req.body.chemicalName,
    manufacturer : req.body.manufacturer,
    productName : req.body.productName,
    classification : req.body.classification,
    pests : req.body.pests,
    quantity : Number(req.body.quantity),
    price : req.body.price,
    packs : req.body.packs,
    description : req.body.description
    
  
  

  });
  product.save()
  .then(() => {
    res.json("Pesticide Added");
  })
  .catch((err) => {
    console.error("Error adding pesticide:", err);
    res.status(500).json({ error: "Server error" });
  });

 })

// Read function 
router.route("/").get(async (req, res) => {
  try {
    const pesticides = await Pesticide.find(); // Exclude the image field

    // Check if there are any pesticides in the database
    if (!pesticides || pesticides.length === 0) {
      return res.status(404).json({ error: "No pesticides found" });
    }

    // Send the entire array of pesticides in the response
    res.json(pesticides);
  } catch (error) {
    console.error("Error fetching pesticides:", error);
    res.status(500).json({ error: "Server error" });
  }
});

router.route("/updateAll/:pesticideId").put(upload.single("image"), async (req, res) => {
  try {
    const pesticideId = req.params.pesticideId;
    const {
      pesticideType,
      chemicalName,
      manufacturer,
      productName,
      classification,
      pests,
      availability,
      quantity,
      price,
      packs,
      description,
    } = req.body;

    // Check if the pesticide exists
    const existingPesticide = await Pesticide.findOne({ pesticideId });

    if (!existingPesticide) {
      return res.status(404).json({ error: "Pesticide not found" });
    }

    // Delete the existing image if it exists
    if (existingPesticide.image) {
      // Construct the correct file path based on the existing image filename
      const imagePath = `uploads/${existingPesticide.image.filename}`;
      
      // Use fs.existsSync to check if the file exists before attempting to delete it
      if (fs.existsSync(imagePath)) {
        fs.unlinkSync(imagePath);
      }
    }

    // Upload the new image (assuming req.file contains the uploaded file)
    const image = {
      data: fs.readFileSync(`uploads/${req.file.filename}`),
      contentType: "image/png"
    };

    // Update the pesticide with the new data, including the image
    const updatePesticide = {
      pesticideType,
      chemicalName,
      manufacturer,
      productName,
      classification,
      pests,
      availability,
      quantity,
      price,
      packs,
      description,
      image, // Assign the new image
    };

    // Use findOneAndUpdate to update the pesticide
    await Pesticide.findOneAndUpdate({ pesticideId }, updatePesticide);

    res.json("Pesticide Updated");
  } catch (error) {
    console.error("Error updating pesticide:", error);
    res.status(500).json({ error: "Server error" });
  }
});




 //Delete function

 router.route("/delete/:pesticideId").delete(async (req, res) => {
  try {
    let pesticide = req.params.pesticideId;
    const deletedPesticide = await Pesticide.findOneAndDelete({ pesticideId: pesticide });

    if (deletedPesticide) {
      res.json("Pesticide Deleted");
    } else {
      res.status(404).json({ message: `Product ${pesticide} does not exist` });
    }
  } catch (err) {
    console.error(err);
    res.status(500).json({ message: "An error occurred while deleting the pesticide" });
  }
});
 
//fetching one pesticide

router.route("/get/:pesticideId").get(async(req,res)=>{
    let pesticide=req.params.pesticideId;
   const pest= await Pesticide.findOne({ pesticideId: pesticide }).then((pest)=>{
        res.json(pest) //success
    }).catch((err)=>{ //unsuccess

        console.log(err);
 
    })     

}) 

//fetching one pesticide useing name

router.route("/get/:productName").get(async(req,res)=>{
  let pesticide=req.params.productName;
 const pest= await Pesticide.findOne({ productName: pesticide }).then((pest)=>{
      res.json(pest) //success
  }).catch((err)=>{ //unsuccess

      console.log(err);

  })     

}) 
 
//fetching pesticides according to type 
router.route("/get/:pesticideType").get(async(req,res)=>{
    let pesticide=req.params.pesticideType;
   const pest= await Pesticide.findOne({ pesticideType: pesticide }).then((pest)=>{ 
        res.json(pest) //success
    }).catch((err)=>{ //unsuccess

        console.log(err);
 
    })     

}) 

//fetch the image using the object id 
router.get("/get-pesticide/:pesticideId", async (req, res) => {
    try {
      const pesticideId = req.params.pesticideId;
      console.log("Requested Product:", pesticideId); // Add this line for debugging
  
      const pesticide = await Pesticide.findOne({ pesticideId: pesticideId });
  
      if (!pesticide) {
        console.log("Image not found in the database."); // Add this line for debugging
        return res.status(404).json({ error: "Image not found" });
      }
  
      // Set the appropriate content type for an image
      res.contentType(pesticide.image.contentType);
  
      // Send the binary data as a response
      res.send(pesticide.image.data);
    } catch (error) {
      console.error("Error fetching image:", error);
      res.status(500).json({ error: "Server error" });
    }
  });
   
  //  route to fetch related products
// Add a new route to fetch related products
router.route("/related/:pesticideId").get(async (req, res) => {
  try {
    const pesticideId = req.params.pesticideId;

    // Find the current product
    const currentProduct = await Pesticide.findOne({ pesticideId });

    if (!currentProduct) {
      return res.status(404).json({ error: "Product not found" });
    }

    // Find up to 5 related products excluding the current one
    const relatedProducts = await Pesticide.find({
      _id: { $ne: currentProduct._id }, // Exclude the current product by _id
      pesticideType: currentProduct.pesticideType, // Match the pesticideType of the current product
    }).limit(5);

    res.json(relatedProducts);
  } catch (error) {
    console.error("Error fetching related products:", error);
    res.status(500).json({ error: "Server error" });
  }
});



// Update quantity and availability
router.route("/update/:pesticideId").put(async (req, res) => {
  try {
    const pesticideId = req.params.pesticideId;
    const { quantity, availability , updatedTime } = req.body;

    // Check if the pesticide exists
    const existingPesticide = await Pesticide.findOne({ pesticideId });

    if (!existingPesticide) {
      return res.status(404).json({ error: "Pesticide not found" });
    }

    // Update only the quantity and availability fields
    existingPesticide.quantity = quantity;
    existingPesticide.availability = availability;
    existingPesticide.updatedTime = new Date().toISOString().split('T')[0];
    // Save the updated pesticide
    await existingPesticide.save();

    res.json("Quantity and availability updated");
  } catch (error) {
    console.error("Error updating quantity and availability:", error);
    res.status(500).json({ error: "Server error" });
  }
});

router.route("/products/search").get(async (req, res) => {
  try {
    const { productName } = req.query;
    // Perform a MongoDB query to search for products by name
    const products = await Pesticide.find({ productName: { $regex: productName, $options: 'i' } });
    res.json(products);
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: 'An error occurred' });
  }
});




module.exports = router;

