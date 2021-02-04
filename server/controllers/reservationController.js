const db = require('../db');

const getConfirmedReservationsForRoomAndMonth = async (req, res, next) => {
  try {
    const reservations = await db.query('CALL get_confirmed_reservations_for_room_and_month(?, ?, ?)', [req.query.room, req.query.year, req.query.month]);
    res.json(rows[0]);
  } catch (error) {
    next(error);
  }
};

const getConfirmedReservations = async (req, res, next) => {
  try {
    const reservations = db.query('CALL get_confirmed_reservations(?)', [req.query.fromDate]);
    res.json(reservations[0]);
  } catch (error) {
    next(error);
  }
};

const getPendingReservations = async (req, res, next) => {
  try {
    const reservations = db.query('CALL get_pending_reservations(?)', [req.query.fromDate]);
    res.json(reservations[0]);
  } catch (error) {
    next(error);
  }
};

const getDeniedReservations = async (req, res, next) => {
  try {
    const reservations = db.query('CALL get_denied_reservations(?)', [req.query.fromDate]);
    res.json(reservations[0]);
  } catch (error) {
    next(error);
  }
};

const createReservation = async (req, res, next) => {
  try {
    await db.query(
      'CALL `create_reservation`(?, ?, ?, ?, ?, ?, ?, ?)', 
      [new Date(req.body.date), req.body.timeslot, req.body.inspectionTime, req.body.email, req.body.name, req.body.cid, req.body.society, req.body.description]
    );
    res.status(201).send();
  } catch (error) {
    next(error);
  }
}

const confirmReservation = async (req, res, next) => {
  try {
    db.query('CALL confirm_reservation(?)', [req.params.id]);
    res.status(204).send();
  } catch (error) {
    next(error);
  }
};

const denyReservation = async (req, res, next) => {
  try {
    db.query('CALL deny_reservation(?)', [req.params.id]);
    res.status(204).send();
  } catch (error) {
    next(error);
  }
};

const resetReservation = async (req, res, next) => {
  try {
    db.query('CALL reset_reservation(?)', [req.params.id]);
    res.status(204).send();
  } catch (error) {
    next(error);
  }
};

const deleteReservation = async (req, res, next) => {
  try {
    db.query('CALL delete_reservation(?)', [req.params.id]);
    res.status(204).send();
  } catch (error) {
    next(error);
  }
};

module.exports = {
  getConfirmedReservationsForRoomAndMonth,
  getConfirmedReservations,
  getPendingReservations,
  getDeniedReservations,
  createReservation,
  confirmReservation,
  denyReservation,
  resetReservation,
  deleteReservation
};