const Projectdb = require('../models/project');
const Issuesdb = require('../models/issues');

//create and save new project
module.exports.create =(req,res)=>{
    // validate the request
    if(!req.body){
        res.status(404).send({mesage:"Content can not be empty!"})
   return;
    }

    // new project
    const project = new Projectdb({
        title:req.body.title,
        description:req.body.description,
        author:req.body.author,
        status:req.body.status
    })

    // save project in the database
    project.save(project).then(data=>{
        res.redirect('/allProjects');
    })
    .catch (err=>{
        res.status(500).send({
            message:err.message || "Some error occured while creating the project"
        })
    })
}

// retrievs and return all Projects
exports.find=(req,res)=>{

    if(req.query.id){
const id = req.query.id;

Projectdb.findById(id).then(data=>{
  if(!data){
    res.status(404).send({message:"Not found project with id"+ id})
  }
  else{
    res.send(data)
    console.log("find function called")
    
  }
    
})
.catch(err=>{
    res.status(500).send({
        message:"Error in retrieving the specific project width id"+id
    })
})
 
    }
    else{
        Projectdb.find().then(project=>{
            res.send(project)
            
        })
        .catch(err=>{
            res.status(500).send({message:err.message || "Error in retrieving the info"})
        })
    }
   
}





// update a new project by project id
exports.update=(req,res)=>{
if(!req.body){
    return res.status(404)
    .send({message:"Data to update can not be empty"})
}
const id= req.params.id;
Projectdb.findByIdAndUpdate(id,req.body,{useFindAndModify:false})
.then(data=>{
    if(!data){
        res.status(404).send({message:`Canot update project ${id}.Maybe project not found `})
    }
    else{
        res.send(data)
        
    }
})
.catch(err=>{
    res.status(500).send({message:"Error update the project "})
})
}

// delete a project by specific project id
exports.delete=(req,res)=>{
   
        const id= req.params.id;
        console.log("hello") 
        console.log(req.params.id)

        Projectdb.findByIdAndDelete(id)
.then(data=>{
    if(!data){
        res.status(404).send({message:`Cannot delete the project with id ${id}.May be id is wrong`})
    }
    else{
      
            res.redirect('/allProjects')
       
    }

})
.catch(err=>{
    res.status(500).send({message:"Could not delete the Project with id"+ id
});
});
    }




