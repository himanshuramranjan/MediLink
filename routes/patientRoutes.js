const express = require('express');
const authController = require('../controllers/authController');
const patientController = require('../controllers/patientController');

const router = express.Router();

router.post('/register', authController.protectRoute, patientController.registerPatient);

module.exports = router;