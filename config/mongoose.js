require('dotenv').config();
const mongoose = require ('mongoose');
console.log(process.env.MONGO_URL)
mongoose.connect(process.env.MONGO_URL);

const db = mongoose.connection;

db.on('error',console.error.bind(console,"Error connecting to Mongodb"));

db.once('open',function(){
    console.log("Successfully connect to the database")
});

module.exports=db;