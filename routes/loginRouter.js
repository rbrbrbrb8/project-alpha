const { Router } = require('express');
const express = require('express');
const rootDir = require('../root_dir');
const loginRouter = express.Router();

loginRouter.get('/',(req,res) => {
    res.sendFile('/pages/index.html',{root:rootDir});
});

loginRouter.post('/',async (req, res) => {
    // console.log(req.body);
    console.log("successful authentication");
    res.redirect('/homepage');
});

module.exports = loginRouter;