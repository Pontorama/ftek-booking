const cookieParser = require('cookie-parser');
const express = require('express');
const { body, param } = require('express-validator');
const { authController, inspectionTimeController } = require('../controllers');
const checkValidationResult = require('../utils/checkValidationResult');

const router = express.Router();
router.use(cookieParser());

// Inspection times
router.get(
  '/inspection-times/:timeslot',
  param('timeslot').isInt({ gt: 0 }),
  checkValidationResult,
  inspectionTimeController.getInspectionTimes
);

// Inspection time
router.post(
  '/inspection-time',
  authController.checkUserIsAuthenticated,
  body('timeslot').isInt({ gt: 0 }),
  body('time').notEmpty(),
  checkValidationResult,
  inspectionTimeController.createInspectionTime
);

router.delete(
  'inspection-time/:timeslot/:time',
  authController.checkUserIsAuthenticated,
  param('timeslot').isInt({ gt: 0 }),
  param('time').notEmpty(),
  checkValidationResult,
  inspectionTimeController.deleteInspectionTime
);

module.exports = router;