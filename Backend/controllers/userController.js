const async_handler =require('express-async-handler')
const User = require('../models/userModel')
const bcrypt = require('bcrypt')


// const registerUser = (req,res) =>{
//     if(!req.body.email){
//         res.status(400)
//         throw new Error('Please add an email')
//     }
//     res.send('Register user')
// }
const registerUser = async_handler( async(req,res) =>{
    const {name,email, password} = req.body
    //or req.body.email

    //validation
    if(!name || !email || !password){
        res.status(400)
        throw new Error('please fill in all required fields')
    }
    if (password.length < 6){
        res.status(400)
        throw new Error('password must be up to 6 characters')
    }
    //check if user email already exist
    const user_exist = await User.findOne({email})
    if(user_exist){
        res.status(404)
        throw new Error('Emial has already been registered')
    }
    //create new user
    const user = await User.create({
        name:name,
        email:email,
        password:password
    })
    //get user back
    if (user){
        res.status(201).json({
            _id:user.id,
            name:user.name,
            email:user.email,
            photo:user.photo,
            phone:user.phone,
            bio:user.bio

        })
    }else{
        res.status(400)
        throw new Error('Invalid User')
    }

     }
     )

module.exports ={
    registerUser
}