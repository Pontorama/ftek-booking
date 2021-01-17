const db = require('../db');

function getRooms(req, res, next) {
  db.query('CALL get_rooms()',
    (err, rows) => {
      if (err)
        return next(err);
      else
        res.json(rows[0]);
    });
}

function getTimeslots(req, res, next) {
  db.query('CALL get_timeslots(?)',
    [req.params.id],
    (err, rows) => {
      if (err)
        return next(err);
      else
        res.json(rows[0]);
    });
}

function getInspectionTimes(req, res, next) {
  db.query('CALL get_inspection_times(?)',
  [req.params.id],
  (err, rows) => {
    if (err)
      return next(err);
    else
      res.json(rows[0]);
  });
}

function getConfirmedReservationsForRoom(req, res, next) {
  db.query('CALL get_public_reservations(?, ?, ?)',
    [req.params.room, req.query.year, req.query.month],
    (err, rows) => {
      if (err)
        return next(err);
      else
        res.json(rows[0]);
    });
}

function createReservation(req, res, next) {
  db.query('CALL `create_reservation`(?, ?, ?, ?, ?, ?, ?, ?, ?)',
    [req.body.date, req.body.timeslot, req.body.room, req.body.inspection_time, req.body.email, req.body.name, req.body.cid, req.body.society, req.body.description],
    err => {
      if (err)
        return next(err);
      else
        res.status(201).send();
    }
  );
}

module.exports = {
  getRooms,
  getTimeslots,
  getInspectionTimes,
  getConfirmedReservationsForRoom,
  createReservation
};