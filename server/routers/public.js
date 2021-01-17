const express = require('express');
const router = express.Router();
const {
  getRooms,
  getTimeslots,
  getInspectionTimes,
  getConfirmedReservationsForRoom,
  createReservation
} = require('../controllers/public');

router.get('/rooms', getRooms);
router.get('/rooms/:id/timeslots', getTimeslots);
router.get('/rooms/:id/reservations', getConfirmedReservationsForRoom);

router.get('/timeslots/:id/inspection-times', getInspectionTimes);

router.post('/reservations', createReservation);



module.exports = router;