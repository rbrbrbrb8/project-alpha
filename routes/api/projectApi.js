const { Router } = require('express');
const express = require('express');
const rootDir = require('../../root_dir');
const projectApiHandler = require('../../handlers/api/projectApiHandler');
const projectApiRouter = express.Router();

projectApiRouter.get('/firstProjects', async (req, res) => {
  try {
    console.log("caught request");
    const firstProjects = projectApiHandler.requestFirstProjectsFromCache();
    console.log(firstProjects);
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
  const isSuccessful = await projectApiHandler.requestAddProject(req.body.project, req.user['_id'], req.user.username);
  if (!isSuccessful) {
    console.log("unsuccessful. try again later");
    res.send("couldn't save the project. try again later");
  }
  else res.send("saved project successfully in database");
});

projectApiRouter.post('/donate', async (req, res) => {
  console.log('caught donation request', req.body.donationAmount);
  console.log("projectId", req.body.projectId);
  console.log("donationAmount", req.body.donationAmount);
  const isSuccessful = await projectApiHandler.addDonationAmount(req.body.projectId, req.body.donationAmount, req.user._id);
  if (isSuccessful) {
    console.log('added donation successfully');
    const isExistAlready = req.session.passport.user.supportedProjects.find(id => id === req.body.projectId);
    if(!isExistAlready) req.session.passport.user.supportedProjects.push(req.body.projectId);
    res.send({ outcome: true });
  }
  else {
    console.log('could not add donation');
    res.send({ outcome: false });
  }
});

projectApiRouter.post('/like', async (req, res) => {
  console.log('caught like request for ', req.body.projectId);
  const projectId = req.body.projectId;
  const isSuccessful = { outcome: false };
  try {
    if (!req.body.isLiked) {
      isSuccessful.outcome = await projectApiHandler.addLike(req.body.projectId, req.user._id);
      req.session.passport.user.likedProjects.push(projectId);
    }
    else {
      isSuccessful.outcome = await projectApiHandler.removeLike(req.body.projectId, req.user._id);
      req.session.passport.user.likedProjects = req.session.passport.user.likedProjects.filter((value, index, arr) => {
        return value !== projectId;
      });
    };
    if (isSuccessful.outcome) {
      // req.session.save(err => {console.log('err')});
      console.log("passport user:");
      console.log(req.user);
      res.send('nice');
    }
  }
  catch (err) {
    console.log(err);
  }
});

module.exports = projectApiRouter;