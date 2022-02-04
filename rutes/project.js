'use strict'



let express = require('express');
const { getProjects } = require('../controllers/project');
let projectController = require('../controllers/project');
let router = express.Router();

router.get('/home', projectController.home);
router.post('/test', projectController.test);
router.post('/saveProject', projectController.saveProject);
router.get('/project/:id?', projectController.getPorjectId);
router.get('/projects', projectController.getProjects);
router.put('/project/:id', projectController.updateProjectbyId);
router.delete('/project/:id', projectController.deleteProject);



module.exports = router;