const db = require('../db');
const bcrypt = require('bcrypt');

function createUser(req, res, next) {
  bcrypt.hash(req.body.password, 10,
    (err, hash) => {
      if (err)
        return next(err);
      db.query('CALL create_user(?, ?, ?, ?)',
        [req.body.email, req.body.name, req.body.admin, hash],
        err => {
          if (err)
            return next(err);
          else
            res.status(201).send();
        });
    });
}

function deleteUser(req, res, next) {
  db.query('CALL delete_user(?)',
    [req.params.id],
    err => {
      if (err)
        return next(err);
      else
        res.status(204).send();
    });
}

module.exports = {
  createUser,
  deleteUser
}