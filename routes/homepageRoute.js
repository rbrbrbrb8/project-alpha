const { Router } = require('express');
const express = require('express');
const rootDir = require('../root_dir');
const homepageRouter = express.Router();

homepageRouter.get('/',(req,res) => { 
    res.sendFile('/pages/homepage.html',{root:rootDir});
    
});

homepageRouter.get('/api/getProjects', (req,res) => {
    console.log("fetching projects...");
    res.send("no projects yet");
})

module.exports = homepageRouter;