const express = require('express');
const { registerUser, loginUser, logOutUser, getUser, loggedInStatus } = require('../controllers/userController');
const protect = require('../middleware/Authmiddleware');
const router = express.Router()


router.post("/register", registerUser)
router.post('/login', loginUser)
router.get('/logout', logOutUser);
router.get('/getuser',protect, getUser);
router.get('/loggedin', loggedInStatus);

module.exports = router