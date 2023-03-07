const axios = require('axios')
const IssuesDB = require('./../models/issues');


module.exports.homeRoutes=(req,res)=>{
    res.render("../views/partials/_home");
}
module.exports.allProjectsRoutes= (req,res)=>{
// make a get request to api/projects 
axios.get('http://localhost:3000/api/projects')
.then(function(response){
   
    res.render("../views/partials/_allProjects",{Projects: response.data});
})
.catch(err=>{
    res.send(err)
})
    
}


module.exports.projectDetailsRoutes=async (req,res)=>{
    const id = req.query.id;
    console.log(id);
    console.log(req.url);
    // const issueData= await IssuesDB.find();
   const issueData= await IssuesDB.findById({_id:id});
        // if(!issueData){
        //     axios.get('http://localhost:3000/api/projects',{params:{id:req.query.id}})
        //     .then(function(projectdetails){
               
        //         res.render("../views/partials/_projectDetails",{details: projectdetails.data});
            
        //     })
        //     .catch(err=>{
        //         res.send(err)
        //     })      
        // }

        axios.get('http://localhost:3000/api/projects',{params:{id:req.query.id}})
            .then(function(projectdetails){
               
                res.render("../views/partials/_projectDetails",{details: projectdetails.data, issueData});
            
            })
            .catch(err=>{
                res.send(err)
            })
    // axios.get('http://localhost:3000/api/issues')
    // .then(function(issueDetails){
       
    //     res.render("../views/partials/_projectDetails",{issuesInfo: issueDetails.data});
    
    // })
    // .catch(err=>{
    //     res.send(err)s
    // })
   
 

}


module.exports.createProjectRoutes=(req,res)=>{
    res.render("../views/partials/_createProject");
}

module.exports.createIssueRoute=(req,res)=>{


    res.render("../views/partials/_createIssue")

    // axios.get('http://localhost:3000/api/issues',{params:{id:req.params.id}})
    // .then(function(issue)
    //     res.render("../views/partials/_createIssue",{Issues: issue.data});
    //     console.log(Issues)
    // })
    // .catch(err=>{
    //     res.send(err)
    // })
    
    
}
