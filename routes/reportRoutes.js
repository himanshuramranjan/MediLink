const express = require('express');

const reportController = require('../controllers/reportController');
const authController = require('../controllers/authController');

const router = express.Router({ mergeParams: true });

router.use(authController.protectRoute);
 
router.post('/create-report', reportController.createReport);
router.get('/all-reports', reportController.getAllReports);
router.get('/:status', reportController.getReports);

module.exports = router;