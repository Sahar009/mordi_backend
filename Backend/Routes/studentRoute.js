
const express = require('express');
const router = express.Router()
const protect = require('../middleware/Authmiddleware');
const { createStudent, getStudents, getStudent, deleteStudent} = require('../controllers/studentController');


router.post('/',protect,  createStudent);
router.get('/',protect,  getStudents);
router.get("/:id", protect, getStudent);
router.delete("/:id", protect, deleteStudent);

module.exports = router