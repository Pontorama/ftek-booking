const cookieParser = require('cookie-parser');
const express = require('express');
const { authenticateUser } = require('../controllers/auth');
const {
  getPendingReservations,
  confirmReservation,
  unconfirmReservation,
  deleteReservation,
  createTimeslot,
  updateTimeslot,
  deleteTimeslot,
  createInspectionTime,
  deleteInspectionTime
} = require('../controllers/restricted');

const router = express.Router();
router.use(cookieParser());
router.use(authenticateUser);

router.get('/reservations/pending', getPendingReservations);
router.patch('/reservations/:id/confirm', confirmReservation);
router.patch('/reservations/:id/unconfirm', unconfirmReservation);
router.delete('/reservations/:id', deleteReservation);

router.post('/timeslots', createTimeslot);
router.put('/timeslots/:id', updateTimeslot);
router.delete('/timeslots/:id', deleteTimeslot);

router.post('/timeslots/:id/inspection-times', createInspectionTime);
router.delete('timeslots/:id/inspection-times/:time', deleteInspectionTime);

module.exports = router;