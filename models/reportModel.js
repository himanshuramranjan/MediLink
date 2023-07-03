const mongoose = require('mongoose');

const reportSchema = new mongoose.Schema({
    patientName : {
        type: String,
        required: [true, 'Patient name is required']
    },
    mobile: {
        type: String,
        required: [true, 'Mobile number is required'],
        unique: [true, 'This mobile number already exist']
    },
    status: {
        type: String,
        enum: ['Negative', 'Travelled-Quarantine', 'Symptoms-Quarantine',
            'Positive-Admit'],
        default: 'Negative'
    },
    doctor: {
        type: mongoose.Schema.ObjectId,
        ref: 'Doctor',
    },
    createdAt: {
        type: Date,
        default: Date.now
    }
});

const Report = mongoose.model('Report', reportSchema);
