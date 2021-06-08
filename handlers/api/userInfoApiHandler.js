const dbHandler = require('../db/dbHandler');
let userInfoApiHandler = {};
userInfoApiHandler.init = () => { };
userInfoApiHandler.getUserInfo = async filter => {
	try {
		const userInfo = await dbHandler.findOneDocumentById("user",filter,"-password -isAdmin");
    console.log(userInfo);
		return userInfo;
	}
	catch (e) {
		console.log("error in userInfosApi handler");
		console.log(e);
		return e;
	}
}

module.exports = userInfoApiHandler;