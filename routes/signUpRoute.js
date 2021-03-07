const { Router } = require('express');
const express = require('express');
const rootDir = require('../root_dir');
const signUpHandler = require('../handlers/signUp/signUpHandler');
const signUpRouter = express.Router();

signUpRouter.get('/',(req,res) => {
    res.sendFile('/pages/signup.html',{root:rootDir});
    
});

signUpRouter.post('/',(req, res) => {
    // console.log(req.body);
    signUpHandler.requestRegistration(req.body.username,req.body.password).then(res.redirect('/login'))
    .catch(err => {
      console.log(err);
    });
      // res.sendFile('/pages/signup.html',{root:__dirname});
    });

module.exports = signUpRouter;