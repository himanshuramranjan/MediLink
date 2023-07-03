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
    visitDate: {
        type: Date,
        default: Date.now
    }
});

const Report = mongoose.model('Report', reportSchema);

module.exports = Report;