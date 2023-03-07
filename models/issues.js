const mongoose= require('mongoose')
const {Schema} = require('mongoose');

const Issueschema = new mongoose.Schema(
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
    type:String,
    required:true
},
projectID: [{
    type: Schema.Types.ObjectId,
    ref: 'Issuesdb'
 }],
IssueType:{
    type:String
   
}
    }
)

const Issuesdb= mongoose.model('Issuesdb',Issueschema)
module.exports= Issuesdb;