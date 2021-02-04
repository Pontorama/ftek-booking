const cookieParser = require('cookie-parser');
const express = require('express');
const { body, param } = require('express-validator');
const { authController, userController } = require('../controllers');
const checkValidationResult = require('../utils/checkValidationResult');

const router = express.Router();
router.use(cookieParser());

// Authentication
router.post(
  '/login',
  body('email').isEmail(),
  body('password').notEmpty(),
  checkValidationResult,
  userController.loginUser
);

router.patch(
  '/change-password',
  body('password').notEmpty(),
  checkValidationResult,
  userController.updateUserPassword
);

router.delete(
  '/logout',
  authController.checkUserIsAuthenticated,
  userController.logoutUser
);

// User
router.post(
  '/user',
  authController.checkUserIsAuthenticated,
  authController.checkUserIsAdmin,
  body('email').isEmail(),
  body('name').notEmpty(),
  body('admin').isBoolean(),
  checkValidationResult,
  userController.createUser
);

router.put(
  '/user/:id',
  authController.checkUserIsAuthenticated,
  authController.checkUserIsAdmin,
  param('id').isInt({ gt: 0 }),
  checkValidationResult,
  userController.updateUser
);

router.delete(
  '/user/:id',
  authController.checkUserIsAuthenticated,
  authController.checkUserIsAdmin,
  param('id').isInt({ gt: 0 }),
  checkValidationResult,
  userController.deleteUser
);

module.exports = router;