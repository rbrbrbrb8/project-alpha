const { Router } = require('express');
const express = require('express');
const rootDir = require('../root_dir');
const viewProjectRouter = express.Router();
const logger = require('../handlers/logger/loggerHandler');

viewProjectRouter.get('/',(req,res) => {
    logger.info(`user ${req.user.username} entered view project page`);
    res.sendFile('/pages/viewProject.html',{root:rootDir});
    
});


module.exports = viewProjectRouter;