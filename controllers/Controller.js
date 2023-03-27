// require project db from models
const Projectdb = require("../models/project");

// function to create and save new project
module.exports.create = (req, res) => {
  // validate the request
  if (!req.body) {
    res.status(404).send({ mesage: "Content can not be empty!" });
    return;
  }

  // new project fields
  const project = new Projectdb({
    title: req.body.title,
    description: req.body.description,
    author: req.body.author,
    status: req.body.status,
  });

  // save project in the database
  project
    .save(project)
    .then((data) => {
      res.redirect("/allProjects");
    })
    .catch((err) => {
      res.status(500).send({
        message: err.message || "Some error occured while creating the project",
      });
    });
};

// function to find specific project details with id
exports.findSpecificProject = (req, res) => {
  // taking id from req params
  const id = req.params.id;

  console.log("id found", id);

  //finding the project with above id recieved
  Projectdb.findById(id)
    .then((data) => {
      if (!data) {
        res.status(404).send({ message: "Not found project with id" + id });
      } else {
        res.send(data);
        console.log("specific data find");
      }
    })
    .catch((err) => {
      res.status(500).send({
        message: "Error in retrieving the specific project width id" + id,
      });
    });
};

//function to retrievs and return all Projects
exports.find = (req, res) => {
  // find all projects
  Projectdb.find()
    .then((project) => {
      res.send(project);
    })
    .catch((err) => {
      res
        .status(500)
        .send({ message: err.message || "Error in retrieving the info" });
    });
  console.log("all projects show");
};


// // update a new project by project id
// exports.update = (req, res) => {
//   if (!req.body) {
//     return res.status(404).send({ message: "Data to update can not be empty" });
//   }
//   const id = req.params.id;
//   Projectdb.findByIdAndUpdate(id, req.body, { useFindAndModify: false })
//     .then((data) => {
//       if (!data) {
//         res
//           .status(404)
//           .send({
//             message: `Canot update project ${id}.Maybe project not found `,
//           });
//       } else {
//         res.send(data);
//       }
//     })
//     .catch((err) => {
//       res.status(500).send({ message: "Error update the project " });
//     });
// };



// delete a project by specific project id
exports.delete = (req, res) => {

    //geting id from req params 
  const id = req.params.id;
 

  //finding the deleting project with the above id 
  Projectdb.findByIdAndDelete(id)
    .then((data) => {
      if (!data) {
        res
          .status(404)
          .send({
            message: `Cannot delete the project with id ${id}.May be id is wrong`,
          });
      } else {
        res.redirect("/allProjects");
      }
    })
    .catch((err) => {
      res
        .status(500)
        .send({ message: "Could not delete the Project with id" + id });
    });
};
