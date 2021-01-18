const cookieParser = require('cookie-parser');
const express = require('express');
const { createUser, deleteUser } = require('../controllers/admin');
const { authenticateUser, authenticateAdmin } = require('../controllers/auth');

const router = express.Router();
router.use(cookieParser());

router.post('/users', authenticateUser, authenticateAdmin, createUser);
router.delete('/users/:id', authenticateUser, authenticateAdmin, deleteUser);

module.exports = router;