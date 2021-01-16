const express = require('express');
const router = express.Router();
const publicController = require('../controllers/public');

router.use(express.json());

router.get('/reservations', publicController.getReservations);

module.exports = router;