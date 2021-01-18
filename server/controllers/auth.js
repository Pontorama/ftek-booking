require('dotenv').config();
const db = require('../db');
const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');

function loginUser(req, res, next) {
  db.query('CALL `get_user_by_email`(?)',
    [req.body.email],
    (err, rows) => {
      if (err)
        return next(err);
      else {
        const user = JSON.parse(JSON.stringify(rows[0]))[0];
        if (!user)
          return res.status(403).send();
        bcrypt.compare(req.body.password, user.password,
          (err, correct) => {
            if (err)
              return next(err);
            else if (correct) {
              const token = jwt.sign({
                id: user.id,
                isAdmin: user.isAdmin
              }, process.env.APP_SECRET, { expiresIn: 300000});
              res.cookie('auth', token,  { httpOnly: true, sameSite: 'Strict', secure: true }).send();
            } else
              res.status(403).send();
          });
      }
    });
}

function logoutUser(req, res, next) {
  res.clearCookie('auth', { httpOnly: true, sameSite: 'Strict', secure: true });
  res.status(205).send();
}

function authenticateUser(req, res, next) {
  jwt.verify(req.cookies.auth, process.env.APP_SECRET, (err, data) => {
    if (err)
      return next(err);
    else {
      req.user = data.id;
      req.isAdmin = data.isAdmin;
      next();
    }
  });
}

function authenticateAdmin(req, res, next) {
  if (!req.isAdmin)
    return res.status(401).send();
  else
    next();
}

module.exports = {
  loginUser,
  logoutUser,
  authenticateUser,
  authenticateAdmin
};