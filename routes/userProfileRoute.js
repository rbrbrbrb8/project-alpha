const { Router } = require('express');
const express = require('express');
const rootDir = require('../root_dir');
const userProfileRouter = express.Router();

userProfileRouter.get('/',(req,res) => {
    res.sendFile('/pages/userProfile.html',{root:rootDir});
    
});

module.exports = userProfileRouter;