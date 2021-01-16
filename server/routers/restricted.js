const express = require('express');
const router = express.Router();
const { getPendingReservations, confirmPendingReservation, unconfirmReservation, deleteReservation } = require('../controllers/restricted');

router.use(express.json());

router.get('/reservations/get-pending', getPendingReservations);
router.post('/reservations/confirm-pending', confirmPendingReservation);
router.post('/reservations/unconfirm', unconfirmReservation);
router.post('/reservations/delete', deleteReservation);

module.exports = router;