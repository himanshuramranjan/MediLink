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

// Log In existing an exsting user
exports.login = async (req, res) => {

    try {
        const { username, password } = req.body;

        if(!username || !password) {
            throw "Please provide valid email and password";
        }

        const doctor = await Doctor.findOne({ username }).select('+password');

        if(!doctor || !(await doctor.isCorrectPassword(password, doctor.password))) {
            throw "Incorrect name or password";
        }

        sendJWTToken(res, doctor, 200);
    } catch(err) {
        console.log(err);
        res.status(404).json({
            status: 'fail'
        })
    }
}