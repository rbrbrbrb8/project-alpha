const { Router } = require('express');
const express = require('express');
const rootDir = require('../../root_dir');
const userInfoApiHandler = require('../../handlers/api/userInfoApiHandler');
const userInfoApiRouter = express.Router();

userInfoApiRouter.get('/', async (req, res) => {
	const filter = req.query.creatorUserID;
	console.log('user filter= ');
	console.log(filter); //check filter - optional
	try {
		const userInfo = await userInfoApiHandler.getUserInfo(filter);
		res.send(userInfo);
	}
	catch (e) {
		console.log("error in user info api router");
		res.send(e);
	}
});
userInfoApiRouter.post('/', (req, res) => {
	console.log(req.body);
	// userInfoApiHandler.updateUserDetails();
});


module.exports = userInfoApiRouter;