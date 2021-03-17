const { Router } = require('express');
const express = require('express');
const rootDir = require('../root_dir');
const homepageRouter = express.Router();

homepageRouter.get('/',(req,res) => {
    res.sendFile('/pages/homepage.html',{root:rootDir});
    
});

module.exports = homepageRouter;