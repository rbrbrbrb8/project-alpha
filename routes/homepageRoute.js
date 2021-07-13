const { Router } = require('express');
const express = require('express');
const rootDir = require('../root_dir');
const homepageRouter = express.Router();

const arrayToObjectReverse = arr => {
    return arr.reduce((curObj, element,i) => {
        curObj[element] = i +1;
        return curObj;
    } ,{})
	// const obj = {};
	// arr.forEach((element,i) => {
	// 	obj[element] = i+1;
	// );
	// return obj;
}


homepageRouter.get('/',(req,res) => { 
    res.sendFile('/pages/homepage.html',{root:rootDir});
    
});


homepageRouter.get('/getUserInfo', (req,res) => {
    const objLiked = arrayToObjectReverse(req.user.likedProjects);
	const objSupported = arrayToObjectReverse(req.user.supportedProjects);	
    const resObj = {
        'uid': req.user._id,
        'likedProjects': objLiked,
        'supportedProjects': objSupported  
    };
    res.send(resObj);
})

module.exports = homepageRouter;