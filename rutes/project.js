'use strict'



let express = require('express');
let projectController = require('../controllers/project');
let router = express.Router();
let userController = require('../controllers/user');
let multipart = require('connect-multiparty');
const { route } = require('express/lib/application');
let multipartMiddleware = multipart({ uploadDir: './upload'})


let clientController = require('../controllers/client')
router.get('/home', projectController.home);
router.post('/test', projectController.test);
router.post('/saveProject', projectController.saveProject);
router.get('/project/:id?', projectController.getPorjectId);
router.get('/projects', projectController.getProjects);
router.put('/project/:id', projectController.updateProjectbyId);
router.delete('/project/:id', projectController.deleteProject);
router.post('/uploadImage/:id', multipartMiddleware, projectController.uploadImage);

router.get('/users', userController.getUsers);
router.get('/user/:id', userController.getUser);
router.post('/saveUser', userController.saveUser);
router.put('/updateUser/:id', userController.updateUser);
router.put('/deleteUser/:id', userController.deleteUser);


router.get('/clients', clientController.getClients);
router.get('/client/:id', clientController.getClient);
router.post('/saveClient', clientController.postClient);
router.put('/updateClient/:id', clientController.updateClient);
router.put('/deleteClient/:id', clientController.deleteClient);



module.exports = router;