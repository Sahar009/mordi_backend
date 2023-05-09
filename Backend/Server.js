const http = require('http');
const express = require('express')
const dotenv = require('dotenv').config()
const cors = require('cors')
const mongoose = require('mongoose')
const bodyParser = require('body-parser');
const connectDB = require('./cofig/connectDB')
const app = express();
const userRoute = require('./Routes/userRoute')
const errorHandler = require('./middleware/errorMiddleware')



//Routes
app.get('/', (req,res) =>{
    res.send('Home page');
    });

    
//middlewares
app.use(express.json())
app.use(express.urlencoded({extended:false}))
app.use(bodyParser.json())

const PORT =  5000;

//Routes middleware
app.use('/api/users', userRoute)

// error handler
app.use(errorHandler)


//connect to mongoDB and start server

mongoose.connect(process.env.MONGO_URI)
.then(() =>{
    app.listen(PORT, () =>{
        console.log(`server running on port ${PORT}`)
    })
})
.catch((err) => console.log(err))

//connect 2

// const startServer = async () =>{
//     try {
//         await  connectDB();
//         app.listen(PORT,() =>{
//             console.log(`server running on port ${PORT}`)
//      } )
//     } catch (error) {
//         console.log(error)
//     }
// }
// startServer()