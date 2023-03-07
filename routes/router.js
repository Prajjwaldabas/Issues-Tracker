const express= require("express");
const router = express.Router()
const services = require('../services/render');
const controller = require('../controllers/Controller')
const IssueController = require('../controllers/Issue_Controller')

router.get('/',services.homeRoutes)
router.get('/allProjects',services.allProjectsRoutes)
router.get('/projectDetails',services.projectDetailsRoutes)
router.get('/createProject',services.createProjectRoutes)
router.get('/createIssue/:id',services.createIssueRoute)


// api call for create project
router.post('/api/projects',controller.create);
router.get('/api/projects',controller.find);

router.put('/api/projects/:id',controller.update);
router.get('/api/projects/:id',controller.delete);

router.post('/api/issues',IssueController.createIssue);



module.exports=router;