const mongoose = require('mongoose')

const enquirySchema = mongoose.Schema({
user :{
    type:mongoose.Schema.Types.ObjectId,
    required: true,
    ref:'User'
},
// email:{
//     type:String,
//     required:[true, 'please add a stuent mail'],

//     trim:true,
//     match:[
//         /^(([^<>()[\]\\.,;:\s@"]+(\.[^<>()[\]\\.,;:\s@"]+)*)|.(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/,
//         'please enter a valid email'
//     ]
// },
name: {
    type:String,
    required:[true, 'please add a name'],
    trim:true
},
// phone:{
//     type:String,
//     default:"234"
// },
// location:{
//     type:String,
//     required:[true,'please add a location'],
// },
// course: {
//     type:String,
//     required:[true,'please add a course'],
//     trim:true
// },

// description: {
//     type:String,
//     required:[true,'please add a description'],
//     trim:true
// },

},{
    timestamps:true
})

const Enquiry = mongoose.model('Enquiry', enquirySchema)
module.exports = Enquiry