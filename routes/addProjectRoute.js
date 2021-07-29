const { Router } = require('express');
const express = require('express');
const rootDir = require('../root_dir');
const addProjectRouter = express.Router();
const logger = require('../handlers/logger/loggerHandler');


addProjectRouter.get('/',(req,res) => {
    logger.info(`user ${req.user.username} entered add project page`);
    res.sendFile('/pages/addproject.html',{root:rootDir});
    
});


module.exports = addProjectRouter;