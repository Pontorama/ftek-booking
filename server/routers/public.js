const express = require('express');
const router = express.Router();
const { getReservations, createReservation } = require('../controllers/public');

router.use(express.json());

router.get('/reservations/get', getReservations);
router.post('/reservations/new', createReservation);

module.exports = router;