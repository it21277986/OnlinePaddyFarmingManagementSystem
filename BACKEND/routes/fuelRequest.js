const router = require("express").Router();
const QRCode = require("qrcode");
const FuelReq = require("../models/fuelRequest"); // Corrected capitalization

// Create operation
router.route("/addFuelReq").post((req, res) => {
  const { farmerId, sizeOfLand, noOfDays, quantity, price, volume, qrcode } =
    req.body;

  const newFuelReq = new FuelReq({
    farmerId,
    sizeOfLand,
    noOfDays,
    quantity,
    price,
    volume, // Newly added
    qrcode,
  });

  newFuelReq
    .save()
    .then(() => {
      res.json("Request Added");
    })
    .catch((err) => {
      console.log(err);
      res
        .status(500)
        .send({ status: "Error with adding data", error: err.message });
    });
});

// Display operation (ALL)
router.route("/FuelReq").get((req, res) => {
  FuelReq.find()
    .then((fuelReqs) => {
      res.json(fuelReqs);
    })
    .catch((err) => {
      console.log(err);
      res
        .status(500)
        .send({ status: "Error with fetching data", error: err.message });
    });
});

// Update operation
router.route("/updateFuelReq/:fId").put(async (req, res) => {
  let fuelReqId = req.params.fId;
  const { farmerId, sizeOfLand, noOfDays, quantity, price } = req.body;

  const updateFuelReq = {
    farmerId,
    sizeOfLand,
    noOfDays,
    quantity,
    price,
    qrcode,
  };

  try {
    const updatedFuelReq = await FuelReq.findByIdAndUpdate(
      fuelReqId,
      updateFuelReq
    );
    res.status(200).send({ status: "Request updated" });
  } catch (err) {
    console.log(err);
    res
      .status(500)
      .send({ status: "Error with updating data", error: err.message });
  }
});

// Delete operation
router.route("/deleteFuelReq/:fId").delete(async (req, res) => {
  let fuelReqId = req.params.fId;

  try {
    await FuelReq.findByIdAndDelete(fuelReqId);
    res.status(200).send({ status: "Request Deleted" });
  } catch (err) {
    console.log(err);
    res
      .status(500)
      .send({ status: "Error with delete request", error: err.message });
  }
});

// Display (ONE)
router.route("/getFuelReq/:fId").get(async (req, res) => {
  let fuelReqId = req.params.fId;

  try {
    const fuelReq = await FuelReq.findById(fuelReqId);
    res.status(200).send({ status: "Request fetched", fuelReq });
  } catch (err) {
    console.log(err);
    res
      .status(500)
      .send({ status: "Error with get request", error: err.message });
  }
});

module.exports = router;
