const express = require('express');

const doctorRouter = require('./routes/doctorRoutes');
const patientRouter = require('./routes/patientRoutes');
const reportRouter = require('./routes/reportRoutes');

const app = express();

app.use('/doctors', doctorRouter);
app.use('/patients', patientRouter);
app.use('/reports', reportRouter);

module.exports = app;