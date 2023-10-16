const express = require("express");
const mongoose = require("mongoose");
const bodyParser = require("body-parser");
const cors = require("cors");
const dotenv = require("dotenv");
const app = express();
require("dotenv").config();

// Set the port for the server to listen on, using the environment variable or a default value
const PORT = process.env.PORT || 8070;

app.use(cors());
app.use(bodyParser.json());

// Retrieve MongoDB connection URL from environment variables
const URL = process.env.MONGODB_URL;

// Connect to MongoDB using Mongoose
mongoose.connect(URL, {
  useNewUrlParser: true,
  useUnifiedTopology: true,
});
const connection = mongoose.connection;
connection.on("error", (error) => {
  console.error("Error connecting to MongoDB:", error);
});
connection.once("open", () => {
  console.log("MongoDB Connection success!");
});

//Lakmal --------------------------------------------------------------------------
//Society Router
const societyRouter = require("./routes/society.js");
app.use("/society",societyRouter)

//Ticket Router
const ticketRouter = require("./routes/ticket.js");
app.use("/ticket",ticketRouter)

//Breakdown Router
const breakdownRouter = require("./routes/breakdown.js");
app.use("/breakdown",breakdownRouter)

//kalpana---------------------------------------------------------------------------
//Machine registration router
const machineRegRouter = require ("./routes/machineReg.js");
app.use("/machineReg", machineRegRouter)

//machine request router
const machineReqRouter= require("./routes/machineReq.js");
app.use("/machineReq", machineReqRouter)

//fuel request router
const fuelReqRouter= require ("./routes/fuelRequest.js");
app.use("/fuelReq", fuelReqRouter)

//payment router
const paymentRouter= require("./routes/payment.js");
app.use("/payment",paymentRouter )


//Weenali -------------------------------------------------------------------
const harvestRouter = require("./routes/Harvests.js");
app.use("/harvest",harvestRouter);

const farmerbuyingpriceRouter= require("./routes/Farmerbuyingprice.js");
app.use("/farmerbuyingprice",farmerbuyingpriceRouter);

const ricetypeRouter = require("./routes/Ricetypes.js");
app.use("/ricetype",ricetypeRouter);

const costDetails = require("./routes/Costdetails.js");
app.use("/costDetails",costDetails);

//Binguni---------------------------------------------------------------------------------------
//paddymill router
const paddymillRouter = require("./routes/paddymill");
app.use("/paddymill",paddymillRouter)

//tender router
const tenderRouter = require("./routes/tender");
app.use("/tender",tenderRouter)

//pricefixing router
const priceRouter = require("./routes/price");
app.use("/price",priceRouter)

//Sachini --------------------------------------------------------------------------
const customerRoutes = require('./routes/customers');
app.use('/customer', customerRoutes); 


//Thimalka ---------
//Seed Router
const seedRouter = require("./routes/Seed.js");
app.use("/seed",seedRouter)

//Thimalka ---------
//Seed Requests Router
const seedreqRouter = require("./routes/Seedreq.js");
app.use("/seedreq",seedreqRouter)

//Thimalka ---------
//Paddy variety Router
const paddyvarRouter = require("./routes/Paddyvar.js");
app.use("/paddyvar",paddyvarRouter)

//Kavindu --------------------------------------------------------------------------
const FertilizerMgtRouter = require("./routes/FertilizerMgt.js");
app.use("/FertilizerMgt", FertilizerMgtRouter);

const depositSlipRouter = require("./routes/UploadSlip.js");
app.use("/UploadSlip", depositSlipRouter);

const FertilizerStockRouter = require("./routes/FertilizerStock.js");
app.use("/FertilizerStock", FertilizerStockRouter);
app.use("/UpdateRecord", FertilizerStockRouter);

//Sammani ------------------------------------------------------
// Initialize the counter if it doesn't exist
Counter.findOne({ name: "IdCounter" })
.then((counter) => {
  if (!counter) {
    // Create a new counter document if it doesn't exist
    const newCounter = new Counter({ name: "IdCounter", count: 0 });
    return newCounter.save();
  }
  return null; // No need to return anything if the counter already exists
})
.then(() => {
  console.log("Counter initialized successfully.");
})
.catch((err) => {
  console.error("Error initializing counter:", err);
});

const requestFormRouter = require("./routes/requestForms.js");
app.use("/requestPesticide",requestFormRouter);


const responseRouter = require("./routes/bankSlip.js");
app.use("/bankPayment",responseRouter);

const pesticideRouter = require("./routes/pesticide.js");
app.use("/pesticides",pesticideRouter);


app.listen(PORT, () => {
  console.log(`Server is up and running on the port number: ${PORT}`);
});
