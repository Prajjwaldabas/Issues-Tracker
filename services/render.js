// require axios
const axios = require("axios");

//requires issues db
const IssuesDB = require("./../models/issues");

// function for rnedering home page
module.exports.homeRoutes = (req, res) => {
  res.render("../views/partials/_home");
};

// function for rendering all projects
module.exports.allProjectsRoutes = (req, res) => {
  // make a get request to api/projects
  axios
    .get(`https://issues-tracker-prajjwal.onrender.com/api/projects`)
    .then(function (response) {
      res.render("../views/partials/_allProjects", { Projects: response.data });
    })
    .catch((err) => {
      res.send(err);
    });
};

//function for showing detils according to the project

module.exports.projectDetailsRoutes = async (req, res) => {
  const id = req.query.id;

  console.log("another id",id);
  // console.log(req.url);

    const issueData= await IssuesDB.find({projectID:id});

 console.log(issueData)

 //if issue dat not found then only rending project details not issue details
 if (issueData==null) {
   axios
      .get(`https://issues-tracker-prajjwal.onrender.com/api/project/${id}`)

     .then(function (projectdetails) {
        console.log(projectdetails.data)
       res.render("../views/partials/_projectDetails", { details: projectdetails.data });
       console.log("null data")
       
     })
     .catch((err) => {
       res.send(err);
     });
    
 }
 // rending all details 
 else{

 axios
 .get(`https://issues-tracker-prajjwal.onrender.com/api/project/${id}`)
   .then(function (projectdetails) {
    console.log("$",id)
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

;
//function to render create project page
module.exports.createProjectRoutes = (req, res) => {
  res.render("../views/partials/_createProject");
};

//fucntion to render create issue page
module.exports.createIssueRoute = (req, res) => {
  res.render("../views/partials/_createIssue");

 
};
