const Patient = require('../models/patientModel');

// Register a new patient
exports.registerPatient = async (req, res) => {
    try {

        // check for existing patient
        const existingPatient = await Patient.findOne({ mobile: req.body.mobile });
        
        if(existingPatient) {
            return res.status(201).json({
                status: 'success',
                data: {
                    existingPatient
                }
            });
        }
        
        // if no patient exist create a new one
        const patient = await Patient.create(req.body);

        return res.status(201).json({
            status: 'success',
            data: {
                patient
            }
        });
    } catch(err) {
        console.log(err);
        res.status(500).json({
            status: 'fail'
        });
    }
}