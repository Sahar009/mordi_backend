
const express = require('express');
const router = express.Router()
const protect = require('../middleware/Authmiddleware');
const { createEnquiry, getEnquirys, getEnquiry, deleteEnquiry } = require('../controllers/enquiryController');


router.post('/',protect,  createEnquiry);
router.get('/',protect,  getEnquirys);
router.get("/:id", protect, getEnquiry);
router.delete("/:id", protect, deleteEnquiry);

module.exports = router