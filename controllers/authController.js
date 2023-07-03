const { promisify } = require('util');
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

exports.protectRoute = async (req, res, next) => {
    try {

        if(!req.headers.authorization || !req.headers.authorization.startsWith('Bearer')) {
            throw "You are not logged in";
        }

        const token = req.headers.authorization.split(' ')[1];
        const decodedToken = await promisify(jwt.verify)(token, process.env.JWT_SECRET_KEY);

        const doctor = await Doctor.findById(decodedToken.id);

        if(!doctor) {
            throw "The user no longer exist";
        }

        req.doctor = doctor;
        next();
    } catch(err) {

        console.log(err);
        res.status(401).json({
            status: 'fail'
        })
    }
}