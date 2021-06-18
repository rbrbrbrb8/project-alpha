const { Router } = require('express');
const express = require('express');
const rootDir = require('../../root_dir');
const projectApiHandler = require('../../handlers/api/projectApiHandler');
const projectApiRouter = express.Router();

projectApiRouter.get('/firstProjects', async (req, res) => {
  try {
    console.log("caught request");
    const firstProjects = projectApiHandler.requestFirstProjectsFromCache();
    if (firstProjects) res.send(firstProjects);
    else res.send(false);
  } catch (error) {
    console.log("error in projectApi router");
    return false;
  }

});


projectApiRouter.get('/', async (req, res) => {
  const id = req.query._id;
  console.log("id= " + id);
  if (id !== 'firstProjects') {
    try {
      const proj = await projectApiHandler.requestGetProject(id);
      if (proj) res.send(proj);
      else res.send(false);
    } catch (error) {
      console.log("error in projectApi router");
      return false;
    }
  }
});





projectApiRouter.post('/', async (req, res) => {
  console.log("caught add project post request - calling handler...");
  const isSuccessful = await projectApiHandler.requestAddProject(req.body.project, req.user['_id'],req.user.username);
  if (!isSuccessful) {
    console.log("unsuccessful. try again later");
    res.send("couldn't save the project. try again later");
  }
  else res.send("saved project successfully in database");
});

module.exports = projectApiRouter;