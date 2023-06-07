const mongoose = require('mongoose')

const studentSchema = mongoose.Schema({
user :{
    type:mongoose.Schema.Types.ObjectId,
    required: true,
    ref:'User'
},
name: {
    type:String,
    required:[true, 'please add a name'],
    trim:true
},
sku: {
    type:String,
    required:[true],
    default:'SKU',
    trim:true
},
course: {
    type:String,
    required:[true,'please add a class'],
    trim:true
},
price: {
    type:String,
    required:[true,'please add a payment'],
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