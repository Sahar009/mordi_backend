const async_handler = require("express-async-handler");
const Student = require("../models/studentModel");
const { fileSizeFormatter } = require("../utility/fileUpload");
const cloudinary = require("cloudinary").v2;

const createStudent = async_handler(async(req,res)=>{
const {name, paid,course,price, description, email, phone} =req.body

// validation 
if(!name || !email){
    res.status(400)
    throw new Error('please fill in all fields ')
}
// upload image 
let fileData = {};
if (req.file) {
  // Save image to cloudinary
  let uploadedFile;
  try {
    uploadedFile = await cloudinary.uploader.upload(req.file.path, {
      folder: "Student mgt App",
      resource_type: "image",
    });
  } catch (error) {
    res.status(500);
    throw new Error("Image could not be uploaded");
  }

  fileData = {
    fileName: req.file.originalname,
    filePath:uploadedFile.secure_url,
    // req.file.path uploadedFile.secure_url,
    fileType: req.file.mimetype,
    fileSize: fileSizeFormatter(req.file.size, 2),
  };


// create student
const student = await Student.create({
    user: req.user.id,
    name,
    course,
    email,
    phone,
    paid,
    price,
    description,
    image: fileData,

})
res.status(201).json(student)
}})

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
    // Match student to its user
    if (student.user.toString() !== req.user.id) {
      res.status(401);
      throw new Error("User not authorized");
    }
    await student.deleteOne();
    res.status(200).json({ message: "Student successfully deleted." });
  });


  // update student 
  const updateStudent = async_handler(async (req, res) => {
    const {name, paid,course,price, description, email, phone} =req.body
    const { id } = req.params;
  
    const student = await Student.findById(id);
  
    // if student doesnt exist
    if (!student) {
      res.status(404);
      throw new Error("student not found");
    }
    // Match student to its user
    if (student.user.toString() !== req.user.id) {
      res.status(401);
      throw new Error("User not authorized");
    }
  
    // Handle Image upload
    let fileData = {};
    if (req.file) {
      // Save image to cloudinary
      let uploadedFile;
      try {
        uploadedFile = await cloudinary.uploader.upload(req.file.path, {
          folder: "Student mgt App",
          resource_type: "image",
        });
      } catch (error) {
        res.status(500);
        throw new Error("Image could not be uploaded");
      }
  
      fileData = {
        fileName: req.file.originalname,
        filePath: uploadedFile.secure_url,
        fileType: req.file.mimetype,
        fileSize: fileSizeFormatter(req.file.size, 2),
      };
    }
  
    // Update student
    const updatedstudent = await Student.findByIdAndUpdate(
      { _id: id },
      {
        name,
        description,
        course,
        paid,
        phone,
        image: Object.keys(fileData).length === 0 ? student?.image : fileData,
      },
      {
        new: true,
        runValidators: true,
      }
    );
  
    res.status(200).json(updatedstudent);
  });
  


module.exports ={
    createStudent,
    getStudents,
    getStudent,
    updateStudent,
    deleteStudent
    
}