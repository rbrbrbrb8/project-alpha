const { Router } = require('express');
const express = require('express');
const rootDir = require('../../root_dir');
const projectApiHandler = require('../../handlers/api/projectApiHandler');
const projectApiRouter = express.Router();

projectApiRouter.get('/:id', (req, res) => {
  const { id } = req.params;
  console.log("id= " +id);
  projectApiHandler.requestGetProject(id);
});

projectApiRouter.post('/', async (req, res) => {
  console.log("caught add project post request - calling handler...");
  const isSuccessful = await projectApiHandler.requestAddProject(req.body.project, req.user['_id']);
  if (!isSuccessful) {
    console.log("unsuccessful. try again later");
    res.send("couldn't save the project. try again later");
  }
  else res.send("saved project successfully in database");
});

module.exports = projectApiRouter;