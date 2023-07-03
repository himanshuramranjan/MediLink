const mongoose = require('mongoose');

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

const Doctor = mongoose.model('Dcotor', doctorSchema);

module.exports = Doctor;