const { Router } = require('express');
const express = require('express');
const rootDir = require('../root_dir');
const projectApiRouter = express.Router();

projectApiRouter.get('/:id',(req,res) => {

});

projectApiRouter.post('/',async (req, res) => {
    res.send("got your message");
});

module.exports = projectApiRouter;