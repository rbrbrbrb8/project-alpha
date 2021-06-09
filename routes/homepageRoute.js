const { Router } = require('express');
const express = require('express');
const rootDir = require('../root_dir');
const homepageRouter = express.Router();

homepageRouter.get('/',(req,res) => {
    // console.log("likedProjects", {"arr": req.user.likedProjects});
    // console.log("supportedProjects", {"arr": req.user.supportedProjects});
    res.cookie("likedProjects", "checkstring");
    res.cookie("supportedProjects", [2500,4,6]);
    // res.cookie("likedProjects", req.user.likedProjects);
    // res.cookie("supportedProjects", req.user.supportedProjects);
    res.sendFile('/pages/homepage.html',{root:rootDir});
    
});

homepageRouter.get('/api/getProjects', (req,res) => {
    console.log("fetching projects...");
    res.send("no projects yet");
})

module.exports = homepageRouter;