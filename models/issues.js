
// requiring mongoose
const mongoose= require('mongoose')

//making schema for Issues
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
projectID:{
    type: String
 },
IssueType:[{

    type:String
   
}]
    }
)

const Issuesdb= mongoose.model('Issuesdb',Issueschema)
module.exports= Issuesdb;
//exporting Issuesdb