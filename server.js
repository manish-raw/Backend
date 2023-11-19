require('dotenv').config()
const express = require('express')
const mongoose = require('mongoose')
const {logger} = require('./middlewares/logEvents')
const errorHandler= require('./middlewares/errorHandler')
const cors = require('cors');
const corsOptions = require('./config/corsOptions')
const dbConnection = require('./database/dbConnection')
const verifyJWT = require('./middlewares/verifyJWT')
const cookieParser = require('cookie-parser')
const app = express()

let PORT = process.env.PORT || 4000

dbConnection();

//custom middle ware
app.use(logger)

//Cross origin resource sharing
app.use(cors(corsOptions))
//middlewares
app.use(express.urlencoded({extended: false }))
app.use(express.json())
app.use(cookieParser())

//routes
app.use('/register', require('./routes/register'))
app.use('/auth', require('./routes/auth'))
app.use('/refresh', require('./routes/refresh'))
app.use('/logout', require('./routes/logout'))

app.use(verifyJWT) //middleware
app.use('/users', require('./routes/user'))

app.use(errorHandler)

//db connection
mongoose.connection.once('open', ()=>{
    console.log('Connected to MongoDB');
    app.listen(PORT, ()=>{
        console.log(`server is running on port: ${PORT}`);
    })
})



// myEmitter.on('log', (msg)=>{
//     logEvents(msg);
// });

// myEmitter.emit('log', 'Fisrt event');