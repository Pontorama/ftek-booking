const cookieParser = require('cookie-parser');
const express = require('express');
const { body, param } = require('express-validator');
const { authController, timeslotController } = require('../controllers');
const checkValidationResult = require('../utils/checkValidationResult');

const router = express.Router();
router.use(cookieParser());

// Timeslots
router.get(
  '/timeslots/:roomId',
  param('roomId').isInt({ gt: 0 }),
  checkValidationResult,
  timeslotController.getTimeslotsByRoom
);

// Timeslot
router.post(
  '/timeslot',
  authController.checkUserIsAuthenticated,
  body('room').isInt({ gt: 0 }),
  body('fromTIme').isDate(),
  body('toTime').isDate(),
  body('weekday').isInt({ gt: -1, lt: 7 }),
  body('name').notEmpty(),
  checkValidationResult,
  timeslotController.createTimeslot
);

router.put(
  '/timeslot/:id',
  authController.checkUserIsAuthenticated,
  param('id').isInt({ gt: 0 }),
  body('room').isInt({ gt: 0 }),
  body('fromTime').isDate(),
  body('toTime').isDate(),
  body('weekday').isInt({ gt: -1, lt: 7 }),
  body('name').notEmpty(),
  checkValidationResult,
  timeslotController.updateTimeslot
);

router.delete(
  '/timeslot/:id',
  authController.checkUserIsAuthenticated,
  param('id').isInt({ gt: 0 }),
  checkValidationResult,
  timeslotController.deleteTimeslot
);

module.exports = router;