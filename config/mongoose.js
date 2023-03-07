const mongoose = require ('mongoose');
mongoose.connect('mongodb://127.0.0.1/issue_tracker');

const db = mongoose.connection;

db.on('error',console.error.bind(console,"Error connecting to Mongodb"));

db.once('open',function(){
    console.log("Successfully connect to the database")
});

module.exports=db;