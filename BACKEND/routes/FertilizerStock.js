const router = require("express").Router();
let FertilizerStock = require("../models/FertilizerStock");
let UpdateRecord = require("../models/UpdateRecord");



router.route("/addStockDetails").post((req, res) => {
    const fertilizerName = req.body.fertilizerName;
    const fertilizerQuantity = req.body.fertilizerQuantity;
    const unitPrice = req.body.unitPrice;

    const newFertilizerStock = new FertilizerStock({
        fertilizerName,
        fertilizerQuantity,
        unitPrice
    });
    newFertilizerStock.save().then(() => {
        res.json("Item added")
    }).catch((err) => {
        console.log(err);
    })
})
router.route("/getStockDetails").get((req, res) => {
    FertilizerStock.find().then((items) => {
        res.json(items)
    }).catch((err) => {
        console.log(err);
    })
})

router.route("/updateStockDetails/:sid").put(async (req, res) => {

    try {
        const fertilizerId = req.params.sid;
        const { fertilizerName, fertilizerQuantity, unitPrice } = req.body;

        const updateStockDetails = {
            fertilizerName,
            fertilizerQuantity,
            unitPrice,
        };

        const updatedItem = await FertilizerStock.findByIdAndUpdate(fertilizerId, updateStockDetails, { new: true });

        res.status(200).send({ status: 'Item updated' });
    } catch (err) {
        console.log(err);
        res.status(500).send({ status: 'Error with updating data' });
    }
    
})


router.route("/storeUpdateRecord").post(async (req, res) => {
    try {
        const { fertilizerId, updatedFields } = req.body;
        const updateRecordInstance = new UpdateRecord({
            fertilizerId,
            updatedFields,
        });

        await updateRecordInstance.save();

        res.status(200).send({ status: 'Item updated' });
    } catch (err) {
        console.log(err);
        res.status(500).send({ status: 'Error with updating data' });
    }
});
router.route("/getUpdateRecords").get(async (req, res) => {
    try {
        const allUpdateRecords = await UpdateRecord.find();

        if (allUpdateRecords.length > 0) {
            res.status(200).send(allUpdateRecords);
        } else {
            res.status(404).send({ status: 'No records found' });
        }
    } catch (err) {
        console.log(err);
        res.status(500).send({ status: 'Error with retrieving data' });
    }
});

router.route("/getUpdateRecord/:fertilizerId").get(async (req, res) => {
    try {
        const fertilizerId = req.params.fertilizerId;
        const updateRecord = await UpdateRecord.findOne({ fertilizerId });

        if (updateRecord) {
            res.status(200).send(updateRecord);
        } else {
            res.status(404).send({ status: 'Record not found' });
        }
    } catch (err) {
        console.log(err);
        res.status(500).send({ status: 'Error with retrieving data' });
    }
});

router.route("/deleteStockDetails/:id").delete(async (req, res) => {
    let fertilizerId = req.params.id;
    await FertilizerStock.findByIdAndDelete(fertilizerId)
        .then(() => {
            res.status(200).send({ status: "Item deleted" })
        }).catch((err) => {
            console.log(err);
        })
})

router.route("/getStockDetails/:id").get(async (req, res) => {
    let fertilizerId = req.params.id;
    const user = await FertilizerStock.findById(fertilizerId).then((FertilizerStock) => {
        res.status(200).send({ status: "Item fetched", FertilizerStock })
    }).catch((err) => {
        console.log(err);
    })
})
module.exports = router;