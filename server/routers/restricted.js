const cookieParser = require('cookie-parser');
const express = require('express');
const { authenticateUser, authenticateAdmin } = require('../controllers/auth');
const { getPendingReservations, confirmReservation, unconfirmReservation, deleteReservation, createTimeslot, updateTimeslot, deleteTimeslot, createInspectionTime, getInspectionTimes, deleteInspectionTime, createUser, deleteUser } = require('../controllers/restricted');
const router = express.Router();

router.use(cookieParser());
router.use(authenticateUser);

/**
 * Routes restricted to logged in users (room managers)
 */
router.get('/reservations/pending', getPendingReservations);
router.patch('/reservations/confirm', confirmReservation);
router.patch('/reservations/unconfirm', unconfirmReservation);
router.delete('/reservations', deleteReservation);

router.post('/timeslots', createTimeslot);
router.put('/timeslots', updateTimeslot);
router.delete('/timeslots', deleteTimeslot);

router.post('/inspection-times', createInspectionTime);
router.get('/inspection-times', getInspectionTimes);
router.delete('/inspection-times', deleteInspectionTime);

/**
 * Routes restricted to logged in administrators
 */
router.post('/users', authenticateAdmin, createUser);
router.delete('/users', authenticateAdmin, deleteUser);

module.exports = router;