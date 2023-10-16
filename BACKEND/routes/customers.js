const router = require("express").Router();
const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");
const multer = require("multer");
const path = require("path");
const fs = require("fs");

let Customer = require("../models/Customer");
const DeletedCustomer = require('../models/DeletedCustomer');
const mongoose = require('mongoose');



// Configure multer to handle file uploads
const storage = multer.diskStorage({
    destination: 'uploads/', // Directory where uploaded images will be stored
    filename: (req, file, cb) => {
      cb(null, Date.now() + path.extname(file.originalname)); // Rename uploaded file with a unique name
    },
  });
  
  const upload = multer({ storage });
  
  // Add a route to handle image uploads
  router.post("/register/uploadProfileImage/:nic", upload.single("profileImage"), async (req, res) => {
    try {
      const nic = req.params.nic;
      const imageUrl = req.file.path; // This should be the URL where the image is stored
  
      // Update the profileImage field in the Customer document
      await Customer.findOneAndUpdate({ nic }, { profileImage: imageUrl });
  
      res.json({ imageUrl });
    } catch (error) {
      console.error('Error uploading image', error);
      res.status(500).json({ message: "Internal Server Error" });
    }
  });




//newly registered one
router.route("/register").post(async (req, res) => { // Mark this function as async
    const fname = req.body.fname;
    const lname = req.body.lname;
    const username = req.body.username;
    const nic = req.body.nic;
    const no = req.body.no;
    const street = req.body.street;
    const city = req.body.city;
    const phone = req.body.phone; 
    const password = req.body.password;
    //const confirmPassword = req.body.confirmPassword;

    const landOwnerName = req.body.landOwnerName;
    const province = req.body.province;
    const districtCode = req.body.districtCode;
    const devisionCode = req.body.devisionCode;
    const blockNo = req.body.blockNo;
    const feildSize = req.body.feildSize;

    try {
        const salt = await bcrypt.genSalt(10); // Generate a salt
        const hashedPassword = await bcrypt.hash(password, salt);

        const newCustomer = new Customer({
            fname,
            lname,
            username,
            nic,
            no,
            street,
            city,
            phone,
            password: hashedPassword, // Store the hashed password in the database
            //confirmPassword,
            landOwnerName,
            province,
            districtCode,
            devisionCode,
            blockNo,
            feildSize,
        });

        await newCustomer.save(); // Save the new customer with hashed password

        res.json("Customer Registration Successful");
    } catch (err) {
        console.log(err);
        res.status(500).json({ message: "Internal Server Error" });
    }
});






router.route("/fetch").get((req,res)=>{

    Customer.find().then((customers)=>{
        res.json(customers)
    }).catch((err)=>{
        console.log(err)
    })
})


router.route("/updateCus/:nic").put(async(req,res)=> {

    let Nic = req.params.nic;
    const {fname, lname, nic, username, phone, no, street, city, password, landOwnerName, province, districtCode, devisionCode, blockNo, feildSize } = req.body;

    const updateCustomer = {
        fname,
        lname,
        username,
        //dob,
        nic,
        //gender,
        no,
        street,
        city,
        phone,
        password,
        //confirmPassword,
        landOwnerName,
        province,
        districtCode,
        devisionCode,
        blockNo,
        feildSize,
        //MPACode
    }

    const update = await Customer.findOneAndUpdate({ nic: Nic }, updateCustomer).then(()=> {

        res.status(200).send({status: "Customer Updated successfully"})

    }).catch((err)=> {

        console.log(err);
        res.status(500).send({status: "Error with updating data"});

    })  
})



router.route('/deleteCus/:nic').delete(async (req, res) => {
    const nic = req.params.nic;

    try {
        // Step 1: Find the customer account by NIC
        const customerToDelete = await Customer.findOne({ nic });

        if (!customerToDelete) {
            return res.status(404).json({ status: 'Customer not found' });
        }

        // Step 2: Remove the customer account from the existing table
        await Customer.findOneAndDelete({ nic });

        // Step 3: Save the removed customer account to the new table (e.g., "deleted_accounts")
        const deletedCustomer = new DeletedCustomer(customerToDelete.toObject()); // Create a new instance of DeletedCustomer

        await deletedCustomer.save(); // Save the customer to the "deleted_accounts" table

        res.status(200).json({ status: 'Customer Deleted successfully' });
    } catch (err) {
        console.error(err.message);
        res.status(500).json({ status: 'Error with delete customer', error: err.message });
    }
});


