'use strict'



let express = require('express');
let projectController = require('../controllers/project');
let router = express.Router();

router.get('/home', projectController.home);
router.post('/test', projectController.test);
router.post('/saveProject', projectController.saveProject);
router.get('/project/:id?', projectController.getPorject);




module.exports = router;