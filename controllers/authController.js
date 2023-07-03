const jwt = require('jsonwebtoken');
const Doctor = require('../models/doctorModel');

// Send jwt token after its creation
const sendJWTToken = (res, doctor, statusCode) => {
    
    const token = doctor.signInToken(doctor._id);

    doctor.password = undefined;

    res.status(statusCode).json({
        status: 'success',
        token,
        data: {
            doctor
        }
    });
}

// Signs up a new user
exports.signup = async (req, res) => {
    try {
        const doctor = await Doctor.create(req.body);

        sendJWTToken(res, doctor, 201);

    } catch(err) {
        console.log(err);
        res.status(500).json({
            status: 'fail'
        });
    }
}