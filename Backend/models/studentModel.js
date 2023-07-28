const mongoose = require('mongoose')

const studentSchema = mongoose.Schema({
user :{
    type:mongoose.Schema.Types.ObjectId,
    required: true,
    ref:'User'
},
email:{
    type:String,
    required:[true, 'please add a stuent mail'],
    unique: true,
    trim:true,
    match:[
        /^(([^<>()[\]\\.,;:\s@"]+(\.[^<>()[\]\\.,;:\s@"]+)*)|.(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/,
        'please enter a valid email'
    ]
},
name: {
    type:String,
    required:[true, 'please add a name'],
    trim:true
},
phone:{
    type:String,
    default:"234"
},
course: {
    type:String,
    required:[true,'please add a course'],
    trim:true
},
paid: {
    type:String,
    required:[true,'please add a paid amount'],
    default:'PAID',
    trim:true
},
price: {
    type:String,
    required:[true,'please add a payment'],
    default:'PRICE',
    trim:true
},
description: {
    type:String,
    required:[true,'please add a description'],
    trim:true
},
image: {
    type:Object,
   default:{}
}

},{
    timestamps:true
})

const Student = mongoose.model('Student', studentSchema)
module.exports = Student 