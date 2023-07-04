const mongoose = require('mongoose');

const reportSchema = new mongoose.Schema({
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
    patient: {
        type: mongoose.Schema.ObjectId,
        ref: 'Patient'
    },
    visitDate: {
        type: Date,
        default: Date.now
    }
});

// Populate doctor and patient details
reportSchema.pre(/^find/, function(next) {
    this.populate({
        path: 'doctor',
        select: 'username name'
    }).populate({
        path: 'patient',
        select: 'patientName'
    });

    next();
})
const Report = mongoose.model('Report', reportSchema);

module.exports = Report;