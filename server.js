const express = require('express')
const dotenv= require('dotenv')
const app = express();
const morgan = require('morgan')
const bodyparser= require("body-parser")
const path = require('path')
const db = require('./config/mongoose');

dotenv.config({path: 'config.env'})
const PORT = process.env.PORT || 8080

// log requests
app.use(morgan('tiny'));

//parse request to body-parser
app.use(bodyparser.urlencoded({extended:true}))


// set view engine
app.set("view engine","ejs")

// app.set("views",path.resolve(__dirname,"views/ejs") )
// above line is for nested ejs files in views folder


//load assets
app.use('/css',express.static(path.resolve(__dirname,"assets/css")))
app.use('/js',express.static(path.resolve(__dirname,"assets/js")))


app.use('/',require('./routes/router'))

app.listen (PORT,()=>{
    console.log(`Server is running on port: ${PORT}`)
})