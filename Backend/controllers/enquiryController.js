const async_handler = require("express-async-handler");
const Enquiry = require("../models/enquiryModel");

const createEnquiry = async_handler(async(req,res)=>{
const {name,course, description,location, email, phone} =req.body

// validation 
// if(!name || !email){ //!course||
//     res.status(400)
//     throw new Error('please fill in all fields ')
// }
// upload image 
// create student
const student = await Enquiry.create({
    user: req.user.id,
    name,
    // course,
    email,
    // phone,
    // description,
    // location,
    
})
res.status(201).json(student)
})

// get all enquiredd  students 
const getEnquirys = async_handler(async(req,res) =>{
const students = await Enquiry.find({user:req.user.id}).sort('-createdAt')
// user:req.user.id
res.status(200).json(students)
})

// Get enquired single student
const getEnquiry = async_handler(async (req, res) => {
    const student = await Enquiry.findById(req.params.id);
    // if enquired Student doesnt exist
    if (!student) {
      res.status(404);
      throw new Error("Student not found");
    }
    // Match Student to its user
    if (student.user.toString() !== req.user.id) {
      res.status(401);
      throw new Error("User not authorized");
    }
    res.status(200).json(student);
  });


  // Delete Student
const deleteEnquiry = async_handler(async (req, res) => {
    const student = await Enquiry.findById(req.params.id);
    // if Student doesnt exist
    if (!student) {
      res.status(404);
      throw new Error("Student not found");
    }
    // Match product to its user
    if (student.user.toString() !== req.user.id) {
      res.status(401);
      throw new Error("User not authorized");
    }
    await student.deleteOne();
    res.status(200).json({ message: "Student successfully deleted." });
  });
  


module.exports ={
    createEnquiry,
    getEnquirys,
    getEnquiry,
    deleteEnquiry
    
}