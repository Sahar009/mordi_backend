const async_handler = require("express-async-handler");
const Student = require("../models/studentModel");

const createStudent = async_handler(async(req,res)=>{
const {name, sku,course, price, description} =req.body

// validation 
if(!name || !price|| !course || !description){
    res.status(400)
    throw new Error('please fill in all fields ')
}
// upload image 
// create student
const student = await Student.create({
    user: req.user.id,
    name,
    sku,
    course,
    price,
    description
})
res.status(201).json(student)
})


module.exports ={
    createStudent
}