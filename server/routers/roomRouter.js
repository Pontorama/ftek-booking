const express = require('express');
const { body, param } = require('express-validator');
const { authController, roomController } = require('../controllers');
const checkValidationResult = require('../utils/checkValidationResult');

const router = express.Router();

// Rooms
router.get(
  '/rooms',
  roomController.getRooms
);

// Room
router.post(
  '/room',
  authController.checkUserIsAuthenticated,
  authController.checkUserIsAdmin,
  body('name').notEmpty(),
  body('manager').isInt({ gt: 0 }),
  checkValidationResult,
  roomController.createRoom
);

router.put(
  '/room/:id',
  authController.checkUserIsAuthenticated,
  authController.checkUserIsAdmin,
  param('id').isInt({ gt: 0 }),
  body('name').notEmpty(),
  body('manager').isInt({ gt: 0 }),
  checkValidationResult,
  roomController.updateRoom
);

router.delete(
  '/room/:id',
  authController.checkUserIsAuthenticated,
  authController.checkUserIsAdmin,
  param('id').isInt({ gt: 0 }),
  checkValidationResult,
  roomController.deleteRoom
);

module.exports = router;