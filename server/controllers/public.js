const db = require('../db');

function getReservations(req, res, next) {
  db.query('CALL get_public_reservations(?, ?)',
    [req.body.year, req.body.month],
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
        res.send();
    }
  );
}

module.exports = {
  getReservations,
  createReservation
};