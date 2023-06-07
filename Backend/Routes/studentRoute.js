
const express = require('express');
const router = express.Router()
const protect = require('../middleware/Authmiddleware');
const { createStudent } = require('../controllers/studentController');


router.post('/',protect,  createStudent)

module.exports = router