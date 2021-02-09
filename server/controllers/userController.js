require('dotenv').config();
const db = require('../db');
const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');

const createUser = async (req, res, next) => {
  try {
    const hash = await bcrypt.hash(req.body.password, 10);
    await db.query('CALL create_user(?, ?, ?, ?)', [req.body.email, req.body.name, req.body.admin, hash]);
    res.status(201).send();
  } catch (error) {
    next(error);
  }
};

const changePassword = async (user, password) => {
  const hash = await bcrypt.hash(password, 10);
  await db.query('CALL change_user_password(?, ?)', [user, hash]);
};

const updateUserPassword = async (req, res, next) => {
  try {
    changePassword(req.user, req.body.password);
    res.status(204).send();
  } catch (error) {
    next(error);
  }
};

const updateUser = async (req, res, next) => {
  try {
    if (req.body.password)
      changePassword(req.params.id, req.body.password);
    await db.query('CALL update_user(?, ?, ?, ?)', [req.params.id, req.body.email, req.body.name, req.body.isAdmin]);
    res.status(204).send();
  } catch (error) {
    next(error);
  }
};
      
const deleteUser = async (req, res, next) => {
  try {
    await db.query('CALL delete_user(?)', [req.params.id]);
    res.status(204).send();
  } catch (error) {
    next(error);
  }
};

const loginUser = async (req, res, next) => {
  try {
    const [rows, fields] = await db.query('CALL get_user_by_email(?)', [req.body.email]);
    const user = rows[0][0];
    if (!user)
      return res.status(403).send();
    const compareResult = await bcrypt.compare(req.body.password, user.password);
    if (compareResult) {
      const userObject = {
        id: user.id,
        isAdmin: user.isAdmin
      };
      const secureToken = jwt.sign(userObject, process.env.APP_SECRET, { expiresIn: 300000});
      res.cookie('auth', secureToken,  { httpOnly: true, sameSite: 'Strict', secure: true });
      res.cookie('user', JSON.stringify(userObject), { sameSite: 'Strict', secure: true });
      res.send();
    } else {
      res.status(403).send();
    }
  } catch (error) {
    next(error);
  }
};

const logoutUser = (req, res, next) => {
  res.clearCookie('auth', { httpOnly: true, sameSite: 'Strict', secure: true });
  res.clearCookie('user', { sameSite: 'Strict', secure: true });
  res.status(205).send();
};

module.exports = {
  createUser,
  updateUserPassword,
  updateUser,
  deleteUser,
  loginUser,
  logoutUser
};