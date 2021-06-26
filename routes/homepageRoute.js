const { Router } = require('express');
const express = require('express');
const rootDir = require('../root_dir');
const homepageRouter = express.Router();

homepageRouter.get('/',(req,res) => { 
    res.sendFile('/pages/homepage.html',{root:rootDir});
    
});

homepageRouter.get('/getUid', (req,res) => {
    console.log("sending Uid");
    res.send(req.user._id);
})

module.exports = homepageRouter;