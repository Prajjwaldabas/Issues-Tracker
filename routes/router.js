
//require express
const express= require("express");

//require router
const router = express.Router()

//import services folder 
const services = require('../services/render');

//import controllers 
const controller = require('../controllers/Controller')
const IssueController = require('../controllers/Issue_Controller')

//homeroute
router.get('/',services.homeRoutes)

//all projects routes
router.get('/allProjects',services.allProjectsRoutes)

//project details route
router.get('/projectDetails',services.projectDetailsRoutes);

//route foor creating new project 
router.get('/createProject',services.createProjectRoutes)

//route for creating new issue 
router.get('/createIssue/:id',services.createIssueRoute)


// api calls for creating and finding details od projects
router.post('/api/projects',controller.create);
router.get('/api/projects',controller.find);
router.get('/api/project/:id',controller.findSpecificProject);


//not using this functionality currently so commenting it 
// router.put('/api/projects/:id',controller.update);
router.get('/api/projects/delete/:id',controller.delete);

//api for creating issue
router.post('/api/issues',IssueController.createIssue);

// router.get('/api/issues',IssueController.findIssues);

//api call for filter issues
router.post("/filter/:id", IssueController.filterIssues)

module.exports=router;