const mongoose = require('mongoose');

const patientSchema = new mongoose.Schema({
    patientName : {
        type: String,
        required: [true, 'Patient name is required']
    },
    mobile: {
        type: String,
        required: [true, 'Mobile number is required'],
        unique: [true, 'This mobile number already exist']
    }
});


const Patient = mongoose.model('Patient', patientSchema);

module.exports = Patient;
