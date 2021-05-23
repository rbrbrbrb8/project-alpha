const { Router } = require('express');
const express = require('express');
const rootDir = require('../../root_dir');
const allProjectsApiHandler = require('../../handlers/api/allProjectsApiHandler');
const allProjectsApiRouter = express.Router();

allProjectsApiRouter.get('/', async (req, res) => {
    const filter = req.body.filter;
    console.log(filter);
    try {
        const projectsArr = await allProjectsApiHandler.getAllProjectsIdList(filter);
        console.log(projectsArr);
        res.send(projectsArr);
    }
    catch(e){
        console.log("error in all projects api router");
        res.send(e);
    }
});


module.exports = allProjectsApiRouter;