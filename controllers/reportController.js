const Report = require('../models/reportModel');

// Create a report for the patient
exports.createReport = async (req, res) => {
    try {
        const report = await Report.create({
            status: req.body.status,
            visitDate: req.body.visitDate,
            doctor: req.doctor.id,
            patient: req.params.id
        });

        res.status(201).json({
            status: 'success',
            data: {
                report
            }
        });
    } catch(err) {
        console.log(err);
        res.status(500).json({
            status: 'fail'
        });
    }
}

// Get all reports for a patient
exports.getAllReports = async (req, res) =>{
    try {
        // req.query.sort = 'visitDate';
        const reports = await Report.find({ patient: req.params.id }).sort('-visitDate');

        res.status(200).json({
            status: 'success',
            data: {
                reports
            }
        });
    } catch(err) {
        console.log(err);
        res.status(404).json({
            status: 'fail'
        });
    }
}

// Get report for a given status
exports.getReports = async (req, res) =>{
    try {
        const reports = await Report.find({ status: req.params.status });

        res.status(200).json({
            status: 'success',
            data: {
                reports
            }
        });
    } catch(err) {
        console.log(err);
        res.status(404).json({
            status: 'fail'
        });
    }
}