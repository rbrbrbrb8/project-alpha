const { Router } = require('express');
const express = require('express');
const rootDir = require('../../root_dir');
const imageApiHandler = require('../../handlers/api/imageHandler');
const imageApiRouter = express.Router();
const logger = require('../../handlers/logger/loggerHandler');

imageApiRouter.get('/', async (req, res) => {
  const imageId = req.query._id;
  try {
    const imageData = await imageApiHandler.getImage(imageId);
    if(imageData) return res.send(imageData);
  } catch (error) {
    logger.error('error trying to GET image',error);
  }
  

});


module.exports = imageApiRouter;