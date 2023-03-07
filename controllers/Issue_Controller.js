const Issuesdb = require('../models/issues');
const Projectdb = require('../models/project');

module.exports.createIssue= async (req,res)=>{
 
        // validate the request
        if(!req.body){
            res.status(404).send({mesage:"Content can not be empty!"})
       return;
        }
    
        // new project
        const issue = new Issuesdb({
            title:req.body.title,
            description:req.body.description,
            author:req.body.author,
            IssueType:req.body.IssueType   
        })
    
        // save project in the database
        issue.save(issue).then(data=>{
            res.redirect('/');
        })
        .catch (err=>{
            res.status(500).send({
                message:err.message || "Some error occured while creating the issue"
            })
        })

      const project = await Projectdb.findById({_id: issue.issueID})
      project.projectID.push(issue);
      await project.save();
    }   

// find issues

exports.findIssues=(req,res)=>{

    if(req.params.id){
const id = req.params.id;

Issuesdb.findById(id).then(data=>{
  if(!data){
    res.status(404).send({message:"Not found issues with id"+ id})
  }
  else{
    res.send(data)
  }
    
})
.catch(err=>{
    res.status(500).send({
        message:"Error in retrieving the specific project width id"+id
    })
})
 
    }
    else{
        Issuesdb.find().then(issues=>{
            res.send(issues)
            
        })
        .catch(err=>{
            res.status(500).send({message:err.message || "Error in retrieving the info"})
        })
    }
   
}
