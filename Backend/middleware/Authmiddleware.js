const asyncy_handler = require('express-async-handler')
const User = require('../models/userModel');
const jwt = require('jsonwebtoken')

const protect = asyncy_handler(async(req,res,next) =>{
    try {
        const token= req.cookies.token      
        if (!token){
            res.status(401)
            throw new Error('Not Authorized please Login')
        }
        //verify token
        const verified = jwt.verify(token, process.env.JWT_SECRET)
        
        // Get user ID from token
       const user = await User.findById(verified.id).select('-password')

        if(!user){
            res.status(401)
            throw new Error('user not found')
        }
        // if user is found save user to the request 
      
            req.user = user
       
        
       next()
    } catch (error) {
        res.status(401)
        throw new Error('Not Authorized pleas login')
    }
})
module.exports = protect