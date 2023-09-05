const express = require('express');
const { registerUser, authUser } = require('../controllers/userControllers')

const router = express.Router();

// after /api/user
router.route('/').post(registerUser);
//router.route('/login')
// router.post('/login', authUser);
router.post('/login', authUser);
module.exports = router;