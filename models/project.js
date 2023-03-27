// require mongoose

const mongoose= require('mongoose')

//making schema for Projects
const Projects = new mongoose.Schema(
    {
    title: {
        type:String,
        required:true
     },
     description:{
        type:String,
        required:true
     },  
author:{
    type:String
}
    }
)

const Projectdb= mongoose.model('Projectdb',Projects)
module.exports= Projectdb;
//exporting project db