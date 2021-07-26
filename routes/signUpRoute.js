const { Router } = require('express');
const express = require('express');
const rootDir = require('../root_dir');
const signUpHandler = require('../handlers/signUp/signUpHandler');
const signUpRouter = express.Router();
const logger = require('../handlers/logger/loggerHandler');

signUpRouter.get('/', (req, res) => {
  res.sendFile('/pages/signup.html', { root: rootDir });

});

signUpRouter.post('/', async (req, res) => {
  // console.log(req.body);
  const isSuccessful = await signUpHandler.requestRegistration(req.body.username, req.body.password);
  if (!isSuccessful) {
    logger.error(`creation of user failed`);
    res.redirect('/signup');
  }
  else {
    logger.info(`user ${req.body.username} was created`);
    res.redirect('/');
  }
});

module.exports = signUpRouter;