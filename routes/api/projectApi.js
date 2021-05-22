const { Router } = require('express');
const express = require('express');
const rootDir = require('../../root_dir');
const projectApiHandler = require('../../handlers/api/projectApiHandler');
const projectApiRouter = express.Router();

projectApiRouter.get('/:id', (req, res) => {

});

projectApiRouter.post('/', async (req, res) => {
  console.log("caught add project post request - calling handler...");
  const isSuccessful = await projectApiHandler.requestAddProject(req.body.project, req.user.username);
  if (!isSuccessful) {
    console.log("unsuccessful. try again later");
    res.send("couldn't save the project. try again later");
  }
  else res.send("saved project successfully in database");
  // res.sendFile('/pages/signup.html',{root:__dirname});
});

module.exports = projectApiRouter;