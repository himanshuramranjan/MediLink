const express = require('express');
const authController = require('../controllers/authController');
const patientController = require('../controllers/patientController');
const reportRouter = require('./reportRoutes');

const router = express.Router();

router.use('/:id', reportRouter);

router.post('/register', authController.protectRoute, patientController.registerPatient);

module.exports = router;