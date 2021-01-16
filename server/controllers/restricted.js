const db = require('../db');

function getPendingReservations(req, res, next) {
  db.query('CALL get_pending_reservations()',
    (err, rows) => {
      if (err)
        return next(err);
      else
        res.json(rows[0]);
    });
}

function confirmReservation(req, res, next) {
  db.query('CALL confirm_reservation(?)',
    [req.body.id],
    err => {
      if (err)
        return next(err);
      else
        res.status(204).send();
    });
}

function unconfirmReservation(req, res, next) {
  db.query('CALL unconfirm_reservation(?)',
    [req.body.id],
    err => {
      if (err)
        return next(err);
      else
        res.status(204).send();
    });
}

function deleteReservation(req, res, next) {
  db.query('CALL delete_reservation(?)',
  [req.body.id],
  err => {
    if (err)
      return next(err);
    else
      res.status(204).send();
  });
}

function createTimeslot(req, res, next) {
  db.query('CALL create_timeslot(?, ?, ?, ?, ?)',
  [req.body.room, req.body.from, req.body.to, req.body.weekday, req.body.name],
  err => {
    if (err)
      return next(err);
    else
      res.status(201).send();
  });
}

function updateTimeslot(req, res, next) {
  db.query('CALL update_timeslot(?, ?, ?, ?)',
  [req.body.from, req.body.to, req.body.weekday, req.body.name],
  err => {
    if (err)
      return next(err);
    else
      res.status(204).send();
  });
}

function deleteTimeslot(req, res, next) {
  db.query('CALL delete_timeslot(?)',
  [req.body.id],
  err => {
    if (err)
      return next(err);
    else
      res.status(204).send();
  });
}

function createInspectionTime(req, res, next) {
  db.query('CALL create_inspection_time(?, ?, ?)',
  [req.body.time, req.body.timeslot, req.body.room],
  err => {
    if (err)
      return next(err);
    else
      res.status(201).send();
  });
}

function getInspectionTimes(req, res, next) {
  db.query('CALL get_inspection_times(?, ?)',
  [req.body.timeslot, req.body.room],
  (err, rows) => {
    if (err)
      return next(err);
    else
      res.json(rows[0]);
  });
}

function deleteInspectionTime(req, res, next) {
  db.query('CALL delete_inspection_time(?, ?, ?)',
  [req.body.time, req.body.timeslot, req.body.room],
  err => {
    if (err)
      return next(err);
    else
      res.status(204).send();
  });
}

module.exports = {
  getPendingReservations,
  confirmReservation,
  unconfirmReservation,
  deleteReservation,
  createTimeslot,
  updateTimeslot,
  deleteTimeslot,
  createInspectionTime,
  getInspectionTimes,
  deleteInspectionTime
};