router.route("/getUser/:nic").get(async(req,res)=> {

    let Nic = req.params.nic;

    const cus = await Customer.findOne({ nic: Nic }).then((customer)=> {

        res.status(200).send({status: "Customer fetched", customer})

    }).catch((err)=> {

        console.log(err.message);
        res.status(500).send({status: "Error with customer", error: err.message});

    })
})


//newly registered login route
/*
router.route("/loginCus").post(async (req, res) => {
    try {
      const { username, password } = req.body;
  
      // Check if the user exists
      const user = await Customer.findOne({ username });
  
      if (!user) {
        return res.status(401).json({ message: "Invalid username or password" });
      }
  
      // Compare the provided password with the stored hash
      const validPassword = await bcrypt.compare(password, user.password);
  
      if (!validPassword) {
        return res.status(401).json({ message: "Invalid username or password" });
      }
  
      // Generate and return a JWT token
      const token = jwt.sign({ userId: user._id }, process.env.JWT_SECRET);
      res.status(200).json({ message: `${username} login successfully`, nic: user.nic, /*token*/ //});
    //} catch (error) {
      //console.error(error);
      //res.status(500).json({ message: "Internal Server Error", error: error.message });
    //}
  //});


//above one is correct

router.route("/loginCus").post(async (req, res) => {
  try {
    const { username, password } = req.body;

    // Check if it's an HR login (username: 'HR', password: 'manager')
    if (username === 'HR' && password === 'manager') {
      // Simulate HR login and navigate to HR home page
      return res.status(200).json({ message: `${username} login successfully`, isHR: true });
    }

    if (username === 'FERTILIZER' && password === 'manager') {
      // Simulate FERTILIZER login and display a success message
      return res.status(200).json({ message: `${username} login successfully`, isFERTILIZER: true });
    }

    if (username === 'PESTICIDE' && password === 'manager') {
      // Simulate FERTILIZER login and display a success message
      return res.status(200).json({ message: `${username} login successfully`, isPESTICIDE: true });
    }

    if (username === 'ESTABLISHER' && password === 'manager') {
      // Simulate FERTILIZER login and display a success message
      return res.status(200).json({ message: `${username} login successfully`, isESTABLISHER: true });
    }

    if (username === 'HARVESTER' && password === 'manager') {
      // Simulate FERTILIZER login and display a success message
      return res.status(200).json({ message: `${username} login successfully`, isHARVESTER: true });
    }

    if (username === 'PADDYMILL' && password === 'manager') {
      // Simulate FERTILIZER login and display a success message
      return res.status(200).json({ message: `${username} login successfully`, isPADDYMILL: true });
    }

    if (username === 'SOCIETY' && password === 'manager') {
      // Simulate FERTILIZER login and display a success message
      return res.status(200).json({ message: `${username} login successfully`, isSOCIETY: true });
    }

    if (username === 'MACHINARY' && password === 'manager') {
      // Simulate FERTILIZER login and display a success message
      return res.status(200).json({ message: `${username} login successfully`, isMACHINARY: true });
    }

    // For regular users, check if the user exists in the database
    const user = await Customer.findOne({ username });

    if (!user) {
      return res.status(401).json({ message: "Invalid username or password" });
    }

    // Compare the provided password with the stored hash
    const validPassword = await bcrypt.compare(password, user.password);

    if (!validPassword) {
      return res.status(401).json({ message: "Invalid username or password" });
    }

    // For regular users, generate and return a JWT token
    const token = jwt.sign({ userId: user._id }, process.env.JWT_SECRET);
    return res.status(200).json({ message: `${username} login successfully`, nic: user.nic, isHR: false, isFERTILIZER: false, token });
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: "Internal Server Error", error: error.message });
  }
});





    router.get('/customer/getProfileImage/:nic', (req, res) => {
    const { nic } = req.params;
  
    // Construct the file path based on the NIC
    const filePath = path.join(__dirname, 'profileImages', `${nic}.jpg`);
  
    // Check if the file exists
    if (fs.existsSync(filePath)) {
      // If the file exists, send it as a response
      const imageStream = fs.createReadStream(filePath);
      imageStream.pipe(res);
    } else {
      // If the file does not exist, send the default image
      const defaultImagePath = path.join(__dirname, 'profileImages', 'default_image.png');
      const defaultImageStream = fs.createReadStream(defaultImagePath);

      defaultImageStream.on('error', (error) => {
        // If there's an error reading the default image, you can handle it here
        console.error('Error reading default image:', error);
        res.status(500).json({ error: 'Internal Server Error' });
      });

      defaultImageStream.pipe(res);
    }
});



