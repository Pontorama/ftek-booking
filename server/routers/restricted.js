const express = require('express');
const router = express.Router();
const restrictedController = require('../controllers/restricted');

router.use(express.json());

router.get('/reservations/pending', restrictedController.getPendingReservations);
router.patch('/reservations/confirm', restrictedController.confirmReservation);
router.patch('/reservations/unconfirm', restrictedController.unconfirmReservation);
router.delete('/reservations', restrictedController.deleteReservation);

router.post('/timeslots', restrictedController.createTimeslot);
router.put('/timeslots', restrictedController.updateTimeslot);
router.delete('/timeslots', restrictedController.deleteTimeslot);

router.post('/inspection-times', restrictedController.createInspectionTime);
router.get('/inspection-times', restrictedController.getInspectionTimes);
router.delete('/inspection-times', restrictedController.deleteInspectionTime);

module.exports = router;