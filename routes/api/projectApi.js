const { Router } = require('express');
const express = require('express');
const rootDir = require('../../root_dir');
const projectApiHandler = require('../../handlers/api/projectApiHandler');
const projectApiRouter = express.Router();

projectApiRouter.get('/:id', async (req, res) => {
  const { id } = req.params;
  console.log("id= " +id);
  try {
    const proj = await projectApiHandler.requestGetProject(id);
    if(proj) res.send(proj);
    else res.send(false);
  } catch (error) {
    console.log("error in projectApi router");
    return false;
  }
  
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