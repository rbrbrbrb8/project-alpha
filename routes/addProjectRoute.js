const { Router } = require('express');
const express = require('express');
const rootDir = require('../root_dir');
const addProjectRouter = express.Router();

addProjectRouter.get('/',(req,res) => {
    res.sendFile('/pages/addproject.html',{root:rootDir});
    
});


module.exports = addProjectRouter;