// Route to update or remove profile image
router.put("/updateProfileImage/:nic", upload.single("profileImage"), async (req, res) => {
  try {
    const nic = req.params.nic;
    const imageUrl = req.file ? req.file.path : null; // Check if an image was uploaded

    // Update the profileImage field in the Customer document
    await Customer.findOneAndUpdate({ nic }, { profileImage: imageUrl });

    // Update the user's profile image URL in local storage
    if (imageUrl) {
      localStorage.setItem(`userProfileImage_${nic}`, imageUrl);
    } else {
      // If imageUrl is null, remove the existing image URL from local storage
      localStorage.removeItem(`userProfileImage_${nic}`);
    }

    res.json({ imageUrl });
  } catch (error) {
    console.error('Error updating image', error);
    res.status(500).json({ message: "Internal Server Error" });
  }
});

// Add a route to check if a username already exists
router.route("/checkUsername/:username").get(async (req, res) => {
  try {
    const username = req.params.username;

    const existingUser = await Customer.findOne({ username });

    if (existingUser) {
      res.status(200).json({ usernameExists: true });
    } else {
      res.status(200).json({ usernameExists: false });
    }
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: "Internal Server Error" });
  }
});


router.route("/checkNIC/:nic").get(async (req, res) => {
  try {
    const nic = req.params.nic;

    // Access the "requestforms" and "harvests" collections
    const requestFormsCollection = mongoose.connection.db.collection("requestforms");
    const harvestCollection = mongoose.connection.db.collection("harvests");
    const distributionsCollection = mongoose.connection.db.collection("distributions");
    const seedReqsCollection = mongoose.connection.db.collection("seedreqs");
    const machinereqsCollection = mongoose.connection.db.collection("machinereqs");

    // Find documents in "requestforms" where the NIC matches
    const requestForms = await requestFormsCollection.find({ nic: nic }).toArray();

    // Find documents in "harvests" where the NIC matches
    const harvestData = await harvestCollection.find({ NIC: nic }).toArray();

    // Find documents in "distributions" where the NIC matches
    const distributionsData = await distributionsCollection.find({ nic: nic }).toArray();

    // Find documents in "distributions" where the NIC matches
    const seedReqsData = await seedReqsCollection.find({ nic: nic }).toArray();

    const machinereqsData = await machinereqsCollection.find({ farmerId: nic }).toArray();
    

    if (requestForms.length > 0 || harvestData.length > 0 || distributionsData.length > 0 || seedReqsData.length > 0 || machinereqsData.length > 0) {
      // Combine data from both tables into a single array
      const mergedData = [...requestForms, ...harvestData, ...distributionsData, ...seedReqsData, ...machinereqsData];
      res.status(200).json(mergedData);
    } else {
      
      res.status(200).json({ message: "No data found for this NIC" });
    }
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: "Internal Server Error" });
  }
});


// route to fetch all deleted customers
router.route('/fetchDeletedCustomers').get(async (req, res) => {
  try {
    const deletedCustomers = await DeletedCustomer.find();
    res.json(deletedCustomers);
  } catch (error) {
    console.error('Error fetching deleted customer list', error);
    res.status(500).json({ message: 'Internal Server Error' });
  }
});


module.exports = router;