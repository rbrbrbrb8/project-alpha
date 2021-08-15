const { Router } = require('express');
const express = require('express');
const rootDir = require('../../root_dir');
const allProjectsApiHandler = require('../../handlers/api/allProjectsApiHandler');
const { query } = require('../../handlers/logger/loggerHandler');
const allProjectsApiRouter = express.Router();

allProjectsApiRouter.get('/', async (req, res) => {

	const filter = req.query;
	try {
		const projectsArr = await allProjectsApiHandler.getAllProjectsIdList(filter);
		res.send(projectsArr);
	}
	catch (e) {
		res.status(500);
	}
});



allProjectsApiRouter.get('/extended', async (req, res) => {
	const idCheck = req.query._id;
	const filter = idCheck ? {_id:JSON.parse(idCheck)} : req.query; 
	try {
		const projectsArr = await allProjectsApiHandler.getAmountOfProjects(filter,5);
		res.send(projectsArr);
	}
	catch (e) {
		res.status(500);
	}
});


module.exports = allProjectsApiRouter;