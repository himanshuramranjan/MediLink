const mongoose = require('mongoose');
const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');

const doctorSchema = new mongoose.Schema({
    username: {
        type: String,
        unique: [true, 'This username already exist'],
        required: [true, 'Username is required']
    },
    name: {
        type: String,
        required: [true, 'Name is required']
    },
    password: {
        type: String,
        required: [true, 'Password is required'],
        minLength: [8, 'Password should be 8 chars long'],
        select: false
    },
    confirmPassword: {
        type: String,
        required: [true, 'Password is required'],
        validate: {
            validator: function(confirmPswd) {
                return this.password === confirmPswd;
            },
            message: 'Passwords are not matching'
        }
    }
});

// Encrypts the password
doctorSchema.pre('save', async function(next) {

    this.password = await bcrypt.hash(this.password, 12);
    this.confirmPassword = undefined;

    next();
});

// Creates signIn token using jwt
doctorSchema.methods.signInToken = id => {
    return jwt.sign({ id: id }, process.env.JWT_SECRET_KEY, {
        expiresIn: process.env.JWT_EXPIRES_IN * 24 * 3600 * 1000
    });
}

const Doctor = mongoose.model('Doctor', doctorSchema);

module.exports = Doctor;