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

function confirmPendingReservation(req, res, next) {
  db.query('CALL confirm_pending_reservation(?)',
    [req.body.id],
    err => {
      if (err)
        return next(err);
      else
        res.send();
    });
}

function unconfirmReservation(req, res, next) {
  db.query('CALL unconfirm_reservation(?)',
    [req.body.id],
    err => {
      if (err)
        return next(err);
      else
        res.send();
    });
}

function deleteReservation(req, res, next) {
  db.query('CALL delete_reservation(?)',
  [req.body.id],
  err => {
    if (err)
      return next(err);
    else
      res.send();
  });
}

module.exports = {
  getPendingReservations,
  confirmPendingReservation,
  unconfirmReservation,
  deleteReservation
};