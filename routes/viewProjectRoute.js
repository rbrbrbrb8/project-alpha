const { Router } = require('express');
const express = require('express');
const rootDir = require('../root_dir');
const viewProjectRouter = express.Router();

viewProjectRouter.get('/',(req,res) => {
    res.sendFile('/pages/viewProject.html',{root:rootDir});
    
});


module.exports = viewProjectRouter;