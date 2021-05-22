const { Router } = require('express');
const express = require('express');
const rootDir = require('../../root_dir');
const allProjectsApiHandler = require('../../handlers/api/allProjectsApiHandler');
const allProjectsApiRouter = express.Router();

allProjectsApiRouter.get('/', (req, res) => {
    const filter = req.body.filter;
    try {
        const projectsList = await allProjectsApiHandler.getAllProjectsIdList(filter);
    }
    catch(e){
        console.log("error in all projects api router");
        res.send(e);
    }
});


module.exports = allProjectsApiRouter;