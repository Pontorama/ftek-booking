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
          (err2, correctPassword) => {
            if (err2)
              return next(err2);
            else if (correctPassword) {
              const userObject = {
                id: user.id,
                isAdmin: user.isAdmin
              };
              const secureToken = jwt.sign(userObject, process.env.APP_SECRET, { expiresIn: 300000});
              res.cookie('auth', secureToken,  { httpOnly: true, sameSite: 'Strict', secure: true });
              res.cookie('user', JSON.stringify(userObject), { sameSite: 'Strict', secure: true });
              res.send();
            } 
            else
              res.status(403).send();
          });
      }
    });
}

function logoutUser(req, res, next) {
  res.clearCookie('auth', { httpOnly: true, sameSite: 'Strict', secure: true });
  res.clearCookie('user', { sameSite: 'Strict', secure: true });
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