const async_handler = require("express-async-handler");
const Student = require("../models/studentModel");

const createStudent = async_handler(async(req,res)=>{
const {name, paid,course, description, email, phone} =req.body

// validation 
if(!name || !paid ||!course|| !email ){
    res.status(400)
    throw new Error('please fill in all fields ')
}
// upload image 
// create student
const student = await Student.create({
    user: req.user.id,
    name,
    course,
    email,
    phone,
    paid,
    description,
    
})
res.status(201).json(student)
})

// get all  students 
const getStudents = async_handler(async(req,res) =>{
const students = await Student.find({user:req.user.id}).sort('-createdAt')
// user:req.user.id
res.status(200).json(students)
})

// Get single student
const getStudent = async_handler(async (req, res) => {
    const student = await Student.findById(req.params.id);
    // if Student doesnt exist
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
const deleteStudent = async_handler(async (req, res) => {
    const student = await Student.findById(req.params.id);
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
    createStudent,
    getStudents,
    getStudent,
    deleteStudent
    
}