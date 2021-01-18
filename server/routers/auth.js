const express = require('express');
const { loginUser, logoutUser } = require('../controllers/auth');
const router = express.Router();
router.use(express.json());

router.post('/login', loginUser);
router.delete('/logout', logoutUser);

module.exports = router;