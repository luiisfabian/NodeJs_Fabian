'use strict'



let express = require('express');
let projectController = require('../controllers/project');
let router = express.Router();


let multipart = require('connect-multiparty')
let multipartMiddleware = multipart({ uploadDir: './upload'})

router.get('/home', projectController.home);
router.post('/test', projectController.test);
router.post('/saveProject', projectController.saveProject);
router.get('/project/:id?', projectController.getPorjectId);
router.get('/projects', projectController.getProjects);
router.put('/project/:id', projectController.updateProjectbyId);
router.delete('/project/:id', projectController.deleteProject);
router.post('/uploadImage/:id', multipartMiddleware, projectController.uploadImage);



module.exports = router;