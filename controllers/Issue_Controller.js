//require isseudb from models

const IssuesDB = require('../models/issues');

// requir axios for fetching the apis
const axios = require("axios");


// function to create the issue for the specific project 
module.exports.createIssue= async (req,res)=>{
      
        // getting id of project form body
        const id= req.body.postId
        
        // validate the request
        if(!req.body){
            res.status(404).send({mesage:"Content can not be empty!"})
       return;
        }
        // new issue fields
        const issue = new IssuesDB({
            title:req.body.title,
            description:req.body.description,
            author:req.body.author,
            IssueType:req.body.issuetype,
            projectID: req.body.postId   
        })
    
        // save issue in the database
        issue.save(issue).then(data=>{
            return res.redirect( `/projectDetails?id=${id}`
            
        );
        })
        .catch (err=>{
           return res.status(500).send({
                message:err.message || "Some error occured while creating the issue"
            })
        })

    }   

// function to filter issues accoridng to user inputs given

exports.filterIssues= async (req,res)=>{
   
    // getting id from params for the specifif project
const id= req.params.id;

// getting user's given input form req body
const filterAuthor= req.body.author;
const filterTitle=  req.body.title;
const filterType = req.body.type;

// find all the issues initially
let issueData= await IssuesDB.find({projectID:id}); 

//checking the user input conditon and filtering the data according to it

//if user wants data acc to author,title and type
if(filterAuthor!='' && filterTitle!="" && filterType!=""){
    
    issueData= await IssuesDB.find({projectID:id,author:filterAuthor,title:filterTitle,IssueType:filterType});
     console.log("for all values",issueData)
}

//if user wants data acc to author and type only
 else if(filterTitle=="" && filterAuthor!="" && filterType!="" ){
     issueData= await IssuesDB.find({author:filterAuthor ,IssueType:filterType,projectID:id});
}
//if user given wants data acc to title and type only
 else if(filterTitle!="" && filterAuthor=="" && filterType!="" ){
     issueData= await IssuesDB.find({IssueType:filterType,title:filterTitle,projectID:id});
}

//if user given wants All data 
else if(filterTitle=="" && filterAuthor=="" && filterType=="All"){
     issueData= await IssuesDB.find({projectID:id}); 
}
//if user given wants data acc type only
else{
    issueData= await IssuesDB.find({projectID:id,IssueType:filterType});
}


//sending the filtered issuedata further and giving repsonse according to it
 if (issueData==null) {
 
    // as issue data is null so just sending project details further to the ejs file
    //fetching all project details with the given id
   axios
      .get(`https://issues-tracker-prajjwal.onrender.com/api/project/${id}`, {
       params: { id: id },
       })

     .then(function (projectdetails) {
        console.log(projectdetails.data)
       res.render("../views/partials/_projectDetails", { details: projectdetails.data });
       
     })
     .catch((err) => {
       res.send(err);
     });
    
 }
 else{
// sending all project details as well as issuedata further to the ejs file 
 axios
 .get(`https://issues-tracker-prajjwal.onrender.com/api/project/${id}`, {
    params: { id: req.query.id },
  })
   .then(function (projectdetails) {
     res.render("../views/partials/_projectDetails", {
       details: projectdetails.data,
       issueData
     });
   })
   .catch((err) => {
     res.send(err);
    });
    
}
}


