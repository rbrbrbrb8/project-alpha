const { Router } = require('express');
const express = require('express');
const rootDir = require('../../root_dir');
const userInfoApiHandler = require('../../handlers/api/userInfoApiHandler');
const userInfoApiRouter = express.Router();

userInfoApiRouter.get('/', async (req, res) => {
	const filter = req.query.creatorUserID;
	try {
		const userInfo = await userInfoApiHandler.getUserInfo(filter);
		res.send(userInfo);
	}
	catch (e) {
		res.status(500);
	}
});



module.exports = userInfoApiRouter;