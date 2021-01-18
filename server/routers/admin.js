const cookieParser = require('cookie-parser');
const express = require('express');
const { createUser, deleteUser } = require('../controllers/admin');
const { authenticateUser, authenticateAdmin } = require('../controllers/auth');

const router = express.Router();
router.use(cookieParser());
router.use(authenticateUser);
router.use(authenticateAdmin);

router.post('/users', createUser);
router.delete('/users/:id', deleteUser);

module.exports = router;