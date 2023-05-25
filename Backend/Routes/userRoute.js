const express = require('express');
const { registerUser, loginUser, logOutUser, getUser, loggedInStatus, UpdateUser, ChangePassword } = require('../controllers/userController');
const protect = require('../middleware/Authmiddleware');
const router = express.Router()


router.post("/register", registerUser)
router.post('/login', loginUser)
router.get('/logout', logOutUser);
router.get('/getuser',protect, getUser);
router.get('/loggedin', loggedInStatus);
router.patch('/updateuser',protect, UpdateUser);
router.patch('/changepassword', ChangePassword);

module.exports = router