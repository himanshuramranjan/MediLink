const express = require('express');

const doctorRouter = require('./routes/doctorRoutes');
const patientRouter = require('./routes/patientRoutes');
const reportRouter = require('./routes/reportRoutes');

// Initialize the app
const app = express();

// Parse the data from body into req.body
app.use(express.json());

// Routes
app.use('/doctors', doctorRouter);
app.use('/patients', patientRouter);
app.use('/reports', reportRouter);

module.exports = app;