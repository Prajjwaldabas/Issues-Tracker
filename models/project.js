const mongoose= require('mongoose')
const {Schema} = require('mongoose');

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
     issueID: {
        type: Schema.Types.ObjectId,
        ref: 'Projectdb'
     },    
author:{
    type:String
}
    }
)

const Projectdb= mongoose.model('Projectdb',Projects)
module.exports= Projectdb;