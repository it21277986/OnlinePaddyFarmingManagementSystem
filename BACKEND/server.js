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


app.listen(PORT, () => {
  console.log(`Server is up and running on the port number: ${PORT}`);
});
