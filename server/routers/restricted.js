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

router.get('/reservations/pending', authenticateUser, getPendingReservations);
router.patch('/reservations/:id/confirm', authenticateUser, confirmReservation);
router.patch('/reservations/:id/unconfirm', authenticateUser, unconfirmReservation);
router.delete('/reservations/:id', authenticateUser, deleteReservation);

router.post('/timeslots', authenticateUser, createTimeslot);
router.put('/timeslots/:id', authenticateUser, updateTimeslot);
router.delete('/timeslots/:id', authenticateUser, deleteTimeslot);

router.post('/timeslots/:id/inspection-times', authenticateUser, createInspectionTime);
router.delete('timeslots/:id/inspection-times/:time', authenticateUser, deleteInspectionTime);

module.exports = router;