const cookieParser = require('cookie-parser');
const express = require('express');
const { body, param } = require('express-validator');
const { authController, reservationController } = require('../controllers');
const checkValidationResult = require('../utils/checkValidationResult');

const router = express.Router();
router.use(cookieParser());

// Reservations
router.get(
  '/reservations/confirmed/:roomId/:year/:month',
  param('roomId').isInt({ gt: 0 }),
  param('year').isInt({ gt: 0 }),
  param('month').isInt({ gt: 0 }),
  checkValidationResult,
  reservationController.getConfirmedReservationsForRoomAndMonth
);

router.get(
  '/reservations/confirmed/:fromDate',
  authController.checkUserIsAuthenticated,
  param('fromDate').isISO8601(),
  checkValidationResult,
  reservationController.getConfirmedReservations
);

router.get(
  '/reservations/denied/:fromDate',
  authController.checkUserIsAuthenticated,
  param('fromDate').isISO8601(),
  checkValidationResult,
  reservationController.getDeniedReservations
);

router.get(
  '/reservations/pending/:fromDate',
  authController.checkUserIsAuthenticated,
  param('fromDate').isISO8601(),
  checkValidationResult,
  reservationController.getPendingReservations
);

// Reservation
router.post(
  '/reservation',
  body('date').isISO8601(),
  body('timeslot').isInt({ gt: 0 }),
  body('inspectionTime').notEmpty(),
  body('email').isEmail(),
  body('name').notEmpty(),
  body('description').notEmpty(),
  checkValidationResult,
  reservationController.createReservation
);

router.put(
  '/reservation/:id/confirm',
  authController.checkUserIsAuthenticated,
  param('id').isInt({ gt: 0 }),
  checkValidationResult,
  reservationController.confirmReservation
);

router.put(
  '/reservation/:id/deny',
  authController.checkUserIsAuthenticated,
  param('id').isInt({ gt: 0 }),
  checkValidationResult,
  reservationController.denyReservation
);

router.put(
  '/reservation/:id/reset',
  authController.checkUserIsAuthenticated,
  param('id').isInt({ gt: 0 }),
  checkValidationResult,
  reservationController.resetReservation
);

router.delete(
  '/reservation/:id',
  authController.checkUserIsAuthenticated,
  param('id').isInt({ gt: 0 }),
  checkValidationResult,
  reservationController.deleteReservation
);

module.exports = router;