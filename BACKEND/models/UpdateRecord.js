const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const UpdateRecordSchema = new Schema({
    fertilizerId: {
        type: mongoose.Schema.Types.ObjectId,
        required: true,
    },
    updatedFields: {
        type: Object,
        required: true,
    },
    updatedAt: {
        type: Date,
        default: Date.now,
    },
});

const UpdateRecord = mongoose.model('UpdateRecord', UpdateRecordSchema);

module.exports = UpdateRecord;
