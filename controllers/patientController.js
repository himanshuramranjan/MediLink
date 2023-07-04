const Patient = require('../models/patientModel');

// Register a new patient
exports.registerPatient = async (req, res) => {
    try {
        const existingPatient = await Patient.findOne({ mobile: req.body.mobile });
        
        if(existingPatient) {
            return res.status(201).json({
                status: 'success',
                data: {
                    existingPatient
                }
            });
        }
        
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