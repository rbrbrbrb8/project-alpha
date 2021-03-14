const { Router } = require('express');
const express = require('express');
const rootDir = require('../root_dir');
const signUpHandler = require('../handlers/signUp/signUpHandler');
const signUpRouter = express.Router();

signUpRouter.get('/',(req,res) => {
    res.sendFile('/pages/signup.html',{root:rootDir});
    
});

signUpRouter.post('/',async (req, res) => {
    // console.log(req.body);
    const isSuccessful = await signUpHandler.requestRegistration(req.body.username,req.body.password);
    if(!isSuccessful){
      res.send("unsuccessful. try again later");
    }
    res.redirect('/login');
      // res.sendFile('/pages/signup.html',{root:__dirname});
    });

module.exports = signUpRouter;