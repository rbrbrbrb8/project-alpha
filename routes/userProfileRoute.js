const { Router } = require('express');
const express = require('express');
const rootDir = require('../root_dir');
const userProfileRouter = express.Router();
const logger = require('../handlers/logger/loggerHandler');

userProfileRouter.get('/',(req,res) => {
    logger.info(`user ${req.user.username} entered user profile page`);
    res.sendFile('/pages/userProfile.html',{root:rootDir});
    
});

module.exports = userProfileRouter;